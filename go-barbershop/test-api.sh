#!/bin/bash

# Barbershop API - Test Script
# Script para testar os endpoints da API

API_URL="http://localhost:8080"

echo "🧪 Testando Barbershop API..."
echo "================================"

# 1. Health Check
echo ""
echo "📌 1. Health Check"
curl -X GET $API_URL/health

# 2. Dashboard
echo ""
echo ""
echo "📌 2. Dashboard"
curl -X GET $API_URL/api/dashboard

# 3. List Barbeiros
echo ""
echo ""
echo "📌 3. Listar Barbeiros"
curl -X GET $API_URL/api/barbeiros

# 4. List Clientes
echo ""
echo ""
echo "📌 4. Listar Clientes"
curl -X GET $API_URL/api/clientes

# 5. List Agendamentos
echo ""
echo ""
echo "📌 5. Listar Agendamentos"
curl -X GET $API_URL/api/agendamentos

# 6. Create Barbeiro
echo ""
echo ""
echo "📌 6. Criar Barbeiro"
curl -X POST $API_URL/api/barbeiros \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João da Barbearia",
    "telefone": "(11) 98765-1234",
    "email": "joao@barbearia.com",
    "especialidades": ["Corte Moderno", "Design"]
  }'

# 7. Create Cliente
echo ""
echo ""
echo "📌 7. Criar Cliente"
curl -X POST $API_URL/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste Cliente",
    "telefone": "(11) 99876-1234",
    "email": "cliente@test.com"
  }'

# 8. Create Agendamento
echo ""
echo ""
echo "📌 8. Criar Agendamento"
curl -X POST $API_URL/api/agendamentos \
  -H "Content-Type: application/json" \
  -d '{
    "clienteId": "1",
    "barbeiroId": "1",
    "data": "2026-05-25",
    "hora": "15:00",
    "servico": "Corte Clássico"
  }'

# 9. Get Barbeiro Availability
echo ""
echo ""
echo "📌 9. Verificar Disponibilidade de Barbeiro"
curl -X GET "$API_URL/api/barbeiros/1/disponibilidade?data=2026-05-25"

echo ""
echo ""
echo "✅ Testes concluídos!"
