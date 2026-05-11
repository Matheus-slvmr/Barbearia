# API Routes Documentation

## Base URL
```
http://localhost:8080
```

## Authentication
Atualmente sem autenticação. Em produção, implementar JWT.

## Response Format
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": {}
}
```

---

## 1. HEALTH CHECK

### Get Health Status
```
GET /health
```

**Response:** `200 OK`
```json
{
  "status": "ok"
}
```

---

## 2. DASHBOARD

### Get Dashboard Statistics
```
GET /api/dashboard
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "totalBarbeiros": 2,
    "totalClientes": 3,
    "totalAgendamentos": 10,
    "agendamentosHoje": 2
  }
}
```

---

## 3. AGENDAMENTOS (Appointments)

### List All Appointments
```
GET /api/agendamentos
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
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
  ]
}
```

### Create Appointment
```
POST /api/agendamentos
Content-Type: application/json
```

**Request Body:**
```json
{
  "clienteId": "1",
  "barbeiroId": "1",
  "data": "2026-05-20",
  "hora": "14:00",
  "servico": "Corte + Barba"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Agendamento criado com sucesso",
  "data": {
    "id": "uuid",
    "clienteId": "1",
    "barbeiroId": "1",
    "data": "2026-05-20",
    "hora": "14:00",
    "servico": "Corte + Barba",
    "status": "pendente",
    "notificacaoEnviada": false
  }
}
```

### Get Appointment
```
GET /api/agendamentos/{id}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": { /* appointment object */ }
}
```

### Update Appointment Status
```
PUT /api/agendamentos/{id}/status
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "confirmado"
}
```

**Allowed statuses:** `confirmado`, `pendente`, `concluido`, `cancelado`

**Response:** `200 OK`

### Send WhatsApp Notification
```
POST /api/agendamentos/{id}/notificacao
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Notificação enviada com sucesso",
  "data": {
    "whatsappUrl": "https://wa.me/55..."
  }
}
```

---

## 4. BARBEIROS (Barbers)

### List All Barbers
```
GET /api/barbeiros
```

### Create Barber
```
POST /api/barbeiros
Content-Type: application/json
```

**Request Body:**
```json
{
  "nome": "Carlos Silva",
  "telefone": "(11) 98765-4321",
  "email": "carlos@barberpro.com",
  "especialidades": ["Corte Clássico", "Barba", "Degradê"],
  "foto": "url-to-photo"
}
```

### Get Barber
```
GET /api/barbeiros/{id}
```

### Update Barber
```
PUT /api/barbeiros/{id}
Content-Type: application/json
```

**Request Body:** Same as Create

### Delete Barber
```
DELETE /api/barbeiros/{id}
```

### Get Barber Availability
```
GET /api/barbeiros/{id}/disponibilidade?data=2026-05-20
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": ["09:00", "09:30", "10:00", "14:00", "14:30"]
}
```

---

## 5. CLIENTES (Clients)

### List All Clients
```
GET /api/clientes
```

### Create Client
```
POST /api/clientes
Content-Type: application/json
```

**Request Body:**
```json
{
  "nome": "Pedro Oliveira",
  "telefone": "(11) 99876-5432",
  "email": "pedro@email.com"
}
```

### Get Client
```
GET /api/clientes/{id}
```

### Update Client
```
PUT /api/clientes/{id}
Content-Type: application/json
```

**Request Body:** Same as Create

### Delete Client
```
DELETE /api/clientes/{id}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Dados inválidos"
}
```

### 404 Not Found
```json
{
  "error": "Recurso não encontrado"
}
```

### 500 Internal Server Error
```json
{
  "error": "Erro interno do servidor"
}
```

---

## CORS Headers

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## Validation Rules

### Data
- Formato: `YYYY-MM-DD`
- Exemplo: `2026-05-20`

### Hora
- Formato: `HH:MM`
- Exemplo: `14:30`

### Telefone
- Deve conter números (com ou sem formatação)
- Exemplo: `(11) 98765-4321` ou `11987654321`

### Email
- Formato válido de email
- Opcional em alguns endpoints

---

## Rate Limiting

Não implementado no momento. Pode ser adicionado futuramente.

---

## Versionamento

API versão: `v1`
Todos os endpoints começam com `/api/`
