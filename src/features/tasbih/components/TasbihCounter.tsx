// features/tasbih/components/TasbihCounter.tsx
'use client';

import { Fingerprint } from 'lucide-react';
import { PropsTasbihCounter } from '../types';
import { hitungPersentaseProgress } from '../utils/tasbihLogic';

export default function TasbihCounter({ hitungan, target, onTekan }: PropsTasbihCounter) {
    const persentase = hitungPersentaseProgress(hitungan, target);
    const radius = 135; // Lingkaran diperbesar sedikit
    const keliling = 2 * Math.PI * radius;
    const offset = keliling - (persentase / 100) * keliling;

    const sudahSelesai = target > 0 && hitungan === target;

    return (
        <div className="relative flex flex-col items-center justify-center w-full my-8">
            
            {/* WADAH LINGKARAN & TOMBOL */}
            <div className="relative flex items-center justify-center">
                
                {/* Lingkaran Progress (SVG) */}
                <svg className="absolute w-[320px] h-[320px] transform -rotate-90 pointer-events-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
                    {/* Track Dasar */}
                    <circle 
                        cx="160" cy="160" r={radius} 
                        strokeWidth="12" 
                        className="stroke-gray-200/60 dark:stroke-zinc-800" 
                        fill="transparent" 
                    />
                    {/* Garis Isi (Progress) */}
                    {target > 0 && (
                        <circle 
                            cx="160" cy="160" r={radius} 
                            strokeWidth="12" 
                            className={`transition-all duration-500 ease-out ${sudahSelesai ? 'stroke-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]' : 'stroke-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]'}`}
                            fill="transparent" 
                            strokeDasharray={keliling}
                            strokeDashoffset={offset}
                            strokeLinecap="round" 
                        />
                    )}
                </svg>

                {/* Tombol Tap Raksasa (Dengan efek Glowing) */}
                <button 
                    onClick={onTekan}
                    className={`relative w-[230px] h-[230px] rounded-full flex flex-col items-center justify-center transition-all duration-200 active:scale-[0.96] border-[6px] border-white dark:border-zinc-950 overflow-hidden ${
                        sudahSelesai 
                        ? 'bg-gradient-to-br from-amber-400 to-amber-500 shadow-[0_15px_50px_rgba(251,191,36,0.4)]' 
                        : 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 shadow-[0_15px_50px_rgba(16,185,129,0.3)]'
                    }`}
                >
                    {/* Efek kilauan kaca di dalam tombol */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none"></div>

                    <Fingerprint size={46} className={`mb-2 transition-all duration-300 ${sudahSelesai ? 'text-amber-100/50' : 'text-emerald-100/50'}`} />
                    
                    <span className="text-7xl font-black text-white tracking-tighter drop-shadow-md leading-none z-10">
                        {hitungan}
                    </span>
                    
                    {target > 0 && (
                        <span className="text-[13px] font-bold text-white/80 mt-1 uppercase tracking-widest z-10">
                            dari {target}
                        </span>
                    )}
                </button>
            </div>

            {/* Pesan Motivasi (Menggunakan space statis agar UI tidak loncat) */}
            <div className="h-12 mt-10 flex items-center justify-center">
                <div className={`transition-all duration-500 ${sudahSelesai ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}>
                    <p className="text-[14px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 px-6 py-2.5 rounded-full border border-amber-200 dark:border-amber-700/50 shadow-sm flex items-center gap-2">
                        ✨ Alhamdulillah, Selesai! ✨
                    </p>
                </div>
            </div>
        </div>
    );
}