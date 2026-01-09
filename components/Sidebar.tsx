import React from 'react';
import { MessageSquare, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-fast"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#0f172a]/95 backdrop-blur-xl border-r border-white/10 shadow-2xl z-50 transition-transform duration-slow ease-smooth ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-heading font-bold text-white">Menu</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white transition-all duration-fast ease-smooth active:scale-95"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="space-y-2">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe-F4rZ0WioIUIOxqBKmPWVZ1GiBbtO_kZz_MKNEnS7IRVNKw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-fast ease-smooth group active:scale-[0.98]"
            >
              <div className="bg-accent/20 p-2 rounded-lg text-accent group-hover:scale-110 transition-transform duration-fast">
                <MessageSquare size={20} />
              </div>
              <span className="font-heading font-semibold text-slate-200 group-hover:text-white transition-colors duration-fast">
                Feedback
              </span>
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};
