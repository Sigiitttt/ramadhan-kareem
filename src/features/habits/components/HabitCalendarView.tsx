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

    // LOGIKA HEATMAP WARNA (Disesuaikan agar lebih premium)
    const evaluasiHari = (tanggal: number) => {
        const tglString = `${tahun}-${String(bulan + 1).padStart(2, '0')}-${String(tanggal).padStart(2, '0')}`;

        if (totalHabit === 0) return { warna: 'bg-gray-50/80 dark:bg-zinc-800/30 text-gray-400', status: 'kosong', selesai: 0 };

        let habitSelesai = 0;
        daftarHabit.forEach(habit => {
            if (habit.riwayatSelesai.includes(tglString)) habitSelesai++;
        });

        if (habitSelesai === 0) return { warna: 'bg-gray-100/80 dark:bg-zinc-800/50 text-gray-400 dark:text-gray-500', status: 'nol', selesai: 0 };

        const persentase = (habitSelesai / totalHabit) * 100;

        // Skala 1: 100% (Tuntas - Paling Terang, Menyala, & Membesar)
        if (persentase === 100) {
            return { 
                warna: 'bg-emerald-500 dark:bg-emerald-400 text-white dark:text-emerald-950 shadow-[0_4px_12px_rgba(16,185,129,0.4)] font-black scale-[1.05] z-10 ring-2 ring-emerald-200 dark:ring-emerald-700', 
                status: 'penuh', 
                selesai: habitSelesai 
            };
        } 
        // Skala 2: 75% - 99% (Hampir Tuntas - Hijau Pekat)
        else if (persentase >= 75) {
            return { warna: 'bg-emerald-400 dark:bg-emerald-500/90 text-white font-bold shadow-sm', status: 'tinggi', selesai: habitSelesai };
        } 
        // Skala 3: 50% - 74% (Setengah - Hijau Sedang)
        else if (persentase >= 50) {
            return { warna: 'bg-emerald-300 dark:bg-emerald-600/70 text-emerald-900 dark:text-emerald-100 font-semibold', status: 'sedang', selesai: habitSelesai };
        } 
        // Skala 4: 1% - 49% (Baru Mulai - Hijau Pudar/Lembut)
        else {
            return { warna: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 font-medium', status: 'rendah', selesai: habitSelesai };
        }
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
        <div className="relative overflow-hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-gray-100 dark:border-zinc-800 rounded-[2rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] mt-2 mb-8 group transition-all duration-500">

            {/* Dekorasi Ambient Glow di Pojok */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-400/10 dark:bg-emerald-500/15 rounded-full blur-[50px] pointer-events-none group-hover:scale-125 transition-transform duration-1000"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-400/10 dark:bg-teal-500/10 rounded-full blur-[40px] pointer-events-none"></div>

            {/* HEADER KALENDER & QUICK STATS */}
            <div className="flex flex-col gap-6 mb-7 relative z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
                            <CalendarDays size={22} strokeWidth={2} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <h3 className="font-black text-gray-800 dark:text-gray-100 text-[17px] tracking-tight">Riwayat Bulanan</h3>
                            <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">{namaBulan}</p>
                        </div>
                    </div>
                </div>

                {/* Kotak Quick Stats (Hari Aktif & Tuntas) - Desain Kapsul Transparan */}
                {totalHabit > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/10 rounded-2xl p-3.5 flex items-center gap-3 border border-orange-100/50 dark:border-orange-900/30 shadow-sm">
                            <div className="p-2.5 bg-white dark:bg-orange-900/40 text-orange-500 rounded-xl shadow-sm">
                                <Flame size={18} strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-xl font-black text-gray-800 dark:text-gray-100 leading-none mb-1">
                                    {totalHariAktif} <span className="text-[11px] font-bold text-gray-500">Hari</span>
                                </span>
                                <span className="text-[9px] text-orange-600 dark:text-orange-500 uppercase font-black tracking-widest">Aktif Ibadah</span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-amber-50 to-yellow-100/50 dark:from-yellow-950/20 dark:to-yellow-900/10 rounded-2xl p-3.5 flex items-center gap-3 border border-yellow-100/50 dark:border-yellow-900/30 shadow-sm">
                            <div className="p-2.5 bg-white dark:bg-yellow-900/40 text-amber-500 rounded-xl shadow-sm">
                                <Trophy size={18} strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-xl font-black text-gray-800 dark:text-gray-100 leading-none mb-1">
                                    {totalHariSempurna} <span className="text-[11px] font-bold text-gray-500">Hari</span>
                                </span>
                                <span className="text-[9px] text-amber-600 dark:text-amber-500 uppercase font-black tracking-widest">Tuntas 100%</span>
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
                        <div key={hari} className={`text-center text-[10px] font-black uppercase tracking-widest ${idx === 0 || idx === 6 ? 'text-gray-400 dark:text-gray-600' : 'text-gray-500 dark:text-gray-400'}`}>
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

                    {/* Render Tanggal dengan animasi masuk bergelombang */}
                    {Array.from({ length: jumlahHari }).map((_, i) => {
                        const tanggal = i + 1;
                        const isHariIni = tanggal === tanggalHariIni;
                        const { warna, status, selesai } = evaluasiHari(tanggal);

                        // Kalkulasi delay gelombang berdasarkan baris dan kolom agar munculnya cantik
                        const baris = Math.floor((i + hariPertama) / 7);
                        const kolom = (i + hariPertama) % 7;
                        const delayStyle = { animationDelay: `${(baris * 40) + (kolom * 30)}ms` };

                        // Style khusus jika hari ini tapi belum ada habit yang dikerjakan
                        const styleHariIniNol = isHariIni && status === 'nol' 
                            ? 'ring-2 ring-emerald-400 ring-offset-2 dark:ring-offset-zinc-900 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/20' 
                            : '';

                        return (
                            <div
                                key={tanggal}
                                className={`relative aspect-square rounded-[0.85rem] flex items-center justify-center text-[13px] transition-all duration-300 hover:scale-[1.25] hover:z-20 hover:shadow-lg cursor-default animate-in zoom-in-95 fade-in fill-mode-both ${warna} ${styleHariIniNol}`}
                                style={delayStyle}
                                title={`Tanggal ${tanggal} ${namaBulan}: ${totalHabit === 0 ? 'Belum ada habit' : `${selesai}/${totalHabit} selesai`}`}
                            >
                                {tanggal}

                                {/* Indikator Titik Hari Ini (Lebih futuristik) */}
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

            {/* LEGEND / KETERANGAN WARNA (Lebih rapi ala GitHub) */}
            {totalHabit > 0 && (
                <div className="flex flex-col items-center justify-center gap-2 mt-8 pt-5 border-t border-gray-100 dark:border-zinc-800/80 relative z-10">
                    <div className="flex items-center gap-2.5 bg-gray-50/80 dark:bg-zinc-800/40 px-5 py-2.5 rounded-full border border-gray-100 dark:border-zinc-700/50 shadow-sm">
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mr-1">Kurang</span>
                        
                        {/* 5 Skala Warna */}
                        <div className="w-3.5 h-3.5 rounded-[4px] bg-gray-100/80 dark:bg-zinc-800/50" title="Kosong (0%)"></div>
                        <div className="w-3.5 h-3.5 rounded-[4px] bg-emerald-100 dark:bg-emerald-900/40" title="Rendah (<50%)"></div>
                        <div className="w-3.5 h-3.5 rounded-[4px] bg-emerald-300 dark:bg-emerald-600/70" title="Sedang (50% - 74%)"></div>
                        <div className="w-3.5 h-3.5 rounded-[4px] bg-emerald-400 dark:bg-emerald-500/90" title="Tinggi (75% - 99%)"></div>
                        <div className="w-3.5 h-3.5 rounded-[4px] bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.4)] ring-1 ring-emerald-300 dark:ring-emerald-500" title="Tuntas (100%)"></div>
                        
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-500 font-black uppercase tracking-widest ml-1">Sempurna</span>
                    </div>
                </div>
            )}

        </div>
    );
}