// app/tasbih/page.tsx
'use client';

import Link from 'next/link';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import { useTasbih } from '@/features/tasbih/hooks/useTasbih';
import TasbihCounter from '@/features/tasbih/components/TasbihCounter';
import TasbihHistory from '@/features/tasbih/components/TasbihHistory';

export default function HalamanTasbih() {
    const { hitungan, target, totalHariIni, tekanTasbih, resetTasbih, ubahTarget } = useTasbih();

    return (
        <div className="fixed inset-0 flex flex-col bg-gray-50 dark:bg-[#09090b] font-sans overflow-hidden overscroll-none touch-none">
            
            {/* Ambient Background Mewah */}
            <div className="absolute top-0 inset-x-0 h-[40vh] bg-gradient-to-b from-emerald-400/15 to-transparent pointer-events-none -z-10"></div>
            <div className="absolute top-10 left-10 w-48 h-48 bg-teal-300/10 blur-[60px] rounded-full pointer-events-none -z-10"></div>

            {/* HEADER */}
            <div className="px-5 pt-7 pb-4 flex items-center justify-between relative z-10 shrink-0">
                <Link href="/dashboard" className="p-2.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200/50 dark:border-zinc-800/50 rounded-full text-gray-700 dark:text-gray-300 active:scale-90 transition-transform shadow-sm">
                    <ChevronLeft size={20} />
                </Link>
                <h1 className="text-[18px] font-black tracking-wide text-gray-900 dark:text-white">
                    Tasbih Digital
                </h1>
                <button onClick={resetTasbih} className="p-2.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200/50 dark:border-zinc-800/50 rounded-full text-red-500 hover:text-white hover:bg-red-500 active:scale-90 transition-all shadow-sm">
                    <RotateCcw size={18} strokeWidth={2.5} />
                </button>
            </div>

            {/* KONTEN UTAMA */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full px-4">
                
                {/* Opsi Target (Pill Switcher) */}
                <div className="flex bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white/50 dark:border-zinc-800/50 mb-4 shrink-0">
                    {[33, 99, 0].map((nilai) => (
                        <button
                            key={nilai}
                            onClick={() => ubahTarget(nilai)}
                            className={`px-6 py-2.5 rounded-full text-[13px] font-black tracking-wide transition-all duration-300 ${
                                target === nilai 
                                ? 'bg-emerald-500 text-white shadow-md scale-100' 
                                : 'text-gray-500 dark:text-gray-400 hover:bg-emerald-50 dark:hover:bg-zinc-800 scale-95 hover:scale-100'
                            }`}
                        >
                            {nilai === 0 ? '∞ Bebas' : nilai}
                        </button>
                    ))}
                </div>

                {/* Komponen Penghitung Utama */}
                <TasbihCounter 
                    hitungan={hitungan} 
                    target={target} 
                    onTekan={tekanTasbih} 
                />

            </div>
            
            {/* Widget Riwayat (Lempar prop totalHariIni) */}
            <TasbihHistory totalHariIni={totalHariIni} />

        </div>
    );
}