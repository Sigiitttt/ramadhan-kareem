// app/page.tsx
import Link from 'next/link';
import { Moon, BookOpen, Compass, ArrowRight, Sparkles, Star } from 'lucide-react';

export default function HalamanOnboarding() {
  const fiturUnggulan = [
    { ikon: Moon, judul: 'Habit Tracker', desc: 'Bangun kebiasaan baik harianmu' },
    { ikon: BookOpen, judul: 'Target Quran', desc: 'Pantau khatam 30 Juz dengan mudah' },
    { ikon: Compass, judul: 'Jadwal & Kiblat', desc: 'Pengingat sholat & arah presisi' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 relative overflow-hidden bg-gray-50 dark:bg-zinc-950">

      {/* 1. Background Grid Pattern (Tampilan Modern) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* 2. Abstract Blurred Blobs di Latar */}
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-emerald-400/20 dark:bg-emerald-600/10 rounded-full blur-[60px] pointer-events-none"></div>
      <div className="absolute bottom-10 -right-10 w-64 h-64 bg-teal-400/20 dark:bg-teal-600/10 rounded-full blur-[60px] pointer-events-none"></div>

      {/* Bintang Kecil Animasi */}
      <Star className="absolute top-32 right-12 text-yellow-400/60 animate-pulse" size={16} />
      <Star className="absolute top-60 left-10 text-emerald-400/40 animate-pulse delay-700" size={12} />

      {/* 3. Logo Utama dengan Animasi Floating */}
      <div className="relative mb-8 mt-10 animate-[bounce_4s_ease-in-out_infinite]">
        <div className="relative z-10 w-32 h-32 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-emerald-500/40 transform rotate-12 hover:rotate-0 transition-transform duration-700">
          <Moon size={64} className="text-white transform -rotate-12" strokeWidth={1.5} />
        </div>
        <Sparkles className="absolute -top-4 -right-4 text-yellow-400 animate-pulse" size={36} />
        {/* Shadow di bawah logo */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-4 bg-emerald-900/20 dark:bg-black/40 blur-md rounded-full"></div>
      </div>

      {/* 4. Teks Sambutan (Gradient Text) */}
      <h1 className="text-4xl font-black mb-3 tracking-tight bg-gradient-to-r from-emerald-600 to-teal-400 dark:from-emerald-400 dark:to-teal-200 bg-clip-text text-transparent relative z-10">
        Ahlan wa Sahlan
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-12 max-w-[280px] text-sm relative z-10">
        Tingkatkan kualitas ibadah dan pantau progress Ramadhan-mu dalam satu genggaman.
      </p>

      {/* 5. Daftar Kartu Fitur dengan "Shape Abu-abu" di Dalamnya */}
      <div className="flex flex-col gap-4 w-full max-w-sm mb-14 relative z-10">
        {fiturUnggulan.map((fitur, idx) => {
          const Ikon = fitur.ikon;
          return (
            <div
              key={idx}
              className="group relative overflow-hidden flex items-center gap-4 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl p-4 rounded-3xl border border-white/60 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-1 hover:shadow-emerald-500/10"
            >
              {/* DECORATIVE SHAPE: Bentuk abu-abu di pojok kanan kartu */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-800/50 rounded-full opacity-60 group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>

              {/* Konten Kartu */}
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-900/10 border border-emerald-100 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Ikon size={24} strokeWidth={2} />
              </div>
              <div className="relative z-10 text-left">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 text-base mb-0.5 tracking-tight">{fitur.judul}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{fitur.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 6. Tombol CTA Glowing */}
      <div className="w-full max-w-sm relative z-20 pb-10">
        <Link
          href="/dashboard"
          className="group relative w-full flex items-center justify-center gap-3 bg-gray-900 dark:bg-emerald-500 text-white font-bold text-lg py-4.5 rounded-full overflow-hidden shadow-[0_10px_40px_rgba(16,185,129,0.3)] hover:shadow-[0_10px_40px_rgba(16,185,129,0.5)] hover:-translate-y-1 transition-all active:scale-95"
        >
          {/* Efek kilauan cahaya (Shine sweep) menyapu tombol */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></div>

          <span className="relative z-10">Mulai Perjalanan</span>
          <ArrowRight size={22} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}