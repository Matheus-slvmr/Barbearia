# Barbershop Scheduling System - Backend em Golang

Sistema de agendamento para barbearia desenvolvido em **Go**, com API REST completa para gerenciar barbeiros, clientes e agendamentos.

## 🚀 Características

- ✅ Gerenciamento de Barbeiros
- ✅ Gerenciamento de Clientes
- ✅ Sistema de Agendamentos
- ✅ Verificação de Disponibilidade
- ✅ Notificações via WhatsApp
- ✅ Dashboard com Estatísticas
- ✅ API REST Completa
- ✅ CORS Habilitado
- ✅ Persistência em JSON

## 📋 Requisitos

- Go 1.21+
- Make (opcional, mas recomendado)

## 🔧 Instalação

1. **Clonar o repositório**
```bash
cd go-barbershop
```

2. **Baixar dependências**
```bash
go mod download
```

3. **Compilar e executar**
```bash
go run cmd/server/main.go
```

Ou usando Make:
```bash
make run
```

## 📖 Estrutura do Projeto

```
go-barbershop/
├── cmd/
│   └── server/          # Ponto de entrada da aplicação
├── internal/
│   ├── handlers/        # Controllers HTTP
│   ├── models/          # Tipos e estruturas
│   ├── services/        # Lógica de negócio
│   └── storage/         # Persistência de dados
├── pkg/
│   └── utils/           # Funções utilitárias
├── data/                # Armazenamento JSON (criado automaticamente)
├── go.mod               # Dependências do projeto
└── Makefile             # Scripts de build
```

## 🔌 API Endpoints

### Dashboard
- `GET /health` - Verificar saúde da API
- `GET /api/dashboard` - Obter estatísticas do sistema

### Agendamentos
- `GET /api/agendamentos` - Listar todos
- `POST /api/agendamentos` - Criar novo
- `GET /api/agendamentos/{id}` - Obter específico
- `PUT /api/agendamentos/{id}/status` - Atualizar status
- `POST /api/agendamentos/{id}/notificacao` - Enviar WhatsApp

### Barbeiros
- `GET /api/barbeiros` - Listar todos
- `POST /api/barbeiros` - Criar novo
- `GET /api/barbeiros/{id}` - Obter específico
- `PUT /api/barbeiros/{id}` - Atualizar
- `DELETE /api/barbeiros/{id}` - Deletar
- `GET /api/barbeiros/{id}/disponibilidade?data=YYYY-MM-DD` - Horários disponíveis

### Clientes
- `GET /api/clientes` - Listar todos
- `POST /api/clientes` - Criar novo
- `GET /api/clientes/{id}` - Obter específico
- `PUT /api/clientes/{id}` - Atualizar
- `DELETE /api/clientes/{id}` - Deletar

## 💻 Exemplos de Uso

### Criar um novo agendamento
```bash
curl -X POST http://localhost:8080/api/agendamentos \
  -H "Content-Type: application/json" \
  -d '{
    "clienteId": "1",
    "barbeiroId": "1",
    "data": "2026-05-20",
    "hora": "14:00",
    "servico": "Corte + Barba"
  }'
```

### Listar barbeiros
```bash
curl http://localhost:8080/api/barbeiros
```

### Obter disponibilidade
```bash
curl "http://localhost:8080/api/barbeiros/1/disponibilidade?data=2026-05-20"
```

### Enviar notificação WhatsApp
```bash
curl -X POST http://localhost:8080/api/agendamentos/1/notificacao
```

## 🛠️ Desenvolvimento

### Compilar
```bash
make build
```

### Executar em desenvolvimento
```bash
make dev
```

### Limpar arquivos gerados
```bash
make clean
```

## 📦 Dependências

- `github.com/google/uuid` - Geração de UUIDs
- `github.com/gorilla/mux` - Router HTTP
- `github.com/rs/cors` - CORS middleware

## 📝 Estrutura de Dados

### Barbeiro
```json
{
  "id": "uuid",
  "nome": "Carlos Silva",
  "telefone": "(11) 98765-4321",
  "email": "carlos@barberpro.com",
  "especialidades": ["Corte Clássico", "Barba"],
  "foto": ""
}
```

### Cliente
```json
{
  "id": "uuid",
  "nome": "Pedro Oliveira",
  "telefone": "(11) 99876-5432",
  "email": "pedro@email.com"
}
```

### Agendamento
```json
{
  "id": "uuid",
  "clienteId": "1",
  "barbeiroId": "1",
  "data": "2026-05-20",
  "hora": "14:00",
  "servico": "Corte + Barba",
  "status": "confirmado",
  "notificacaoEnviada": true
}
```

## 🔐 Segurança

- Validação de dados de entrada
- Tratamento de erros robusto
- CORS habilitado para requisições cross-origin

## 📄 Licença

Este projeto é de uso educacional.

## 👨‍💻 Autor

Desenvolvido como parte da disciplina de Introdução à Programação - UFG
