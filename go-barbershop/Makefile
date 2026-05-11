.PHONY: help build run dev clean fmt lint test install-deps

BINARY_NAME=barbershop-server
MAIN_PATH=cmd/server/main.go
BUILD_DIR=build

help:
	@echo "Barbershop Scheduling System - Golang Backend"
	@echo ""
	@echo "Comandos disponíveis:"
	@echo "  make install-deps    - Baixar dependências"
	@echo "  make build           - Compilar o projeto"
	@echo "  make run             - Compilar e executar"
	@echo "  make dev             - Executar diretamente (sem compilação)"
	@echo "  make clean           - Limpar arquivos compilados"
	@echo "  make fmt             - Formatar código"
	@echo "  make lint            - Analisar código"
	@echo "  make test            - Executar testes"

install-deps:
	@echo "📦 Baixando dependências..."
	go mod download
	go mod tidy

build: install-deps
	@echo "🔨 Compilando..."
	@mkdir -p $(BUILD_DIR)
	go build -o $(BUILD_DIR)/$(BINARY_NAME) $(MAIN_PATH)
	@echo "✅ Compilação concluída: $(BUILD_DIR)/$(BINARY_NAME)"

run: build
	@echo "🚀 Iniciando servidor..."
	./$(BUILD_DIR)/$(BINARY_NAME)

dev:
	@echo "🚀 Iniciando em modo desenvolvimento..."
	go run $(MAIN_PATH)

clean:
	@echo "🧹 Limpando arquivos..."
	rm -rf $(BUILD_DIR)
	rm -f $(BINARY_NAME)
	@echo "✅ Limpeza concluída"

fmt:
	@echo "📝 Formatando código..."
	go fmt ./...
	@echo "✅ Formatação concluída"

lint:
	@echo "🔍 Analisando código..."
	@which golangci-lint > /dev/null || go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
	golangci-lint run ./...

test:
	@echo "🧪 Executando testes..."
	go test -v ./...

# Default
.DEFAULT_GOAL := help
