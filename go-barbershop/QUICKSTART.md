# 🚀 Quick Start

## 1️⃣ Instalação (5 minutos)

### Pré-requisitos
- Go 1.21+ ([Download](https://golang.org/dl))
- Git (opcional)

### Passos

```bash
# 1. Clone ou baixe o projeto
git clone <repository-url>
cd go-barbershop

# 2. Baixe as dependências
go mod download

# 3. Execute a aplicação
go run cmd/server/main.go
```

**✅ Pronto!** Servidor rodando em `http://localhost:8080`

---

## 2️⃣ Primeiros Testes (2 minutos)

### Health Check
```bash
curl http://localhost:8080/health
```

### Listar Barbeiros
```bash
curl http://localhost:8080/api/barbeiros
```

### Listar Clientes
```bash
curl http://localhost:8080/api/clientes
```

### Ver Dashboard
```bash
curl http://localhost:8080/api/dashboard
```

---

## 3️⃣ Criar Seu Primeiro Agendamento

### Paso 1: Criar um Cliente
```bash
curl -X POST http://localhost:8080/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "telefone": "(11) 98765-4321",
    "email": "joao@example.com"
  }'
```

Anote o `id` retornado.

### Passo 2: Criar Agendamento
```bash
curl -X POST http://localhost:8080/api/agendamentos \
  -H "Content-Type: application/json" \
  -d '{
    "clienteId": "SEU_CLIENTE_ID",
    "barbeiroId": "1",
    "data": "2026-05-20",
    "hora": "14:00",
    "servico": "Corte"
  }'
```

### Passo 3: Enviar Notificação WhatsApp
```bash
curl -X POST http://localhost:8080/api/agendamentos/SEU_AGENDAMENTO_ID/notificacao
```

---

## 4️⃣ Comandos Úteis

### Desenvolvimento
```bash
# Executar
make dev

# Compilar
make build

# Testar
make test

# Formatar código
make fmt
```

### Docker
```bash
# Build
docker build -t barbershop .

# Run
docker run -p 8080:8080 barbershop

# Com Docker Compose
docker-compose up
```

---

## 5️⃣ Estrutura Básica

```
GET  /api/barbeiros          → Listar barbeiros
POST /api/barbeiros          → Criar barbeiro
GET  /api/barbeiros/{id}     → Obter barbeiro
PUT  /api/barbeiros/{id}     → Atualizar barbeiro
DEL  /api/barbeiros/{id}     → Deletar barbeiro

GET  /api/clientes           → Listar clientes
POST /api/clientes           → Criar cliente
GET  /api/clientes/{id}      → Obter cliente
PUT  /api/clientes/{id}      → Atualizar cliente
DEL  /api/clientes/{id}      → Deletar cliente

GET  /api/agendamentos       → Listar agendamentos
POST /api/agendamentos       → Criar agendamento
GET  /api/agendamentos/{id}  → Obter agendamento
PUT  /api/agendamentos/{id}/status → Atualizar status
POST /api/agendamentos/{id}/notificacao → Enviar notificação

GET  /api/barbeiros/{id}/disponibilidade?data=YYYY-MM-DD → Verificar disponibilidade
```

---

## 6️⃣ Próximos Passos

### Aprender
- 📖 Ler [README.md](README.md) completo
- 📚 Ver [API.md](API.md) para detalhes
- 🏗️ Entender [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

### Contribuir
- 👨‍💻 Ler [CONTRIBUTING.md](CONTRIBUTING.md)
- 🐛 Reportar bugs como issues
- ✨ Sugerir features

### Deploy
- 🚀 Ver [DEPLOYMENT.md](DEPLOYMENT.md)
- 🐳 Usar Docker
- ☁️ Deploy em cloud

---

## 7️⃣ Solução de Problemas

### Erro: "Port 8080 already in use"
```bash
# macOS/Linux
lsof -i :8080
kill -9 <PID>

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Erro: "Module not found"
```bash
go mod download
go mod tidy
```

### Docker: "Cannot connect"
```bash
docker ps  # Verificar se está rodando
docker logs <container-id>
```

---

## 8️⃣ Recursos Úteis

- 🔗 [Documentação Go](https://golang.org/doc/)
- 🔗 [gorilla/mux](https://github.com/gorilla/mux)
- 🔗 [REST API Design](https://restfulapi.net/)
- 🔗 [cURL Tutorial](https://curl.se/docs/)

---

## 9️⃣ Suporte

- 📝 Abra uma issue no GitHub
- 💬 Pergunte em Discussions
- 📧 Entre em contato

---

**Bem-vindo ao Barbershop API!** 🎉

Dúvidas? Leia a [documentação completa](README.md).
