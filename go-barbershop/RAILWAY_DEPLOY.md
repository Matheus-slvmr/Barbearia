# 🚀 Deploy Grátis no Railway em 10 Minutos

## 🎯 Objetivo
Colocar seu backend Golang online com **Railway.app** - Grátis por 14 dias, depois $5/mês.

---

## 📋 Pré-requisitos

- [x] Conta GitHub (crie em github.com)
- [x] Projeto em local (pronto)
- [x] Código funcionando

---

## ✅ Passo 1: Preparar Código (2 min)

### 1.1 Criar Procfile
```bash
# Na raiz do projeto (mesma pasta que go.mod)
echo "web: cd go-barbershop && go run cmd/server/main.go" > Procfile
```

Ou criar manualmente:
```
Arquivo: Procfile (sem extensão)
Conteúdo:
web: cd go-barbershop && go run cmd/server/main.go
```

### 1.2 Verificar estrutura
```
Barbearia/
├── go-barbershop/
│   ├── cmd/
│   ├── internal/
│   ├── go.mod
│   ├── go.sum
│   └── ...
├── Procfile  ← NOVO, na raiz!
└── README.md
```

---

## ✅ Passo 2: GitHub (3 min)

### 2.1 Criar repositório no GitHub
1. Abra https://github.com/new
2. Nome: `barbershop` (ou seu nome)
3. Descrição: `Sistema de agendamento de barbearia`
4. Público
5. Create repository

### 2.2 Fazer push do código
```bash
# Na pasta Barbearia/
cd "sua-pasta/Barbearia"

# Inicializar Git
git init
git add .
git commit -m "Initial commit: Barbershop system"

# Adicionar remote
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/barbershop.git

# Fazer push
git push -u origin main
```

**✅ Código no GitHub!**

---

## ✅ Passo 3: Railway.app (5 min)

### 3.1 Criar conta
1. Abra https://railway.app
2. Clique em "Start Free"
3. Clique em "Continue with GitHub"
4. Autorize Railway no GitHub
5. Confirme email (check your inbox)

### 3.2 Criar novo projeto
1. Clique em "Start a New Project"
2. Selecione "Deploy from GitHub repo"
3. Clique em "Configure GitHub App"

### 3.3 Conectar repositório
1. Autorize Railway no GitHub
2. Selecione seu repositório `barbershop`
3. Clique em "Deploy"

**Railway faz deploy automático!** ⚡

### 3.4 Aguardar deploy
```
Status: Deploying...
(aguarde 2-3 min)
```

Quando ficar verde:
```
Status: ✅ Success
```

---

## ✅ Passo 4: Acessar Sua API (1 min)

### 4.1 Encontrar URL
1. Na dashboard Railway
2. Clique no seu projeto
3. Abra a aba "Deployment"
4. Copie o link (exemplo: `https://barbershop-production-xxx.up.railway.app`)

### 4.2 Testar
```bash
# Substituir XXX pela URL
curl https://barbershop-production-xxx.up.railway.app/health

# Resposta esperada:
# {"status":"ok"}
```

✅ **API Online!** 🎉

---

## 📊 Verificar Deploy

### Dashboard Railway

```
Project: barbershop
├─ Status: ✅ Healthy
├─ Logs: Mostra o que está acontecendo
├─ Deployments: Histórico de deploys
└─ Settings: Configurações
```

### Verificar Logs
1. Projeto → Deployment → View logs
2. Procure por: `Servidor iniciado em`

---

## 🔄 Atualizar Código

Sempre que atualizar, é automático:

```bash
# 1. Fazer mudanças
# 2. Commit
git add .
git commit -m "feat: nova funcionalidade"

# 3. Push
git push

# 4. Railway redeploy automaticamente!
```

---

## 🔐 Configurar Variáveis de Ambiente

Se precisar de `.env`:

1. Railway → Variáveis → Raw Editor
2. Adicione:
```
PORT=8080
ENV=production
```

---

## 💾 Dados Persistem?

❓ **Como funciona com data.json?**

```
Seu servidor (Railway)
    ↓
data.json criado na primeira vez
    ↓
Dados salvos em memória (RAM)
    ↓
Problema: Se Railway reiniciar, dados são perdidos!
```

### ✅ Solução: Usar Railway Postgres (Grátis)

1. Railway → Add Service → Postgres
2. Conectar ao seu projeto
3. Seguir [DEPLOYMENT.md](DEPLOYMENT.md) para migrar para PostgreSQL

---

## 🎯 Conectar Frontend (React)

Na pasta `Barbershop scheduling system/`, editar `.env` ou `vite.config.ts`:

```javascript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://barbershop-production-xxx.up.railway.app',
        changeOrigin: true
      }
    }
  }
})
```

Ou usar variável:
```javascript
const API_URL = process.env.VITE_API_URL || 'https://barbershop-production-xxx.up.railway.app'
```

---

## 🌐 Domain Customizado (Opcional)

Se quiser `seudominio.com` em vez de URL do Railway:

1. Railway → Settings → Custom Domain
2. Adicione seu domínio
3. Atualize DNS conforme instruções

---

## 💰 Custos

| Período | Preço | O Que Incluí |
|---------|-------|------------|
| 14 dias | $0 | Tudo desbloqueado |
| Depois | $5/mês | 100GB storage, 500h/mês |

Se não quiser pagar:
- ➡️ Use Render.com (gratuito sempre)
- ➡️ Use Google Cloud Run

---

## 🆘 Troubleshooting

### Erro: "Build failed"
```
Solução: Verificar logs
Railway → Logs → Ver mensagem de erro
Comum: falta de Procfile
```

### Erro: "Port not binding"
```
Solução: Procfile correto
web: cd go-barbershop && go run cmd/server/main.go
```

### API online mas dados não salvam
```
Solução: Usar PostgreSQL ao invés de JSON
Ver: DEPLOYMENT.md → PostgreSQL
```

### CORS error
```
Solução: Backend já tem CORS configurado
Verificar: internal/handlers/handlers.go
```

---

## ✅ Checklist

- [ ] Procfile criado
- [ ] Código no GitHub
- [ ] Conta Railway criada
- [ ] Projeto conectado
- [ ] Deploy bem-sucedido
- [ ] API respondendo (`/health`)
- [ ] Endpoints testados (`/api/barbeiros`)
- [ ] Frontend conectado (opcional)
- [ ] Funcionando 100%!

---

## 🎓 Próximos Passos

### Se tudo funcionar:
1. ✅ Compartilhe com amigos
2. ✅ Adicione features
3. ✅ Scale para PostgreSQL
4. ✅ Coloque em portfólio

### Se tiver erro:
1. ❓ Verifique os logs (Railway → Logs)
2. ❓ Procfile está na raiz?
3. ❓ Código no GitHub?
4. ❓ Permissões do GitHub?

---

## 📞 Suporte

- [Railway Docs](https://docs.railway.app)
- [Railway Community](https://railway.app/community)
- Stack Overflow: tag `railway.app`

---

## 🎉 Sucesso!

Sua API está:
- ✅ Online
- ✅ Escalável
- ✅ Grátis (por agora)
- ✅ Pronta para usar

**Aproveite!** 🚀
