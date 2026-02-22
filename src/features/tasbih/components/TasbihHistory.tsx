// features/tasbih/components/TasbihHistory.tsx
'use client';

import { Activity } from 'lucide-react';
import { PropsTasbihHistory } from '../types';

export default function TasbihHistory({ totalHariIni }: PropsTasbihHistory) {
    return (
        // mb-28 (sekitar 112px) memastikan kapsul ini mengambang aman di atas Navbar
        <div className="w-full mt-auto mb-28 px-4 flex justify-center relative z-20">
            
            {/* Kapsul Melayang (Floating Pill) */}
            <div className="w-full max-w-[320px] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-full p-2 pl-3 flex items-center justify-between border border-gray-200/60 dark:border-zinc-800/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                
                <div className="flex items-center gap-3">
                    {/* Ikon Bulat */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-100 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
                        <Activity size={16} strokeWidth={2.5} />
                    </div>
                    
                    {/* Teks */}
                    <div className="flex flex-col justify-center">
                        <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none mb-1">
                            Catatan Dzikir
                        </span>
                        <span className="text-[13px] font-bold text-gray-800 dark:text-gray-200 leading-none">
                            Total Hari Ini
                        </span>
                    </div>
                </div>

                {/* Badge Angka */}
                <div className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-md border border-emerald-400/20">
                    <span className="text-[15px] font-black text-white drop-shadow-sm">
                        {totalHariIni.toLocaleString('id-ID')}
                    </span>
                </div>

            </div>
            
        </div>
    );
}