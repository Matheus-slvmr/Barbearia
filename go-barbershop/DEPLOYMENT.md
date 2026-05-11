# Deployment Guide

## Tipos de Deployment

### 1. Desenvolvimento Local

```bash
# Clonar repositório
cd go-barbershop

# Instalar dependências
go mod download

# Executar
go run cmd/server/main.go
```

Acesse: `http://localhost:8080`

### 2. Build Binário

```bash
# Compilar
make build

# Executar
./build/barbershop-server
```

### 3. Docker Local

```bash
# Build da imagem
docker build -t barbershop-api .

# Executar container
docker run -p 8080:8080 -v $(pwd)/data:/root/data barbershop-api
```

### 4. Docker Compose

```bash
# Iniciar
docker-compose up -d

# Parar
docker-compose down

# Logs
docker-compose logs -f
```

### 5. Production Deployment

#### Usando Systemd (Linux)

Criar arquivo `/etc/systemd/system/barbershop.service`:

```ini
[Unit]
Description=Barbershop API Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/barbershop
ExecStart=/opt/barbershop/barbershop-server
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Então:
```bash
sudo systemctl enable barbershop
sudo systemctl start barbershop
sudo systemctl status barbershop
```

#### Usando Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name api.barbearia.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### Usando PM2 (Node.js-like Management)

```bash
# Converter para executable
go build -o barbershop-server cmd/server/main.go

# Usar com PM2 (alternativa: usar golang-serve ou similar)
pm2 start ./barbershop-server --name barbershop
pm2 save
pm2 startup
```

## Variáveis de Ambiente

Criar arquivo `.env`:

```bash
SERVER_PORT=8080
ENV=production
LOG_LEVEL=info
```

## Monitoramento

### Logs

Os logs são enviados para stdout. Você pode redirecioná-los:

```bash
./barbershop-server > app.log 2>&1 &
```

Ou com systemd:
```bash
journalctl -u barbershop -f
```

### Health Check

```bash
curl http://localhost:8080/health
```

### Métricas

Endpoint de status:
```bash
curl http://localhost:8080/api/dashboard
```

## Backup

Fazer backup do arquivo de dados:

```bash
cp -r data/ data-backup-$(date +%Y%m%d)
```

Ou com Git:
```bash
git add -A
git commit -m "Backup: $(date)"
git push
```

## Rollback

Se precisar reverter:

```bash
# Reverter para versão anterior
git checkout HEAD~1

# Recompilar
make build

# Reiniciar
systemctl restart barbershop
```

## Performance

### Otimizações

1. **Usar CDN para assets** (se houver frontend estático)
2. **Implementar cache HTTP** com headers apropriados
3. **Usar database real** (PostgreSQL/MySQL) em produção
4. **Implementar rate limiting**
5. **Monitorar conexões ativas**

### Benchmark

```bash
# Teste de carga
ab -n 1000 -c 100 http://localhost:8080/health

# Ou com wrk (se instalado)
wrk -t4 -c100 -d30s http://localhost:8080/health
```

## Segurança

### Checklist

- [ ] Usar HTTPS em produção
- [ ] Implementar autenticação (JWT)
- [ ] Validar inputs rigorosamente
- [ ] Usar secrets para dados sensíveis
- [ ] Implementar rate limiting
- [ ] Logar eventos importantes
- [ ] Fazer backup regular
- [ ] Manter Go atualizado
- [ ] Usar WAF (Web Application Firewall)

### Certificado SSL

Com Let's Encrypt e Certbot:

```bash
certbot certonly --standalone -d api.barbearia.com
```

## CI/CD

### GitHub Actions Example

Criar `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build
        run: make build
      
      - name: Test
        run: go test ./...
      
      - name: Deploy
        run: |
          scp -r build/* user@server:/opt/barbershop/
          ssh user@server 'systemctl restart barbershop'
```

## Troubleshooting

### Porta já em uso

```bash
# Linux/Mac
lsof -i :8080
kill -9 <PID>

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Erro de permissão

```bash
sudo chown -R www-data:www-data /opt/barbershop
chmod -R 755 /opt/barbershop
```

### Problema com CORS

Verificar headers CORS:
```bash
curl -H "Origin: http://exemplo.com" -v http://localhost:8080/api/barbeiros
```

## Escalabilidade

Para escalar:

1. **Usar Load Balancer** (HAProxy, nginx)
2. **Database compartilhada** (PostgreSQL, MySQL)
3. **Redis para cache**
4. **Message queue** (RabbitMQ)
5. **Kubernetes** para orquestração

## Próximas Etapas

- [ ] Implementar autenticação JWT
- [ ] Migrar para PostgreSQL
- [ ] Adicionar logging estruturado
- [ ] Implementar rate limiting
- [ ] Adicionar métricas Prometheus
- [ ] Criar dashboard de monitoramento
- [ ] Implementar CI/CD
