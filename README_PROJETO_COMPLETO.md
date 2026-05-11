# 🏋️ Barbearia - Sistema de Agendamento

Sistema completo de gerenciamento de barbearia com **Frontend em React** e **Backend em Golang**.

## 📁 Estrutura do Projeto

```
Barbearia/
│
├── Barbershop scheduling system/    (Frontend React - Original)
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
│
├── go-barbershop/                   (Backend Golang - NOVO)
│   ├── cmd/
│   ├── internal/
│   ├── pkg/
│   ├── go.mod
│   ├── Makefile
│   ├── Dockerfile
│   └── README.md
│
└── README.md (Este arquivo)
```

---

## 🚀 Quick Start

### Backend (Golang)

```bash
cd go-barbershop

# Instalar e executar
go mod download
go run cmd/server/main.go

# Servidor rodando em http://localhost:8080
```

### Frontend (React)

```bash
cd "Barbershop scheduling system"

# Instalar e executar
npm install
npm run dev

# Aplicação rodando em http://localhost:5173
```

---

## 📚 Documentação

### 🔧 Backend (Golang)
- [Backend README](go-barbershop/README.md) - Visão geral
- [Quick Start](go-barbershop/QUICKSTART.md) - Início rápido
- [API Documentation](go-barbershop/API.md) - Endpoints
- [Deployment Guide](go-barbershop/DEPLOYMENT.md) - Deploy
- [Project Structure](go-barbershop/PROJECT_STRUCTURE.md) - Arquitetura
- [Summary Report](go-barbershop/SUMMARY.md) - Relatório completo

### 🎨 Frontend (React)
- [Frontend README](Barbershop%20scheduling%20system/README.md)

---

## 🔌 Arquitetura

```
┌─────────────────────────────────────────────┐
│           Cliente (Navegador)               │
└──────────────────┬──────────────────────────┘
                   │ HTTP/CORS
                   ▼
┌─────────────────────────────────────────────┐
│    Frontend React (Port 5173)               │
├─────────────────────────────────────────────┤
│  - Home                                     │
│  - Admin Dashboard                          │
│  - Gerenciamento de Agendamentos            │
│  - Gerenciamento de Barbeiros               │
│  - Gerenciamento de Clientes                │
└──────────────────┬──────────────────────────┘
                   │ REST API
                   ▼
┌─────────────────────────────────────────────┐
│    Backend Golang (Port 8080)               │
├─────────────────────────────────────────────┤
│  - Handlers HTTP                            │
│  - Business Logic                           │
│  - Data Persistence (JSON)                  │
│  - WhatsApp Integration                     │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
              data.json
```

---

## 🔌 API Endpoints Principais

### Health & Dashboard
- `GET /health` - Health check
- `GET /api/dashboard` - Estatísticas

### Barbeiros
- `GET /api/barbeiros` - Listar
- `POST /api/barbeiros` - Criar
- `GET /api/barbeiros/{id}` - Obter
- `PUT /api/barbeiros/{id}` - Atualizar
- `DELETE /api/barbeiros/{id}` - Deletar
- `GET /api/barbeiros/{id}/disponibilidade?data=YYYY-MM-DD` - Disponibilidade

### Clientes
- `GET /api/clientes` - Listar
- `POST /api/clientes` - Criar
- `GET /api/clientes/{id}` - Obter
- `PUT /api/clientes/{id}` - Atualizar
- `DELETE /api/clientes/{id}` - Deletar

### Agendamentos
- `GET /api/agendamentos` - Listar
- `POST /api/agendamentos` - Criar
- `GET /api/agendamentos/{id}` - Obter
- `PUT /api/agendamentos/{id}/status` - Atualizar status
- `POST /api/agendamentos/{id}/notificacao` - Enviar WhatsApp

---

## 🛠️ Stack Tecnológico

