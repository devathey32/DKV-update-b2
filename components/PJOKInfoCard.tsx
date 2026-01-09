import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

export const PJOKInfoCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-4 bottom-32 md:bottom-20 z-40 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full p-2 transition-all duration-fast ease-smooth active:scale-95"
          title="Informasi PJOK"
        >
          <Info size={20} className="text-accent" />
        </button>
      )}

      {isOpen && (
        <div className="fixed right-4 bottom-32 md:bottom-20 z-40 w-72 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl animate-modal-enter">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <div className="bg-accent/20 p-1.5 rounded-lg">
                <Info size={16} className="text-accent" />
              </div>
              <h3 className="font-heading font-bold text-white text-sm">PJOK</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white transition-all duration-fast ease-smooth active:scale-95"
            >
              <X size={14} />
            </button>
          </div>

          <p className="text-xs text-slate-300 mb-2 leading-relaxed">
            Jadwal PJOK / Olahraga dilaksanakan setiap hari Selasa jam 15.00 WITA (Jam 3 Sore) di Lapangan Renon, depan Kantor Gubernur.
          </p>

          <p className="text-[10px] text-slate-500 italic">
            *Ini adalah jadwal mingguan (kecuali ada arahan khusus dari pembina)
          </p>
        </div>
      )}
    </>
  );
};
