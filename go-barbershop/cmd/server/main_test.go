package main

import (
	"testing"

	"github.com/matheus/barbershop/internal/models"
	"github.com/matheus/barbershop/internal/storage"
	"github.com/matheus/barbershop/pkg/utils"
)

func TestIsValidDate(t *testing.T) {
	tests := []struct {
		name     string
		date     string
		expected bool
	}{
		{"Valid date", "2026-05-20", true},
		{"Invalid date", "20-05-2026", false},
		{"Empty date", "", false},
		{"Invalid format", "2026/05/20", false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := utils.IsValidDate(tt.date); got != tt.expected {
				t.Errorf("IsValidDate(%s) = %v, want %v", tt.date, got, tt.expected)
			}
		})
	}
}

func TestIsValidTime(t *testing.T) {
	tests := []struct {
		name     string
		time     string
		expected bool
	}{
		{"Valid time", "14:30", true},
		{"Invalid time", "25:00", false},
		{"Invalid format", "14:30:00", false},
		{"Empty time", "", false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := utils.IsValidTime(tt.time); got != tt.expected {
				t.Errorf("IsValidTime(%s) = %v, want %v", tt.time, got, tt.expected)
			}
		})
	}
}

func TestLimparTelefone(t *testing.T) {
	tests := []struct {
		name     string
		phone    string
		expected string
	}{
		{"Phone with formatting", "(11) 98765-4321", "11987654321"},
		{"Phone without formatting", "11987654321", "11987654321"},
		{"Empty phone", "", ""},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := utils.LimparTelefone(tt.phone); got != tt.expected {
				t.Errorf("LimparTelefone(%s) = %v, want %v", tt.phone, got, tt.expected)
			}
		})
	}
}

func TestStorageCreateBarbeiro(t *testing.T) {
	s := storage.NewStorage(":memory:")

	barbeiro := &models.Barbeiro{
		ID:             "test-1",
		Nome:           "Test Barber",
		Telefone:       "(11) 98765-4321",
		Email:          "test@test.com",
		Especialidades: []string{"Corte"},
	}

	err := s.CreateBarbeiro(barbeiro)
	if err != nil {
		t.Fatalf("CreateBarbeiro() error = %v", err)
	}

	retrieved := s.GetBarbeiro("test-1")
	if retrieved == nil || retrieved.Nome != "Test Barber" {
		t.Errorf("GetBarbeiro() = %v, want Test Barber", retrieved)
	}
}

func TestStorageCreateCliente(t *testing.T) {
	s := storage.NewStorage(":memory:")

	cliente := &models.Cliente{
		ID:       "test-1",
		Nome:     "Test Client",
		Telefone: "(11) 99876-5432",
		Email:    "client@test.com",
	}

	err := s.CreateCliente(cliente)
	if err != nil {
		t.Fatalf("CreateCliente() error = %v", err)
	}

	retrieved := s.GetCliente("test-1")
	if retrieved == nil || retrieved.Nome != "Test Client" {
		t.Errorf("GetCliente() = %v, want Test Client", retrieved)
	}
}
