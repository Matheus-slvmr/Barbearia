package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"github.com/matheus/barbershop/internal/handlers"
	"github.com/matheus/barbershop/internal/storage"
)

func main() {
	// Criar diretório de dados se não existir
	dataDir := "data"
	if err := os.MkdirAll(dataDir, 0755); err != nil {
		log.Fatal("Erro ao criar diretório de dados:", err)
	}

	// Inicializar storage
	storagePath := filepath.Join(dataDir, "data.json")
	store := storage.NewStorage(storagePath)

	// Criar handler
	h := handlers.NewHandler(store)

	// Configurar rotas
	router := mux.NewRouter()

	// Health check
	router.HandleFunc("/health", h.Health).Methods("GET")

	// Dashboard
	router.HandleFunc("/api/dashboard", h.Dashboard).Methods("GET")

	// Agendamentos
	router.HandleFunc("/api/agendamentos", h.ListarAgendamentos).Methods("GET")
	router.HandleFunc("/api/agendamentos", h.CriarAgendamento).Methods("POST")
	router.HandleFunc("/api/agendamentos/{id}", h.ObterAgendamento).Methods("GET")
	router.HandleFunc("/api/agendamentos/{id}/status", h.AtualizarStatus).Methods("PUT")
	router.HandleFunc("/api/agendamentos/{id}/notificacao", h.EnviarNotificacaoWhatsApp).Methods("POST")

	// Barbeiros
	router.HandleFunc("/api/barbeiros", h.ListarBarbeiros).Methods("GET")
	router.HandleFunc("/api/barbeiros", h.CriarBarbeiro).Methods("POST")
	router.HandleFunc("/api/barbeiros/{id}", h.ObterBarbeiro).Methods("GET")
	router.HandleFunc("/api/barbeiros/{id}", h.AtualizarBarbeiro).Methods("PUT")
	router.HandleFunc("/api/barbeiros/{id}", h.DeletarBarbeiro).Methods("DELETE")
	router.HandleFunc("/api/barbeiros/{id}/disponibilidade", h.ObterDisponibilidade).Methods("GET")

	// Clientes
	router.HandleFunc("/api/clientes", h.ListarClientes).Methods("GET")
	router.HandleFunc("/api/clientes", h.CriarCliente).Methods("POST")
	router.HandleFunc("/api/clientes/{id}", h.ObterCliente).Methods("GET")
	router.HandleFunc("/api/clientes/{id}", h.AtualizarCliente).Methods("PUT")
	router.HandleFunc("/api/clientes/{id}", h.DeletarCliente).Methods("DELETE")

	// Configurar CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		ExposedHeaders:   []string{"X-Total-Count"},
		MaxAge:           300,
		AllowCredentials: true,
	})

	handler := c.Handler(router)

	// Iniciar servidor
	port := ":8080"
	fmt.Printf("🚀 Servidor iniciado em http://localhost%s\n", port)
	fmt.Println("📚 API Documentation: http://localhost:8080/docs")

	if err := http.ListenAndServe(port, handler); err != nil {
		log.Fatal("Erro ao iniciar servidor:", err)
	}
}
