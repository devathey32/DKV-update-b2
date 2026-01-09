import React, { useState } from 'react';
import { scheduleData } from '../data';
import { Clock, User, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { getIndonesianDay } from '../utils/timeUtils';

interface ScheduleTabProps {
  onNavigateToTeacher?: () => void;
}

export const ScheduleTab: React.FC<ScheduleTabProps> = () => {
  const days = Object.keys(scheduleData);
  const currentDay = getIndonesianDay();
  const [openDay, setOpenDay] = useState<string>(currentDay);

  const toggleDay = (day: string) => {
    setOpenDay(openDay === day ? '' : day);
  };

  return (
    <div className="pb-20 animate-page-enter">
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3">
          <Calendar className="text-accent" size={28} />
          Jadwal Mingguan
        </h2>
      </div>

      <div className="space-y-3">
        {days.map((day) => {
        const rows = scheduleData[day];
        const isToday = currentDay === day;
        const isOpen = openDay === day;

        return (
          <div key={day} className={`relative rounded-3xl overflow-hidden ${isToday ? 'bg-white/10 border-2 border-amber-400/60 shadow-[0_0_30px_rgba(251,191,36,0.25)]' : 'bg-white/5 border border-white/5'}`}>

            {/* Header - Clickable */}
            <button
              onClick={() => toggleDay(day)}
              className={`w-full px-6 py-4 flex items-center justify-between ${isToday ? 'bg-gradient-to-r from-amber-500/20 to-transparent' : 'bg-white/5'} hover:bg-white/10 transition-colors duration-fast ease-smooth`}
            >
              <div className="flex items-center gap-3">
                <Calendar size={18} className={isToday ? 'text-amber-400' : 'text-slate-500'} />
                <h3 className={`font-heading font-bold text-xl tracking-wide ${isToday ? 'text-amber-300' : 'text-slate-400'}`}>
                  {day}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                {isToday && (
                  <span className="px-3 py-1 rounded-full bg-amber-500/30 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                    Hari Ini
                  </span>
                )}
                {isOpen ? (
                  <ChevronUp size={20} className={isToday ? 'text-amber-400' : 'text-slate-500'} />
                ) : (
                  <ChevronDown size={20} className={isToday ? 'text-amber-400' : 'text-slate-500'} />
                )}
              </div>
            </button>

            {/* List View - Collapsible */}
            {isOpen && (
              <div className="divide-y divide-white/5 transition-all duration-normal ease-smooth">
                {rows.map((row, idx) => {
                  const isBreak = row.subject === 'ISTIRAHAT';
                  if (isBreak) {
                    return (
                      <div key={idx} className="bg-black/20 py-3 flex items-center justify-center gap-2">
                        <div className="h-px w-8 bg-slate-700"></div>
                        <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">Istirahat</span>
                        <div className="h-px w-8 bg-slate-700"></div>
                      </div>
                    );
                  }

                  // Calculate lesson number (1-8, skipping breaks)
                  const lessonNumber = rows.slice(0, idx).filter(r => r.subject !== 'ISTIRAHAT').length + 1;

                  return (
                    <div key={idx} className="p-4 hover:bg-white/10 transition-all duration-fast ease-smooth flex gap-4 group active:scale-[0.99]">
                      <div className="flex flex-col items-center pt-1 min-w-[4rem]">
                        <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded-full border border-accent/20">
                          {lessonNumber}
                        </span>
                        <div className="h-full w-px bg-white/5 my-2 group-hover:bg-primary/30 transition-colors duration-fast"></div>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-semibold text-white bg-white/10 px-2 py-0.5 rounded border border-white/20">
                             {row.time}
                          </span>
                        </div>

                        <h4 className="text-lg font-heading font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors duration-fast mb-1">
                          {row.subject}
                        </h4>

                        {row.teacher !== '-' && (
                          <div className="flex items-center gap-2">
                            <User size={14} className="text-slate-400 shrink-0" />
                            <span className="font-medium text-sm text-slate-200 break-words">{row.teacher}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      </div>
    </div>
  );
};