### Backend
- **Linguagem**: Go 1.21+
- **Web Framework**: gorilla/mux
- **Persistência**: JSON
- **CORS**: rs/cors
- **UUID**: google/uuid

### Frontend
- **Framework**: React 18
- **Bundler**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Router**: React Router
- **State**: Local Storage

---

## 🚀 Deploy

### Local
```bash
# Terminal 1 - Backend
cd go-barbershop
go run cmd/server/main.go

# Terminal 2 - Frontend
cd "Barbershop scheduling system"
npm run dev
```

### Docker
```bash
# Backend
cd go-barbershop
docker build -t barbershop-api .
docker run -p 8080:8080 barbershop-api

# Frontend (do package.json)
npm run build
npm run preview
```

### Production
Ver [go-barbershop/DEPLOYMENT.md](go-barbershop/DEPLOYMENT.md)

---

## 📊 Features

### ✅ Gerenciamento de Barbeiros
- CRUD completo
- Especialidades
- Foto de perfil
- Verificação de disponibilidade

### ✅ Gerenciamento de Clientes
- CRUD completo
- Telefone e email
- Histórico de agendamentos

### ✅ Sistema de Agendamentos
- Criação de agendamentos
- Verificação de conflitos
- Atualização de status
- Notificações via WhatsApp

### ✅ Dashboard
- Estatísticas gerais
- Agendamentos do dia
- Total de clientes e barbeiros

---

## 🔐 Segurança

- ✅ Validação de inputs
- ✅ CORS configurado
- ✅ Type-safe (Go + TypeScript)
- ✅ Thread-safe (RWMutex)
- ✅ Sem dados sensíveis em logs

---

## 🧪 Testes

### Backend
```bash
cd go-barbershop
go test -v ./...

# Ou com script
./test-api.sh  # Linux/Mac
test-api.bat   # Windows
```

### Frontend
```bash
cd "Barbershop scheduling system"
npm test
```

---

## 📝 Convenções

### Git Workflow
- `main` - Produção
- `develop` - Desenvolvimento
- `feature/xxx` - Features
- `bugfix/xxx` - Correções

### Commits
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes

### Branches
```bash
git checkout -b feature/nova-feature
```

---

## 🔄 Workflow de Desenvolvimento

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/sua-feature
   ```

2. **Make Changes**
   - Backend: `go-barbershop/`
   - Frontend: `Barbershop scheduling system/`

3. **Test**
   ```bash
   # Backend
   cd go-barbershop && make test
   
   # Frontend
   cd "Barbershop scheduling system" && npm test
   ```

4. **Commit**
   ```bash
   git commit -m "feat: descrição"
   ```

5. **Push & PR**
   ```bash
   git push origin feature/sua-feature
   ```

---

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Linux/Mac
lsof -i :8080
lsof -i :5173

# Windows
netstat -ano | findstr :8080
netstat -ano | findstr :5173
```

### Dependency Issues
```bash
# Backend
cd go-barbershop
go clean -modcache
go mod download

# Frontend
cd "Barbershop scheduling system"
rm -rf node_modules package-lock.json
npm install
```

### CORS Issues
- Verificar `ALLOWED_ORIGINS` no backend
- Verificar `proxy` no `vite.config.ts`

---

## 📞 Contato & Suporte

- 📧 Email: seu-email@exemplo.com
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

## 📄 Licença

Projeto educacional - UFG

---

## 🎓 Informações

- **Instituição**: Universidade Federal de Goiás (UFG)
- **Disciplina**: Introdução à Programação
- **Período**: 2026
- **Professor**: [Nome do professor]

---

## 🎉 Bem-vindo!

Para começar:

1. Leia a [documentação do backend](go-barbershop/README.md)
2. Leia a [documentação do frontend](Barbershop%20scheduling%20system/README.md)
3. Execute `go run cmd/server/main.go` no terminal 1
4. Execute `npm run dev` no terminal 2
5. Acesse `http://localhost:5173`

**Boa sorte!** 🚀
