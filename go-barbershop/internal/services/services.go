package services

import (
	"fmt"
	"net/url"
	"time"

	"github.com/google/uuid"
	"github.com/matheus/barbershop/internal/models"
	"github.com/matheus/barbershop/internal/storage"
	"github.com/matheus/barbershop/pkg/utils"
)

type AgendamentoService struct {
	storage *storage.Storage
}

type BarbeiroService struct {
	storage *storage.Storage
}

type ClienteService struct {
	storage *storage.Storage
}

// NewAgendamentoService cria um novo serviço de agendamentos
func NewAgendamentoService(s *storage.Storage) *AgendamentoService {
	return &AgendamentoService{storage: s}
}

// NewBarbeiroService cria um novo serviço de barbeiros
func NewBarbeiroService(s *storage.Storage) *BarbeiroService {
	return &BarbeiroService{storage: s}
}

// NewClienteService cria um novo serviço de clientes
func NewClienteService(s *storage.Storage) *ClienteService {
	return &ClienteService{storage: s}
}

// ========== SERVIÇOS DE AGENDAMENTO ==========

// CriarAgendamento cria um novo agendamento
func (as *AgendamentoService) CriarAgendamento(req *models.CreateAgendamentoRequest) (*models.Agendamento, error) {
	// Validar se cliente existe
	cliente := as.storage.GetCliente(req.ClienteID)
	if cliente == nil {
		return nil, fmt.Errorf("cliente não encontrado")
	}

	// Validar se barbeiro existe
	barbeiro := as.storage.GetBarbeiro(req.BarbeiroID)
	if barbeiro == nil {
		return nil, fmt.Errorf("barbeiro não encontrado")
	}

	// Validar data e hora
	if !utils.IsValidDate(req.Data) {
		return nil, fmt.Errorf("data inválida, formato deve ser YYYY-MM-DD")
	}

	if !utils.IsValidTime(req.Hora) {
		return nil, fmt.Errorf("hora inválida, formato deve ser HH:MM")
	}

	// Verificar se horário já está reservado
	agendamentos := as.storage.GetAgendamentosByBarbeiro(req.BarbeiroID)
	for _, a := range agendamentos {
		if a.Data == req.Data && a.Hora == req.Hora && a.Status != "cancelado" {
			return nil, fmt.Errorf("horário já reservado para este barbeiro")
		}
	}

	agendamento := &models.Agendamento{
		ID:                 uuid.New().String(),
		ClienteID:          req.ClienteID,
		BarbeiroID:         req.BarbeiroID,
		Data:               req.Data,
		Hora:               req.Hora,
		Servico:            req.Servico,
		Status:             "pendente",
		NotificacaoEnviada: false,
	}

	err := as.storage.CreateAgendamento(agendamento)
	return agendamento, err
}

// ListarAgendamentos lista todos os agendamentos
func (as *AgendamentoService) ListarAgendamentos() []*models.Agendamento {
	return as.storage.GetAgendamentos()
}

// ObterAgendamento obtém um agendamento específico
func (as *AgendamentoService) ObterAgendamento(id string) *models.Agendamento {
	return as.storage.GetAgendamento(id)
}

// AtualizarStatus atualiza o status de um agendamento
func (as *AgendamentoService) AtualizarStatus(id string, novoStatus string) (*models.Agendamento, error) {
	statusValidos := []string{"confirmado", "pendente", "concluido", "cancelado"}
	valido := false
	for _, s := range statusValidos {
		if s == novoStatus {
			valido = true
			break
		}
	}
	if !valido {
		return nil, fmt.Errorf("status inválido")
	}

	agendamento := as.storage.GetAgendamento(id)
	if agendamento == nil {
		return nil, fmt.Errorf("agendamento não encontrado")
	}

	agendamento.Status = novoStatus
	err := as.storage.UpdateAgendamento(agendamento)
	return agendamento, err
}

// EnviarNotificacaoWhatsApp simula envio de notificação via WhatsApp
func (as *AgendamentoService) EnviarNotificacaoWhatsApp(agendamentoID string) (string, error) {
	agendamento := as.storage.GetAgendamento(agendamentoID)
	if agendamento == nil {
		return "", fmt.Errorf("agendamento não encontrado")
	}

	cliente := as.storage.GetCliente(agendamento.ClienteID)
	if cliente == nil {
		return "", fmt.Errorf("cliente não encontrado")
	}

	barbeiro := as.storage.GetBarbeiro(agendamento.BarbeiroID)
	if barbeiro == nil {
		return "", fmt.Errorf("barbeiro não encontrado")
	}

	// Construir mensagem
	dataFormatada := utils.FormatarData(agendamento.Data)
	mensagem := fmt.Sprintf(
		"Olá %s! Seu agendamento está confirmado para %s às %s com %s. Serviço: %s",
		cliente.Nome,
		dataFormatada,
		agendamento.Hora,
		barbeiro.Nome,
		agendamento.Servico,
	)

	// Remover caracteres especiais do telefone
	telefoneLimpo := utils.LimparTelefone(cliente.Telefone)

	// Construir URL do WhatsApp
	urlWhatsApp := fmt.Sprintf(
		"https://wa.me/55%s?text=%s",
		telefoneLimpo,
		url.QueryEscape(mensagem),
	)

	// Marcar como notificação enviada
	agendamento.NotificacaoEnviada = true
	as.storage.UpdateAgendamento(agendamento)

	return urlWhatsApp, nil
}

