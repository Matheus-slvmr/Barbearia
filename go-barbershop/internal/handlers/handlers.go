package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/matheus/barbershop/internal/models"
	"github.com/matheus/barbershop/internal/services"
	"github.com/matheus/barbershop/internal/storage"
)

// Handler contém todos os services
type Handler struct {
	agendamentoService *services.AgendamentoService
	barbeiroService    *services.BarbeiroService
	clienteService     *services.ClienteService
	storage            *storage.Storage
}

// NewHandler cria um novo handler
func NewHandler(s *storage.Storage) *Handler {
	return &Handler{
		agendamentoService: services.NewAgendamentoService(s),
		barbeiroService:    services.NewBarbeiroService(s),
		clienteService:     services.NewClienteService(s),
		storage:            s,
	}
}

// ========== HANDLERS DE AGENDAMENTO ==========

// CriarAgendamento POST /api/agendamentos
func (h *Handler) CriarAgendamento(w http.ResponseWriter, r *http.Request) {
	var req models.CreateAgendamentoRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ErrorResponse{Error: "Dados inválidos"})
		return
	}

	agendamento, err := h.agendamentoService.CriarAgendamento(&req)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ErrorResponse{Error: err.Error()})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(models.Response{
		Success: true,
		Message: "Agendamento criado com sucesso",
		Data:    agendamento,
	})
}

// ListarAgendamentos GET /api/agendamentos
func (h *Handler) ListarAgendamentos(w http.ResponseWriter, r *http.Request) {
	agendamentos := h.agendamentoService.ListarAgendamentos()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.Response{
		Success: true,
		Data:    agendamentos,
	})
}

// ObterAgendamento GET /api/agendamentos/{id}
func (h *Handler) ObterAgendamento(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	agendamento := h.agendamentoService.ObterAgendamento(id)
	if agendamento == nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(models.ErrorResponse{Error: "Agendamento não encontrado"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.Response{
		Success: true,
		Data:    agendamento,
	})
}

// AtualizarStatus PUT /api/agendamentos/{id}/status
func (h *Handler) AtualizarStatus(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var req struct {
		Status string `json:"status"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ErrorResponse{Error: "Dados inválidos"})
		return
	}

	agendamento, err := h.agendamentoService.AtualizarStatus(id, req.Status)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ErrorResponse{Error: err.Error()})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.Response{
		Success: true,
		Message: "Status atualizado com sucesso",
		Data:    agendamento,
	})
}

// EnviarNotificacaoWhatsApp POST /api/agendamentos/{id}/notificacao
func (h *Handler) EnviarNotificacaoWhatsApp(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	url, err := h.agendamentoService.EnviarNotificacaoWhatsApp(id)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ErrorResponse{Error: err.Error()})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.Response{
		Success: true,
		Message: "Notificação enviada com sucesso",
		Data: map[string]string{
			"whatsappUrl": url,
		},
	})
}

// ========== HANDLERS DE BARBEIRO ==========

// CriarBarbeiro POST /api/barbeiros
func (h *Handler) CriarBarbeiro(w http.ResponseWriter, r *http.Request) {
	var req models.CreateBarbeiroRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ErrorResponse{Error: "Dados inválidos"})
		return
	}

	barbeiro, err := h.barbeiroService.CriarBarbeiro(&req)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ErrorResponse{Error: err.Error()})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(models.Response{
		Success: true,
		Message: "Barbeiro criado com sucesso",
		Data:    barbeiro,
	})
}

// ListarBarbeiros GET /api/barbeiros
func (h *Handler) ListarBarbeiros(w http.ResponseWriter, r *http.Request) {
	barbeiros := h.barbeiroService.ListarBarbeiros()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.Response{
		Success: true,
		Data:    barbeiros,
	})
}

// ObterBarbeiro GET /api/barbeiros/{id}
func (h *Handler) ObterBarbeiro(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	barbeiro := h.barbeiroService.ObterBarbeiro(id)
	if barbeiro == nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(models.ErrorResponse{Error: "Barbeiro não encontrado"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.Response{
		Success: true,
		Data:    barbeiro,
	})
}

// AtualizarBarbeiro PUT /api/barbeiros/{id}
func (h *Handler) AtualizarBarbeiro(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var req models.CreateBarbeiroRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ErrorResponse{Error: "Dados inválidos"})
		return
	}

	barbeiro, err := h.barbeiroService.AtualizarBarbeiro(id, &req)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ErrorResponse{Error: err.Error()})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.Response{
		Success: true,
		Message: "Barbeiro atualizado com sucesso",
		Data:    barbeiro,
	})
}

// DeletarBarbeiro DELETE /api/barbeiros/{id}
func (h *Handler) DeletarBarbeiro(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	if err := h.barbeiroService.DeletarBarbeiro(id); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ErrorResponse{Error: err.Error()})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.Response{
		Success: true,
		Message: "Barbeiro deletado com sucesso",
	})
}

// ObterDisponibilidade GET /api/barbeiros/{id}/disponibilidade?data=YYYY-MM-DD
func (h *Handler) ObterDisponibilidade(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	data := r.URL.Query().Get("data")

	if data == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ErrorResponse{Error: "Data não fornecida"})
		return
	}

	disponiveis := h.barbeiroService.ObterDisponibilidade(id, data)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.Response{
		Success: true,
		Data:    disponiveis,
	})
}

// ========== HANDLERS DE CLIENTE ==========

// CriarCliente POST /api/clientes
func (h *Handler) CriarCliente(w http.ResponseWriter, r *http.Request) {
	var req models.CreateClienteRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ErrorResponse{Error: "Dados inválidos"})
		return
	}

	cliente, err := h.clienteService.CriarCliente(&req)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ErrorResponse{Error: err.Error()})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(models.Response{
		Success: true,
		Message: "Cliente criado com sucesso",
		Data:    cliente,
	})
}

// ListarClientes GET /api/clientes
func (h *Handler) ListarClientes(w http.ResponseWriter, r *http.Request) {
	clientes := h.clienteService.ListarClientes()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.Response{
		Success: true,
		Data:    clientes,
	})
}

// ObterCliente GET /api/clientes/{id}
func (h *Handler) ObterCliente(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	cliente := h.clienteService.ObterCliente(id)
	if cliente == nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(models.ErrorResponse{Error: "Cliente não encontrado"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.Response{
		Success: true,
		Data:    cliente,
	})
}

// AtualizarCliente PUT /api/clientes/{id}
func (h *Handler) AtualizarCliente(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var req models.CreateClienteRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ErrorResponse{Error: "Dados inválidos"})
		return
	}

	cliente, err := h.clienteService.AtualizarCliente(id, &req)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ErrorResponse{Error: err.Error()})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.Response{
		Success: true,
		Message: "Cliente atualizado com sucesso",
		Data:    cliente,
	})
}

// DeletarCliente DELETE /api/clientes/{id}
func (h *Handler) DeletarCliente(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	if err := h.clienteService.DeletarCliente(id); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ErrorResponse{Error: err.Error()})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.Response{
		Success: true,
		Message: "Cliente deletado com sucesso",
	})
}

// ========== HANDLERS GERAIS ==========

// Health GET /health
func (h *Handler) Health(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status": "ok",
	})
}

// Dashboard GET /api/dashboard
func (h *Handler) Dashboard(w http.ResponseWriter, r *http.Request) {
	estatisticas := h.clienteService.ObterEstatisticas(h.storage)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.Response{
		Success: true,
		Data:    estatisticas,
	})
}
