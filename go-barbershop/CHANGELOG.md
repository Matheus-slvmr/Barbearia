# Changelog

## Versionamento

Seguimos [Semantic Versioning](https://semver.org/):
- MAJOR: Mudanças incompatíveis
- MINOR: Novas funcionalidades (compatíveis)
- PATCH: Correções de bugs

## [1.0.0] - 2026-05-11

### ✨ Features
- ✅ Gerenciamento de Barbeiros (CRUD)
- ✅ Gerenciamento de Clientes (CRUD)
- ✅ Gerenciamento de Agendamentos (CRUD)
- ✅ Verificação de Disponibilidade por Barbeiro
- ✅ Atualização de Status de Agendamentos
- ✅ Notificações via WhatsApp (URL generation)
- ✅ Dashboard com Estatísticas
- ✅ API REST completa
- ✅ CORS habilitado
- ✅ Persistência em JSON
- ✅ Validação de dados
- ✅ Docker support

### 📚 Documentation
- ✅ README.md completo
- ✅ API.md com endpoints
- ✅ DEPLOYMENT.md com guias
- ✅ CONTRIBUTING.md para contribuintes
- ✅ PROJECT_STRUCTURE.md
- ✅ API documentation inline

### 🔧 DevOps
- ✅ Dockerfile (multi-stage)
- ✅ docker-compose.yml
- ✅ Makefile com scripts úteis
- ✅ .gitignore
- ✅ Test scripts (shell + batch)

### 🧪 Testing
- ✅ Unit tests básicos
- ✅ Test scripts para API

### 🏗️ Architecture
- ✅ Clean architecture (handlers/services/storage)
- ✅ Separation of concerns
- ✅ Dependency injection
- ✅ Thread-safe storage (RWMutex)

## [0.1.0] - Initial Release

### 📋 Core Features
- API REST básica
- Modelos de dados
- Storage em JSON
- Handlers HTTP
- Services com lógica de negócio

---

## Roadmap Futuro

### v1.1.0
- [ ] Integração real com WhatsApp Business API
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Autenticação JWT
- [ ] Rate limiting

### v1.2.0
- [ ] Migração para PostgreSQL
- [ ] Redis cache
- [ ] Logs estruturados (slog)
- [ ] Métricas Prometheus
- [ ] Paginação nas APIs

### v2.0.0
- [ ] WebSocket para real-time updates
- [ ] GraphQL API (além de REST)
- [ ] Message queue (RabbitMQ)
- [ ] Microserviços
- [ ] Kubernetes deployment

---

## Notas de Release

### Como fazer release

1. Update version em README
2. Update CHANGELOG.md
3. Commit: `chore: bump version to X.Y.Z`
4. Tag: `git tag vX.Y.Z`
5. Push: `git push origin --tags`
6. GitHub Release

---

## Suporte

- Issues: GitHub Issues
- Discussões: GitHub Discussions
- Email: seu-email@exemplo.com

---

Última atualização: 2026-05-11
