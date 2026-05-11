# Project Structure

```
go-barbershop/
│
├── cmd/
│   └── server/
│       ├── main.go               # Ponto de entrada da aplicação
│       └── main_test.go          # Testes da aplicação
│
├── internal/
│   ├── handlers/
│   │   └── handlers.go           # Controllers HTTP
│   │
│   ├── models/
│   │   └── models.go             # Estruturas de dados
│   │
│   ├── services/
│   │   └── services.go           # Lógica de negócio
│   │
│   └── storage/
│       └── storage.go            # Persistência de dados
│
├── pkg/
│   └── utils/
│       └── utils.go              # Funções utilitárias
│
├── data/
│   └── data.json                 # Dados persistidos (criado automaticamente)
│
├── Dockerfile                    # Container Docker
├── docker-compose.yml            # Orquestração Docker
├── Makefile                      # Scripts de build
├── go.mod                        # Dependências do módulo
├── go.sum                        # Hash das dependências
├── .gitignore                    # Arquivos ignorados pelo Git
│
├── README.md                     # Documentação principal
├── API.md                        # Documentação da API
├── DEPLOYMENT.md                 # Guia de deployment
├── CONTRIBUTING.md               # Guia de contribuição
├── .env.example                  # Exemplo de variáveis de ambiente
│
├── test-api.sh                   # Script de testes (Linux/Mac)
└── test-api.bat                  # Script de testes (Windows)
```

## Descrição das Pastas

### `/cmd/server/`
- Contém o ponto de entrada da aplicação (`main.go`)
- Configuração de rotas e inicialização do servidor
- Testes da aplicação

### `/internal/`
Código privado do projeto (não exportado):

#### `/internal/handlers/`
- Controllers HTTP
- Processamento de requisições
- Retorno de respostas

#### `/internal/models/`
- Estruturas de dados (Barbeiro, Cliente, Agendamento)
- Tipos de requisição e resposta
- Validações de dados

#### `/internal/services/`
- Lógica de negócio
- Validações complexas
- Orquestração de operações

#### `/internal/storage/`
- Persistência de dados
- Operações CRUD
- Sincronização com arquivo JSON

### `/pkg/utils/`
- Funções utilitárias
- Formatação de dados
- Validações comuns
- Helpers

### `/data/`
- Armazenamento de dados em JSON
- Criado automaticamente

## Arquivos de Configuração

### `go.mod` e `go.sum`
- Controle de dependências
- Reproducibilidade do build

### `Makefile`
- Scripts de desenvolvimento
- Build, test, clean, fmt, lint

### `Dockerfile`
- Container Docker multi-stage
- Otimização de tamanho

### `docker-compose.yml`
- Orquestração local
- Volume para dados

### `.gitignore`
- Arquivos ignorados pelo Git
- Build artifacts, IDE, env

## Fluxo de Dados

```
Requisição HTTP
    ↓
Router (gorilla/mux)
    ↓
Handler (handlers.go)
    ↓
Service (services.go)
    ↓
Storage (storage.go)
    ↓
JSON File (data.json)
```

## Padrões de Código

### Imports
```go
import (
	"stdlib"
	
	"third-party"
	
	"github.com/matheus/barbershop"
)
```

### Nomes
- Variáveis: `camelCase`
- Constantes: `CONSTANT_CASE` ou `ConstantCase`
- Funções: `PascalCase` (exported), `camelCase` (private)
- Pacotes: `lowercase`

### Error Handling
```go
if err != nil {
	return nil, fmt.Errorf("contexto: %w", err)
}
```

### Comentários
- Comentar funções públicas
- Comentar lógica complexa
- Usar inglês para documentação

## Build Matrix

| OS      | Arch   | Status |
|---------|--------|--------|
| Linux   | amd64  | ✅     |
| Linux   | arm64  | ✅     |
| macOS   | amd64  | ✅     |
| macOS   | arm64  | ✅     |
| Windows | amd64  | ✅     |

## Dependências Externas

| Pacote           | Versão | Propósito           |
|------------------|--------|---------------------|
| google/uuid      | 1.5.0  | Geração de UUIDs    |
| gorilla/mux      | 1.8.1  | Router HTTP         |
| rs/cors          | 1.10.1 | Middleware CORS     |

## Performance

- Mutex RWLock em Storage para thread-safety
- In-memory cache com JSON file fallback
- Async HTTP handlers com goroutines
- Minimal dependencies (3 apenas)

## Segurança

- Validação de inputs em handlers
- Sanitização de dados
- CORS configurável
- Sem dados sensíveis em logs
- Isolamento de pacotes privados (`internal/`)

## Escalabilidade

Preparado para migração para:
- PostgreSQL/MySQL
- Redis cache
- Message queues
- Kubernetes deployment
