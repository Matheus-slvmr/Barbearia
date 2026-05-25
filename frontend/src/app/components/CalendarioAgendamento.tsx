import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { storage } from "../utils/storage";

interface CalendarioAgendamentoProps {
  onSelectDateTime: (data: string, hora: string) => void;
  selectedDate: string;
  selectedTime: string;
}

export function CalendarioAgendamento({ onSelectDateTime, selectedDate, selectedTime }: CalendarioAgendamentoProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [horariosDisponiveis] = useState([
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00"
  ]);

  useEffect(() => {
    setAgendamentos(storage.getAgendamentos());
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const getAgendamentosForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return agendamentos.filter(ag => ag.data === dateStr);
  };

  const getDisponibilidade = (date: Date) => {
    const agendamentosData = getAgendamentosForDate(date);
    const totalHorarios = horariosDisponiveis.length;
    const agendados = agendamentosData.length;

    if (agendados === 0) return 'disponivel';
    if (agendados >= totalHorarios) return 'cheio';
    if (agendados >= totalHorarios * 0.7) return 'pouco';
    return 'medio';
  };

  const getHorariosDisponiveisForDate = (dateStr: string) => {
    const agendamentosData = agendamentos.filter(ag => ag.data === dateStr);
    const horariosOcupados = agendamentosData.map(ag => ag.hora);
    return horariosDisponiveis.filter(h => !horariosOcupados.includes(h));
  };

  const handleDateClick = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return;

    const dateStr = date.toISOString().split('T')[0];
    const horariosLivres = getHorariosDisponiveisForDate(dateStr);

    if (horariosLivres.length > 0) {
      onSelectDateTime(dateStr, selectedTime || horariosLivres[0]);
    }
  };

  const handleTimeClick = (hora: string) => {
    if (selectedDate) {
      onSelectDateTime(selectedDate, hora);
    }
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.toISOString().split('T')[0] === selectedDate;
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            type="button"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <h3 className="text-xl font-bold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>

          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            type="button"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="aspect-square"></div>;
            }

            const disponibilidade = getDisponibilidade(date);
            const past = isPast(date);
            const today = isToday(date);
            const selected = isSelected(date);

            let bgColor = 'bg-gray-800 hover:bg-gray-700';
            let borderColor = 'border-gray-700';
            let indicator = '';

            if (past) {
              bgColor = 'bg-gray-900/50 cursor-not-allowed';
              borderColor = 'border-gray-800';
            } else if (selected) {
              bgColor = 'bg-gradient-to-br from-orange-500 to-red-600';
              borderColor = 'border-orange-500';
            } else if (disponibilidade === 'cheio') {
              bgColor = 'bg-red-900/30 cursor-not-allowed';
              borderColor = 'border-red-800';
              indicator = '🔴';
            } else if (disponibilidade === 'pouco') {
              bgColor = 'bg-yellow-900/30 hover:bg-yellow-800/30';
              borderColor = 'border-yellow-700';
              indicator = '🟡';
            } else if (disponibilidade === 'medio') {
              bgColor = 'bg-blue-900/30 hover:bg-blue-800/30';
              borderColor = 'border-blue-700';
              indicator = '🔵';
            } else {
              bgColor = 'bg-green-900/30 hover:bg-green-800/30';
              borderColor = 'border-green-700';
              indicator = '🟢';
            }

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                disabled={past || disponibilidade === 'cheio'}
                className={`aspect-square p-2 rounded-lg border ${bgColor} ${borderColor} transition-all relative ${today ? 'ring-2 ring-orange-500' : ''}`}
                type="button"
              >
                <div className="text-sm font-semibold">{date.getDate()}</div>
                {!past && indicator && (
                  <div className="absolute bottom-1 right-1 text-xs">{indicator}</div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1">
            <span>🟢</span>
            <span className="text-gray-400">Disponível</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🔵</span>
            <span className="text-gray-400">Médio</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🟡</span>
            <span className="text-gray-400">Pouco</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🔴</span>
            <span className="text-gray-400">Cheio</span>
          </div>
        </div>
      </div>

      {selectedDate && (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-bold">Horários Disponíveis</h3>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {getHorariosDisponiveisForDate(selectedDate).map(hora => (
              <button
                key={hora}
                onClick={() => handleTimeClick(hora)}
                className={`py-2 px-3 rounded-lg border transition-all ${
                  selectedTime === hora
                    ? 'bg-gradient-to-br from-orange-500 to-red-600 border-orange-500'
                    : 'bg-gray-800 border-gray-700 hover:border-orange-500'
                }`}
                type="button"
              >
                {hora}
              </button>
            ))}
          </div>

          {getHorariosDisponiveisForDate(selectedDate).length === 0 && (
            <p className="text-gray-400 text-center py-4">
              Não há horários disponíveis neste dia
            </p>
          )}
        </div>
      )}
    </div>
  );
}
