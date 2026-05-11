@echo off
REM Barbershop API - Test Script (Windows)
REM Script para testar os endpoints da API

SET API_URL=http://localhost:8080

echo Testando Barbershop API...
echo ==================================

REM 1. Health Check
echo.
echo 1. Health Check
curl -X GET %API_URL%/health

REM 2. Dashboard
echo.
echo.
echo 2. Dashboard
curl -X GET %API_URL%/api/dashboard

REM 3. List Barbeiros
echo.
echo.
echo 3. Listar Barbeiros
curl -X GET %API_URL%/api/barbeiros

REM 4. List Clientes
echo.
echo.
echo 4. Listar Clientes
curl -X GET %API_URL%/api/clientes

REM 5. List Agendamentos
echo.
echo.
echo 5. Listar Agendamentos
curl -X GET %API_URL%/api/agendamentos

echo.
echo.
echo Testes concluidos!
