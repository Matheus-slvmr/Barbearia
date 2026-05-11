# Contributing Guide

## Como Contribuir

Obrigado por interesse em contribuir! Aqui estão as diretrizes:

## Desenvolvimento

### Setup Local

```bash
# Clonar repositório
git clone <repo>
cd go-barbershop

# Instalar dependências
make install-deps

# Executar em desenvolvimento
make dev
```

### Code Style

Seguimos o padrão Go:

```bash
# Formatar código
make fmt

# Analisar código
make lint
```

### Estrutura de Branches

- `main` - Código em produção (estável)
- `develop` - Código em desenvolvimento
- `feature/xxx` - Nova feature
- `bugfix/xxx` - Correção de bug
- `hotfix/xxx` - Correção urgente

### Workflow de Contribuição

1. **Fork do repositório**
2. **Criar branch feature**
   ```bash
   git checkout -b feature/sua-feature
   ```

3. **Fazer commits claros**
   ```bash
   git commit -m "feat: descrição clara da feature"
   ```

4. **Push para seu fork**
   ```bash
   git push origin feature/sua-feature
   ```

5. **Abrir Pull Request**

### Mensagens de Commit

Usar convenção Conventional Commits:

- `feat:` Nova feature
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `perf:` Otimização
- `test:` Testes
- `chore:` Tarefas

Exemplo:
```
feat: adicionar validação de email ao cliente
```

## Testes

Toda feature deve ter testes:

```bash
# Rodar testes
go test -v ./...

# Com coverage
go test -cover ./...
```

## Relatando Bugs

Criar issue com:
- Descrição clara
- Passos para reproduzir
- Comportamento esperado
- Comportamento atual
- Ambiente (OS, versão Go, etc)

## Solicitações de Features

Criar discussion ou issue com:
- Caso de uso
- Proposta de solução
- Alternativas consideradas

## Código de Conduta

- Ser respeitoso
- Não discriminação
- Feedback construtivo
- Colaboração

## Dúvidas?

Abra uma discussion!

---

**Agradecemos suas contribuições!** 🙏
