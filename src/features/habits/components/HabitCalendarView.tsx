// features/habits/components/HabitCalendarView.tsx
// features/habits/components/HabitCalendarView.tsx
'use client';

import { CalendarDays, Info } from 'lucide-react';
import { DataHabit } from '../types';

interface PropsCalendar {
    daftarHabit: DataHabit[];
}

export default function TampilanKalenderHabit({ daftarHabit }: PropsCalendar) {
    // Setup Waktu (Bulan Saat Ini)
    const hariIni = new Date();
    const tahun = hariIni.getFullYear();
    const bulan = hariIni.getMonth();
    const tanggalHariIni = hariIni.getDate();

    // Hitung jumlah hari dalam bulan ini dan posisi hari pertama (0 = Minggu, 1 = Senin)
    const jumlahHari = new Date(tahun, bulan + 1, 0).getDate();
    const hariPertama = new Date(tahun, bulan, 1).getDay();

    const totalHabit = daftarHabit.length;
    const namaBulan = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(hariIni);
    const labelHari = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

    // Fungsi penentu warna (Heatmap Logic)
    const evaluasiHari = (tanggal: number) => {
        // Format ke YYYY-MM-DD dengan aman untuk zona waktu lokal
        const tglString = `${tahun}-${String(bulan + 1).padStart(2, '0')}-${String(tanggal).padStart(2, '0')}`;

        if (totalHabit === 0) return { warna: 'bg-gray-50 dark:bg-zinc-800/50 text-gray-400', status: 'kosong' };

        let habitSelesai = 0;
        daftarHabit.forEach(habit => {
            if (habit.riwayatSelesai.includes(tglString)) habitSelesai++;
        });

        if (habitSelesai === 0) return { warna: 'bg-gray-100 dark:bg-zinc-800 text-gray-400', status: 'nol' };

        const persentase = (habitSelesai / totalHabit) * 100;

        if (persentase === 100) return { warna: 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)] font-bold', status: 'penuh' };
        if (persentase >= 50) return { warna: 'bg-emerald-400 dark:bg-emerald-600/80 text-white font-medium', status: 'sebagian-besar' };
        return { warna: 'bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300', status: 'sebagian-kecil' };
    };

    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 shadow-sm mt-2 mb-6">

            {/* Header Kalender */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <CalendarDays size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-100">Kalender Konsistensi</h3>
                        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">{namaBulan}</p>
                    </div>
                </div>
            </div>

            {/* Grid Kalender */}
            <div className="flex flex-col gap-2">
                {/* Nama Hari (Min - Sab) */}
                <div className="grid grid-cols-7 gap-1 mb-1">
                    {labelHari.map(hari => (
                        <div key={hari} className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            {hari}
                        </div>
                    ))}
                </div>

                {/* Kotak-kotak Tanggal */}
                <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                    {/* Offset hari kosong di awal bulan */}
                    {Array.from({ length: hariPertama }).map((_, i) => (
                        <div key={`kosong-${i}`} className="aspect-square rounded-xl bg-transparent"></div>
                    ))}

                    {/* Render Tanggal 1 sampai akhir bulan */}
                    {Array.from({ length: jumlahHari }).map((_, i) => {
                        const tanggal = i + 1;
                        const isHariIni = tanggal === tanggalHariIni;
                        const { warna } = evaluasiHari(tanggal);

                        return (
                            <div
                                key={tanggal}
                                className={`relative aspect-square rounded-xl flex items-center justify-center text-xs transition-all duration-300 hover:scale-110 cursor-default ${warna} ${isHariIni && warna.includes('bg-gray-100') ? 'ring-2 ring-emerald-400 ring-offset-2 dark:ring-offset-zinc-900' : ''
                                    }`}
                                title={`Tanggal ${tanggal} ${namaBulan}`}
                            >
                                {tanggal}
                                {/* Titik indikator kecil untuk hari ini */}
                                {isHariIni && (
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Legend / Keterangan Warna */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-md bg-gray-100 dark:bg-zinc-800"></div>
                    <span className="text-[10px] text-gray-500 font-medium">Kosong</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-md bg-emerald-200 dark:bg-emerald-900/60"></div>
                    <span className="text-[10px] text-gray-500 font-medium">Sedikit</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-md bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
                    <span className="text-[10px] text-gray-500 font-medium">Tuntas!</span>
                </div>
            </div>

        </div>
    );
}