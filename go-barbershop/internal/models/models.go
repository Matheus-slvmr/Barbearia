package models

// Barbeiro representa um barbeiro da barbearia
type Barbeiro struct {
	ID             string   `json:"id"`
	Nome           string   `json:"nome"`
	Telefone       string   `json:"telefone"`
	Email          string   `json:"email"`
	Especialidades []string `json:"especialidades"`
	Foto           string   `json:"foto,omitempty"`
}

// Cliente representa um cliente da barbearia
type Cliente struct {
	ID       string `json:"id"`
	Nome     string `json:"nome"`
	Telefone string `json:"telefone"`
	Email    string `json:"email,omitempty"`
}

// Agendamento representa um agendamento no sistema
type Agendamento struct {
	ID                 string `json:"id"`
	ClienteID          string `json:"clienteId"`
	BarbeiroID         string `json:"barbeiroId"`
	Data               string `json:"data"` // Formato: YYYY-MM-DD
	Hora               string `json:"hora"` // Formato: HH:MM
	Servico            string `json:"servico"`
	Status             string `json:"status"` // confirmado, pendente, concluido, cancelado
	NotificacaoEnviada bool   `json:"notificacaoEnviada"`
}

// Barbeiro
type CreateBarbeiroRequest struct {
	Nome           string   `json:"nome"`
	Telefone       string   `json:"telefone"`
	Email          string   `json:"email"`
	Especialidades []string `json:"especialidades"`
	Foto           string   `json:"foto,omitempty"`
}

// Cliente
type CreateClienteRequest struct {
	Nome     string `json:"nome"`
	Telefone string `json:"telefone"`
	Email    string `json:"email,omitempty"`
}

// Agendamento
type CreateAgendamentoRequest struct {
	ClienteID  string `json:"clienteId"`
	BarbeiroID string `json:"barbeiroId"`
	Data       string `json:"data"`
	Hora       string `json:"hora"`
	Servico    string `json:"servico"`
}

// Response padrão
type Response struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

// ErrorResponse
type ErrorResponse struct {
	Error string `json:"error"`
}
