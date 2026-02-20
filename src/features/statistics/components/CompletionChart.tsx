// features/statistics/components/CompletionChart.tsx
'use client';

import { useMemo, useEffect, useRef } from 'react';
import { Activity, TrendingUp, CalendarDays } from 'lucide-react';
import { DataHabit } from '@/features/habits/types';

interface PropsGrafik {
    daftarHabit: DataHabit[];
}

export default function GrafikPenyelesaian({ daftarHabit }: PropsGrafik) {
    const scrollRef = useRef<HTMLDivElement>(null);

    // LOGIKA CERDAS: Mencari data sejak AWAL MULA sampai HARI INI
    const dataGrafik = useMemo(() => {
        if (!daftarHabit || daftarHabit.length === 0) return [];

        // 1. Cari tanggal paling "Purbakala" (paling awal) dari seluruh riwayat
        let waktuAwal = new Date().getTime();
        let adaRiwayat = false;

        daftarHabit.forEach(habit => {
            habit.riwayatSelesai.forEach(tglStr => {
                const w = new Date(tglStr).getTime();
                if (!isNaN(w)) {
                    if (!adaRiwayat || w < waktuAwal) {
                        waktuAwal = w;
                        adaRiwayat = true;
                    }
                }
            });
        });

        if (!adaRiwayat) return []; // Belum ada data sama sekali

        // 2. Buat array timeline dari HARI PERTAMA sampai HARI INI
        const timeline = [];
        const tglMulai = new Date(waktuAwal);
        tglMulai.setHours(0, 0, 0, 0);

        const tglAkhir = new Date();
        tglAkhir.setHours(0, 0, 0, 0);

        const totalTarget = daftarHabit.length;
        let tglBerjalan = new Date(tglMulai);

        while (tglBerjalan <= tglAkhir) {
            let totalSelesai = 0;

            // Cocokkan hari, bulan, dan tahun (Aman dari bentrok format string)
            daftarHabit.forEach(habit => {
                const selesaiHariIni = habit.riwayatSelesai.some(tglStr => {
                    const d = new Date(tglStr);
                    return !isNaN(d.getTime()) &&
                        d.getDate() === tglBerjalan.getDate() &&
                        d.getMonth() === tglBerjalan.getMonth() &&
                        d.getFullYear() === tglBerjalan.getFullYear();
                });
                if (selesaiHariIni) totalSelesai++;
            });

            const persentase = totalTarget > 0 ? Math.round((totalSelesai / totalTarget) * 100) : 0;
            const labelPendek = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' }).format(tglBerjalan);

            timeline.push({
                tanggal: new Date(tglBerjalan),
                label: labelPendek,
                selesai: totalSelesai,
                total: totalTarget,
                persentase
            });

            tglBerjalan.setDate(tglBerjalan.getDate() + 1);
        }

        return timeline;
    }, [daftarHabit]);

    // Auto-scroll ke paling kanan (hari terbaru) saat komponen di-load
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, [dataGrafik]);

    // Tampilan jika belum ada satupun habit yang diselesaikan
    if (dataGrafik.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm text-center">
                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-full flex items-center justify-center mb-3">
                    <Activity size={28} />
                </div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100">Belum Ada Riwayat</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-[200px]">Mulai selesaikan habit pertamamu untuk melihat grafik perjalanan!</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out fill-mode-both">
            {/* Header Widget */}
            <div className="flex justify-between items-end px-1">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-5 bg-gradient-to-b from-blue-400 to-indigo-600 rounded-full"></div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg tracking-tight">Perjalananmu</h3>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-gray-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md">
                    <CalendarDays size={12} /> Sejak Awal
                </div>
            </div>

            {/* Kartu Grafik Interaktif */}
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-5 shadow-sm border border-gray-100 dark:border-zinc-800 relative overflow-hidden">

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl">
                        <TrendingUp size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-100">Tingkat Penyelesaian</span>
                        <span className="text-xs text-gray-500">Persentase harian dari target</span>
                    </div>
                </div>

                {/* Area Grafik yang bisa di-scroll ke samping */}
                <div
                    ref={scrollRef}
                    className="flex items-end gap-3 md:gap-4 overflow-x-auto pb-4 pt-10 px-1 hide-scrollbar scroll-smooth"
                >
                    {dataGrafik.map((data, index) => {
                        // Logika Warna: Kalau 100% jadi hijau emas, kalau tidak jadi biru/indigo
                        const isSempurna = data.persentase === 100;
                        const warnaBar = isSempurna
                            ? 'bg-gradient-to-t from-emerald-500 to-teal-400 dark:from-emerald-600 dark:to-teal-500'
                            : 'bg-gradient-to-t from-blue-500 to-indigo-400 dark:from-blue-600 dark:to-indigo-500';

                        return (
                            <div key={index} className="flex flex-col items-center gap-3 shrink-0 group">

                                {/* Bar Grafik dengan tinggi dinamis */}
                                <div className="relative w-10 md:w-12 h-32 md:h-40 bg-gray-100 dark:bg-zinc-800 rounded-2xl overflow-hidden flex items-end">

                                    {/* Tooltip Hover (Muncul di atas bar saat disorot) */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-bold py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                        {data.selesai}/{data.total} Selesai
                                    </div>

                                    <div
                                        className={`w-full rounded-2xl transition-all duration-1000 ease-out relative group-hover:brightness-110 ${warnaBar}`}
                                        style={{ height: `${Math.max(data.persentase, 8)}%` }} // Minimal 8% agar bar sedikit terlihat meski 0
                                    >
                                        {/* Teks persentase di dalam bar */}
                                        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-black text-white/90">
                                            {data.persentase > 15 ? `${data.persentase}%` : ''}
                                        </span>
                                    </div>
                                </div>

                                {/* Label Tanggal di bawah */}
                                <span className={`text-[10px] whitespace-nowrap transition-colors ${index === dataGrafik.length - 1 ? 'font-black text-blue-600 dark:text-blue-400' : 'font-medium text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200'}`}>
                                    {index === dataGrafik.length - 1 ? 'Hari Ini' : data.label}
                                </span>
                            </div>
                        );
                    })}
                </div>

            </div>

            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}