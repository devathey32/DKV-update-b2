import React, { useState, useMemo } from 'react';
import { teacherData } from '../data';
import { MessageCircle, BookOpen, Star, Users, Search } from 'lucide-react';

export const TeacherTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeachers = useMemo(() => {
    let filtered = teacherData;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = teacherData.filter((teacher) => {
        const nameMatch = teacher.name.toLowerCase().includes(query);
        const subjectMatch = teacher.subject.toLowerCase().includes(query);
        return nameMatch || subjectMatch;
      });
    }

    const withPhone = filtered.filter(t => t.phone).sort((a, b) => a.code.localeCompare(b.code));
    const withoutPhone = filtered.filter(t => !t.phone).sort((a, b) => a.code.localeCompare(b.code));

    return [...withPhone, ...withoutPhone];
  }, [searchQuery]);

  return (
    <div className="pb-20 animate-page-enter">
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3">
          <Users className="text-accent" size={28} />
          Daftar Guru Pengajar
        </h2>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Cari guru atau mata pelajaran..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all duration-fast ease-smooth"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTeachers.map((teacher) => (
        <div key={teacher.code} className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-normal ease-smooth hover:-translate-y-1 active:scale-[0.98]">
          {/* Gradient Glow Effect on Hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-normal pointer-events-none" />

          <div className="relative flex justify-between items-start mb-3">
            <span className="font-mono text-xs text-slate-400 bg-white/5 px-2 py-1 rounded border border-white/5 group-hover:border-primary/30 transition-colors duration-fast">
              {teacher.code}
            </span>
            {teacher.phone && (
              <a
                href={`https://wa.me/${teacher.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-all duration-fast ease-smooth p-1 shrink-0 active:scale-95"
              >
                <MessageCircle size={20} />
              </a>
            )}
          </div>

          <div className="relative">
            <h3 className="text-lg font-heading font-bold text-white mb-1 group-hover:text-primary transition-colors duration-fast break-words">
              {teacher.name}
            </h3>
            <div className="flex items-center gap-2 text-slate-400 text-sm mt-2">
              <BookOpen size={14} className="text-secondary" />
              <span>{teacher.subject}</span>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};