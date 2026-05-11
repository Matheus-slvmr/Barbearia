package utils

import (
	"regexp"
	"time"
)

// IsValidDate valida o formato de data (YYYY-MM-DD)
func IsValidDate(dateStr string) bool {
	_, err := time.Parse("2006-01-02", dateStr)
	return err == nil
}

// IsValidTime valida o formato de hora (HH:MM)
func IsValidTime(timeStr string) bool {
	_, err := time.Parse("15:04", timeStr)
	return err == nil
}

// FormatarData formata uma data no formato YYYY-MM-DD para formato legível
func FormatarData(dateStr string) string {
	t, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		return dateStr
	}

	months := map[time.Month]string{
		time.January:   "janeiro",
		time.February:  "fevereiro",
		time.March:     "março",
		time.April:     "abril",
		time.May:       "maio",
		time.June:      "junho",
		time.July:      "julho",
		time.August:    "agosto",
		time.September: "setembro",
		time.October:   "outubro",
		time.November:  "novembro",
		time.December:  "dezembro",
	}

	days := map[time.Weekday]string{
		time.Sunday:    "domingo",
		time.Monday:    "segunda",
		time.Tuesday:   "terça",
		time.Wednesday: "quarta",
		time.Thursday:  "quinta",
		time.Friday:    "sexta",
		time.Saturday:  "sábado",
	}

	return days[t.Weekday()] + ", " + t.Format("02") + " de " + months[t.Month()] + " de " + t.Format("2006")
}

// LimparTelefone remove caracteres especiais do telefone
func LimparTelefone(telefone string) string {
	re := regexp.MustCompile("[^0-9]")
	return re.ReplaceAllString(telefone, "")
}
