package storage

import (
	"encoding/json"
	"os"
	"sync"

	"github.com/matheus/barbershop/internal/models"
)

type Storage struct {
	mu           sync.RWMutex
	filePath     string
	barbeiros    map[string]*models.Barbeiro
	clientes     map[string]*models.Cliente
	agendamentos map[string]*models.Agendamento
}

type storageData struct {
	Barbeiros    map[string]*models.Barbeiro    `json:"barbeiros"`
	Clientes     map[string]*models.Cliente     `json:"clientes"`
	Agendamentos map[string]*models.Agendamento `json:"agendamentos"`
}

// NewStorage cria uma nova instância de storage
func NewStorage(filePath string) *Storage {
	s := &Storage{
		filePath:     filePath,
		barbeiros:    make(map[string]*models.Barbeiro),
		clientes:     make(map[string]*models.Cliente),
		agendamentos: make(map[string]*models.Agendamento),
	}
	s.load()
	return s
}

// load carrega os dados do arquivo JSON
func (s *Storage) load() error {
	s.mu.Lock()
	defer s.mu.Unlock()

	data, err := os.ReadFile(s.filePath)
	if err != nil {
		// Arquivo não existe, criar com dados iniciais
		return s.initializeWithDefaults()
	}

	var sd storageData
	if err := json.Unmarshal(data, &sd); err != nil {
		return err
	}

	s.barbeiros = sd.Barbeiros
	s.clientes = sd.Clientes
	s.agendamentos = sd.Agendamentos

	return nil
}

// save salva os dados no arquivo JSON
func (s *Storage) save() error {
	s.mu.RLock()
	defer s.mu.RUnlock()

	sd := storageData{
		Barbeiros:    s.barbeiros,
		Clientes:     s.clientes,
		Agendamentos: s.agendamentos,
	}

	data, err := json.MarshalIndent(sd, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile(s.filePath, data, 0644)
}

// initializeWithDefaults inicializa com dados padrão
func (s *Storage) initializeWithDefaults() error {
	s.barbeiros = map[string]*models.Barbeiro{
		"1": {
			ID:             "1",
			Nome:           "Carlos Silva",
			Telefone:       "(11) 98765-4321",
			Email:          "carlos@barberpro.com",
			Especialidades: []string{"Corte Clássico", "Barba", "Degradê"},
		},
		"2": {
			ID:             "2",
			Nome:           "João Santos",
			Telefone:       "(11) 98765-4322",
			Email:          "joao@barberpro.com",
			Especialidades: []string{"Corte Moderno", "Pigmentação", "Design"},
		},
	}

	s.clientes = map[string]*models.Cliente{
		"1": {
			ID:       "1",
			Nome:     "Pedro Oliveira",
			Telefone: "(11) 99876-5432",
			Email:    "pedro@email.com",
		},
		"2": {
			ID:       "2",
			Nome:     "Lucas Ferreira",
			Telefone: "(11) 99876-5433",
			Email:    "lucas@email.com",
		},
		"3": {
			ID:       "3",
			Nome:     "Rafael Costa",
			Telefone: "(11) 99876-5434",
			Email:    "rafael@email.com",
		},
	}

	s.agendamentos = map[string]*models.Agendamento{
		"1": {
			ID:                 "1",
			ClienteID:          "1",
			BarbeiroID:         "1",
			Data:               "2026-05-17",
			Hora:               "10:00",
			Servico:            "Corte + Barba",
			Status:             "confirmado",
			NotificacaoEnviada: true,
		},
		"2": {
			ID:                 "2",
			ClienteID:          "2",
			BarbeiroID:         "2",
			Data:               "2026-05-17",
			Hora:               "14:00",
			Servico:            "Corte",
			Status:             "pendente",
			NotificacaoEnviada: false,
		},
	}

	return s.save()
}

// Barbeiros
func (s *Storage) CreateBarbeiro(barbeiro *models.Barbeiro) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.barbeiros[barbeiro.ID] = barbeiro
	return s.save()
}

func (s *Storage) GetBarbeiros() []*models.Barbeiro {
	s.mu.RLock()
	defer s.mu.RUnlock()

	result := make([]*models.Barbeiro, 0, len(s.barbeiros))
	for _, b := range s.barbeiros {
		result = append(result, b)
	}
	return result
}

func (s *Storage) GetBarbeiro(id string) *models.Barbeiro {
	s.mu.RLock()
	defer s.mu.RUnlock()

	return s.barbeiros[id]
}

func (s *Storage) UpdateBarbeiro(barbeiro *models.Barbeiro) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if _, exists := s.barbeiros[barbeiro.ID]; !exists {
		return os.ErrNotExist
	}

	s.barbeiros[barbeiro.ID] = barbeiro
	return s.save()
}

func (s *Storage) DeleteBarbeiro(id string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	delete(s.barbeiros, id)
	return s.save()
}

// Clientes
func (s *Storage) CreateCliente(cliente *models.Cliente) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.clientes[cliente.ID] = cliente
	return s.save()
}

func (s *Storage) GetClientes() []*models.Cliente {
	s.mu.RLock()
	defer s.mu.RUnlock()

	result := make([]*models.Cliente, 0, len(s.clientes))
	for _, c := range s.clientes {
		result = append(result, c)
	}
	return result
}

func (s *Storage) GetCliente(id string) *models.Cliente {
	s.mu.RLock()
	defer s.mu.RUnlock()

	return s.clientes[id]
}

func (s *Storage) UpdateCliente(cliente *models.Cliente) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if _, exists := s.clientes[cliente.ID]; !exists {
		return os.ErrNotExist
	}

	s.clientes[cliente.ID] = cliente
	return s.save()
}

func (s *Storage) DeleteCliente(id string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	delete(s.clientes, id)
	return s.save()
}

// Agendamentos
func (s *Storage) CreateAgendamento(agendamento *models.Agendamento) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.agendamentos[agendamento.ID] = agendamento
	return s.save()
}

func (s *Storage) GetAgendamentos() []*models.Agendamento {
	s.mu.RLock()
	defer s.mu.RUnlock()

	result := make([]*models.Agendamento, 0, len(s.agendamentos))
	for _, a := range s.agendamentos {
		result = append(result, a)
	}
	return result
}

func (s *Storage) GetAgendamento(id string) *models.Agendamento {
	s.mu.RLock()
	defer s.mu.RUnlock()

	return s.agendamentos[id]
}

func (s *Storage) UpdateAgendamento(agendamento *models.Agendamento) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if _, exists := s.agendamentos[agendamento.ID]; !exists {
		return os.ErrNotExist
	}

	s.agendamentos[agendamento.ID] = agendamento
	return s.save()
}

func (s *Storage) DeleteAgendamento(id string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	delete(s.agendamentos, id)
	return s.save()
}

// GetAgendamentosByBarbeiro retorna todos os agendamentos de um barbeiro
func (s *Storage) GetAgendamentosByBarbeiro(barbeiroID string) []*models.Agendamento {
	s.mu.RLock()
	defer s.mu.RUnlock()

	var result []*models.Agendamento
	for _, a := range s.agendamentos {
		if a.BarbeiroID == barbeiroID {
			result = append(result, a)
		}
	}
	return result
}

// GetAgendamentosByCliente retorna todos os agendamentos de um cliente
func (s *Storage) GetAgendamentosByCliente(clienteID string) []*models.Agendamento {
	s.mu.RLock()
	defer s.mu.RUnlock()

	var result []*models.Agendamento
	for _, a := range s.agendamentos {
		if a.ClienteID == clienteID {
			result = append(result, a)
		}
	}
	return result
}