// ========== SERVIÇOS DE BARBEIRO ==========

// CriarBarbeiro cria um novo barbeiro
func (bs *BarbeiroService) CriarBarbeiro(req *models.CreateBarbeiroRequest) (*models.Barbeiro, error) {
	barbeiro := &models.Barbeiro{
		ID:             uuid.New().String(),
		Nome:           req.Nome,
		Telefone:       req.Telefone,
		Email:          req.Email,
		Especialidades: req.Especialidades,
		Foto:           req.Foto,
	}

	err := bs.storage.CreateBarbeiro(barbeiro)
	return barbeiro, err
}

// ListarBarbeiros lista todos os barbeiros
func (bs *BarbeiroService) ListarBarbeiros() []*models.Barbeiro {
	return bs.storage.GetBarbeiros()
}

// ObterBarbeiro obtém um barbeiro específico
func (bs *BarbeiroService) ObterBarbeiro(id string) *models.Barbeiro {
	return bs.storage.GetBarbeiro(id)
}

// AtualizarBarbeiro atualiza um barbeiro
func (bs *BarbeiroService) AtualizarBarbeiro(id string, req *models.CreateBarbeiroRequest) (*models.Barbeiro, error) {
	barbeiro := bs.storage.GetBarbeiro(id)
	if barbeiro == nil {
		return nil, fmt.Errorf("barbeiro não encontrado")
	}

	barbeiro.Nome = req.Nome
	barbeiro.Telefone = req.Telefone
	barbeiro.Email = req.Email
	barbeiro.Especialidades = req.Especialidades
	if req.Foto != "" {
		barbeiro.Foto = req.Foto
	}

	err := bs.storage.UpdateBarbeiro(barbeiro)
	return barbeiro, err
}

// DeletarBarbeiro deleta um barbeiro
func (bs *BarbeiroService) DeletarBarbeiro(id string) error {
	return bs.storage.DeleteBarbeiro(id)
}

// ObterDisponibilidade retorna horários disponíveis de um barbeiro em uma data
func (bs *BarbeiroService) ObterDisponibilidade(barbeiroID string, data string) []string {
	horariosFuncionamento := []string{
		"09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
		"14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
	}

	agendamentos := bs.storage.GetAgendamentosByBarbeiro(barbeiroID)

	reservados := make(map[string]bool)
	for _, a := range agendamentos {
		if a.Data == data && a.Status != "cancelado" {
			reservados[a.Hora] = true
		}
	}

	var disponiveis []string
	for _, hora := range horariosFuncionamento {
		if !reservados[hora] {
			disponiveis = append(disponiveis, hora)
		}
	}

	return disponiveis
}

// ========== SERVIÇOS DE CLIENTE ==========

// CriarCliente cria um novo cliente
func (cs *ClienteService) CriarCliente(req *models.CreateClienteRequest) (*models.Cliente, error) {
	cliente := &models.Cliente{
		ID:       uuid.New().String(),
		Nome:     req.Nome,
		Telefone: req.Telefone,
		Email:    req.Email,
	}

	err := cs.storage.CreateCliente(cliente)
	return cliente, err
}

// ListarClientes lista todos os clientes
func (cs *ClienteService) ListarClientes() []*models.Cliente {
	return cs.storage.GetClientes()
}

// ObterCliente obtém um cliente específico
func (cs *ClienteService) ObterCliente(id string) *models.Cliente {
	return cs.storage.GetCliente(id)
}

// AtualizarCliente atualiza um cliente
func (cs *ClienteService) AtualizarCliente(id string, req *models.CreateClienteRequest) (*models.Cliente, error) {
	cliente := cs.storage.GetCliente(id)
	if cliente == nil {
		return nil, fmt.Errorf("cliente não encontrado")
	}

	cliente.Nome = req.Nome
	cliente.Telefone = req.Telefone
	cliente.Email = req.Email

	err := cs.storage.UpdateCliente(cliente)
	return cliente, err
}

// DeletarCliente deleta um cliente
func (cs *ClienteService) DeletarCliente(id string) error {
	return cs.storage.DeleteCliente(id)
}

// ObterAgendamentosCliente retorna todos os agendamentos de um cliente
func (cs *ClienteService) ObterAgendamentosCliente(clienteID string) []*models.Agendamento {
	return cs.storage.GetAgendamentosByCliente(clienteID)
}

// ObterEstatisticas retorna estatísticas do sistema
type Estatisticas struct {
	TotalBarbeiros    int `json:"totalBarbeiros"`
	TotalClientes     int `json:"totalClientes"`
	TotalAgendamentos int `json:"totalAgendamentos"`
	AgendamentosHoje  int `json:"agendamentosHoje"`
}

func (cs *ClienteService) ObterEstatisticas(s *storage.Storage) *Estatisticas {
	hoje := time.Now().Format("2006-01-02")
	agendamentosHoje := 0

	for _, a := range s.GetAgendamentos() {
		if a.Data == hoje {
			agendamentosHoje++
		}
	}

	return &Estatisticas{
		TotalBarbeiros:    len(s.GetBarbeiros()),
		TotalClientes:     len(s.GetClientes()),
		TotalAgendamentos: len(s.GetAgendamentos()),
		AgendamentosHoje:  agendamentosHoje,
	}
}
