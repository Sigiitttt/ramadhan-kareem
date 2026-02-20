// features/habits/components/HabitCalendarView.tsx
'use client';

import { CalendarDays, Flame, Trophy } from 'lucide-react';
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

    // Fungsi penentu warna & data (Heatmap Logic)
    const evaluasiHari = (tanggal: number) => {
        const tglString = `${tahun}-${String(bulan + 1).padStart(2, '0')}-${String(tanggal).padStart(2, '0')}`;

        if (totalHabit === 0) return { warna: 'bg-gray-50 dark:bg-zinc-800/50 text-gray-400', status: 'kosong', selesai: 0 };

        let habitSelesai = 0;
        daftarHabit.forEach(habit => {
            if (habit.riwayatSelesai.includes(tglString)) habitSelesai++;
        });

        if (habitSelesai === 0) return { warna: 'bg-gray-100 dark:bg-zinc-800/80 text-gray-400', status: 'nol', selesai: 0 };

        const persentase = (habitSelesai / totalHabit) * 100;

        if (persentase === 100) return { warna: 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] font-bold scale-105 z-10', status: 'penuh', selesai: habitSelesai };
        if (persentase >= 50) return { warna: 'bg-emerald-400 dark:bg-emerald-500/80 text-white font-medium', status: 'sebagian-besar', selesai: habitSelesai };
        return { warna: 'bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300', status: 'sebagian-kecil', selesai: habitSelesai };
    };

    // Pre-kalkulasi statistik bulan ini
    let totalHariAktif = 0;
    let totalHariSempurna = 0;

    if (totalHabit > 0) {
        for (let i = 1; i <= jumlahHari; i++) {
            const info = evaluasiHari(i);
            if (info.selesai > 0) totalHariAktif++;
            if (info.status === 'penuh') totalHariSempurna++;
        }
    }

    return (
        <div className="relative overflow-hidden bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm mt-4 mb-8 group transition-shadow hover:shadow-md duration-500">

            {/* Dekorasi Latar Belakang */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-400/5 dark:bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-emerald-400/10 transition-colors duration-700"></div>

            {/* HEADER KALENDER & QUICK STATS */}
            <div className="flex flex-col gap-5 mb-7 relative z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/40 dark:to-emerald-800/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
                            <CalendarDays size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">Riwayat Bulanan</h3>
                            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">{namaBulan}</p>
                        </div>
                    </div>
                </div>

                {/* Kotak Quick Stats (Hari Aktif & Tuntas) */}
                {totalHabit > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-2xl p-3 flex items-center gap-3 border border-gray-100 dark:border-zinc-800">
                            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-500 rounded-xl">
                                <Flame size={18} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-black text-gray-800 dark:text-gray-100 leading-tight">{totalHariAktif} <span className="text-xs font-medium text-gray-500">Hari</span></span>
                                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Aktif Ibadah</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-2xl p-3 flex items-center gap-3 border border-gray-100 dark:border-zinc-800">
                            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-xl">
                                <Trophy size={18} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-black text-gray-800 dark:text-gray-100 leading-tight">{totalHariSempurna} <span className="text-xs font-medium text-gray-500">Hari</span></span>
                                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Tuntas 100%</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* GRID KALENDER HEATMAP */}
            <div className="flex flex-col gap-2 relative z-10">

                {/* Label Nama Hari (Min - Sab) */}
                <div className="grid grid-cols-7 gap-1.5 mb-2">
                    {labelHari.map((hari, idx) => (
                        <div key={hari} className={`text-center text-[10px] font-black uppercase tracking-wider ${idx === 0 || idx === 6 ? 'text-gray-400 dark:text-gray-600' : 'text-gray-500 dark:text-gray-400'}`}>
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

                    {/* Render Tanggal 1 sampai akhir bulan dengan animasi bergelombang */}
                    {Array.from({ length: jumlahHari }).map((_, i) => {
                        const tanggal = i + 1;
                        const isHariIni = tanggal === tanggalHariIni;
                        const { warna, status, selesai } = evaluasiHari(tanggal);

                        // Kalkulasi delay gelombang berdasarkan baris dan kolom
                        const baris = Math.floor((i + hariPertama) / 7);
                        const kolom = (i + hariPertama) % 7;
                        const delayStyle = { animationDelay: `${(baris * 40) + (kolom * 30)}ms` };

                        return (
                            <div
                                key={tanggal}
                                className={`group/day relative aspect-square rounded-[0.8rem] flex items-center justify-center text-xs transition-all duration-300 hover:scale-125 hover:z-20 cursor-default animate-in zoom-in fade-in fill-mode-both ${warna} ${isHariIni && status === 'nol' ? 'ring-2 ring-emerald-400 ring-offset-2 dark:ring-offset-zinc-900 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : ''
                                    }`}
                                style={delayStyle}
                                title={`Tanggal ${tanggal} ${namaBulan}: ${totalHabit === 0 ? 'Belum ada habit' : `${selesai}/${totalHabit} selesai`}`}
                            >
                                {tanggal}

                                {/* Indikator Titik Hari Ini */}
                                {isHariIni && (
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping absolute opacity-75"></div>
                                        <div className="w-1 h-1 bg-white rounded-full relative z-10"></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* LEGEND / KETERANGAN WARNA */}
            {totalHabit > 0 && (
                <div className="flex items-center justify-center gap-4 mt-8 pt-5 border-t border-gray-100 dark:border-zinc-800/80 relative z-10">
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800/50 px-3 py-1.5 rounded-full border border-gray-100 dark:border-zinc-700/50">
                        <div className="w-3.5 h-3.5 rounded-md bg-gray-100 dark:bg-zinc-800"></div>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Kosong</span>
                    </div>

                    <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/10 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-800/30">
                        <div className="w-3.5 h-3.5 rounded-md bg-emerald-200 dark:bg-emerald-800/60"></div>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-wider">Sedikit</span>
                    </div>

                    <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.1)] border border-emerald-200 dark:border-emerald-700/50">
                        <div className="w-3.5 h-3.5 rounded-md bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"></div>
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-black uppercase tracking-wider">Tuntas!</span>
                    </div>
                </div>
            )}

        </div>
    );
}