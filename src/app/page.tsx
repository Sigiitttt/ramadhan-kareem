// app/page.tsx
import Link from 'next/link';
import { Moon, BookOpen, Compass, ArrowRight, Sparkles } from 'lucide-react';

export default function HalamanOnboarding() {
  const fiturUnggulan = [
    { ikon: Moon, judul: 'Habit Tracker', desc: 'Bangun kebiasaan baik harianmu' },
    { ikon: BookOpen, judul: 'Target Quran', desc: 'Pantau khatam 30 Juz dengan mudah' },
    { ikon: Compass, judul: 'Jadwal & Kiblat', desc: 'Pengingat waktu sholat presisi' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-2 relative overflow-hidden">

      {/* Efek Cahaya Latar (Glow/Aura) */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-emerald-400/20 dark:bg-emerald-600/20 rounded-full blur-[50px] pointer-events-none"></div>
      <div className="absolute bottom-40 right-10 w-40 h-40 bg-yellow-400/10 dark:bg-yellow-600/10 rounded-full blur-[50px] pointer-events-none"></div>

      {/* Ikon / Logo Utama yang Estetik */}
      <div className="relative mb-8 mt-10">
        <div className="w-28 h-28 bg-gradient-to-br from-emerald-400 to-emerald-700 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-500/30 transform rotate-12 transition-transform hover:rotate-0 duration-500">
          <Moon size={56} className="text-white transform -rotate-12" strokeWidth={1.5} />
        </div>
        <Sparkles className="absolute -top-4 -right-4 text-yellow-400 animate-pulse" size={32} />
      </div>

      {/* Teks Sambutan */}
      <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
        Ahlan wa Sahlan
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-[280px] text-sm">
        Tingkatkan kualitas ibadah dan pantau progress Ramadhan-mu dalam satu genggaman.
      </p>

      {/* Daftar Kartu Fitur (Glassmorphism) */}
      <div className="flex flex-col gap-3 w-full max-w-sm mb-12 relative z-10">
        {fiturUnggulan.map((fitur, idx) => {
          const Ikon = fitur.ikon;
          return (
            <div
              key={idx}
              className="flex items-center gap-4 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md p-4 rounded-2xl border border-white/40 dark:border-zinc-800/50 shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Ikon size={22} strokeWidth={2} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm mb-0.5">{fitur.judul}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{fitur.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tombol Call to Action (CTA) Raksasa */}
      <Link
        href="/dashboard"
        className="group relative w-full max-w-sm flex items-center justify-center gap-3 bg-gray-900 dark:bg-emerald-600 text-white font-bold text-lg py-4 rounded-full overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 z-20"
      >
        Mulai Perjalanan
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </Link>

    </div>
  );
}