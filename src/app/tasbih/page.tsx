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
        <div className="fixed inset-0 flex flex-col bg-gray-50 dark:bg-[#09090b] font-sans overscroll-none">

            {/* Ambient Background Mewah */}
            <div className="absolute top-0 inset-x-0 h-[40vh] bg-gradient-to-b from-emerald-400/15 to-transparent pointer-events-none -z-10"></div>
            <div className="absolute top-10 left-10 w-48 h-48 bg-teal-300/10 blur-[60px] rounded-full pointer-events-none -z-10"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400/5 blur-[80px] rounded-full pointer-events-none -z-10"></div>

            {/* HEADER */}
            <div className="px-4 pt-6 pb-4 flex items-center justify-between relative z-10 shrink-0">
                <Link href="/dashboard" className="p-2.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200/50 dark:border-zinc-800/50 rounded-full text-gray-700 dark:text-gray-300 active:scale-90 transition-transform shadow-sm">
                    <ChevronLeft size={20} />
                </Link>
                <h1 className="text-[17px] font-black tracking-wide text-gray-900 dark:text-white">
                    Tasbih Digital
                </h1>
                <button onClick={resetTasbih} className="p-2.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200/50 dark:border-zinc-800/50 rounded-full text-red-500 hover:text-white hover:bg-red-500 active:scale-90 transition-all shadow-sm">
                    <RotateCcw size={18} strokeWidth={2.5} />
                </button>
            </div>

            {/* KONTEN UTAMA (Bisa di-scroll) */}
            {/* pt-8 dikurangi jadi pt-6 agar sedikit naik tapi tidak mepet header */}
            <div className="flex-1 flex flex-col items-center pt-4 pb-4 w-full px-4 relative z-10 overflow-y-auto hide-scrollbar">

                {/* 🌟 WRAPPER GLASS CARD 🌟 */}
                <div className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:shadow-none rounded-[3rem] p-6 flex flex-col items-center w-full max-w-sm mx-auto shrink-0">

                    {/* Opsi Target (Pill Switcher) */}
                    {/* mb-8 dipangkas menjadi mb-4 agar lebih rapat ke lingkaran tasbih */}
                    <div className="flex w-full bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md p-1.5 rounded-full shadow-inner border border-white/50 dark:border-zinc-700/50 mb-4 shrink-0">
                        {[33, 99, 0].map((nilai) => (
                            <button
                                key={nilai}
                                onClick={() => ubahTarget(nilai)}
                                className={`flex-1 py-3 rounded-full text-[13px] font-black tracking-wide transition-all duration-300 ${target === nilai
                                        ? 'bg-emerald-500 text-white shadow-md scale-100'
                                        : 'text-gray-500 dark:text-gray-400 hover:bg-emerald-50 dark:hover:bg-zinc-700 scale-95 hover:scale-100'
                                    }`}
                            >
                                {nilai === 0 ? '∞ Bebas' : nilai}
                            </button>
                        ))}
                    </div>

                    {/* Komponen Penghitung Utama */}
                    <div className="flex justify-center w-full pt-12">
                        <TasbihCounter
                            hitungan={hitungan}
                            target={target}
                            onTekan={tekanTasbih}
                        />
                    </div>

                    <div className="w-full max-w-sm mt-[-16px] shrink-0">
                        <TasbihHistory totalHariIni={totalHariIni} />
                    </div>
                </div>


            </div>


        </div>
    );
}