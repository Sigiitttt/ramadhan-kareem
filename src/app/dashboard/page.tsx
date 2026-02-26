'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Target, Sun, Moon, Sunrise, Sunset,
    MapPin, BookOpen, Compass, Activity, ArrowUpRight, Calendar,
    TrendingUp, Fingerprint
} from 'lucide-react';
import { useGamification } from '@/features/gamification/hooks/useGamification';
import { usePrayerTimes } from '@/features/prayer/hooks/usePrayerTimes';
import { useHabits } from '@/features/habits/hooks/useHabits';
import { useQuranTracker } from '@/features/quran/hooks/useQuranTracker';
import { dapatkanTanggalHariIni } from '@/utils/tanggal';
import LencanaLevel from '@/features/gamification/components/LevelBadge';
import PrayerCountdown from '@/features/prayer/components/PrayerCountdown';
import { useStatistics } from '@/features/statistics/hooks/useStatistics';

export default function HalamanDashboard() {
    const { dataGamifikasi, sudahDimuat: gamifikasiDimuat } = useGamification();
    const { sholatBerikutnya, namaLokasi, loading: sholatLoading } = usePrayerTimes();
    const { daftarHabit, sudahDimuat: habitDimuat } = useHabits();
    const { dataQuran, sudahDimuat: quranDimuat } = useQuranTracker();
    const { dataStatistik, sudahDimuat: statistikDimuat } = useStatistics();

    const [sapaan, setSapaan] = useState({ teks: 'Halo', pesan: 'Siap beribadah hari ini?', ikon: Sun });
    const [tanggalHijriah, setTanggalHijriah] = useState('');

    const sudahDimuat = gamifikasiDimuat && habitDimuat && quranDimuat && statistikDimuat && !sholatLoading;
    const tanggalHariIni = dapatkanTanggalHariIni();

    // Format tanggal Masehi
    const tanggalMasehi = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }).format(new Date());

    useEffect(() => {
        // Sapaan Waktu Dinamis
        const jam = new Date().getHours();
        if (jam >= 3 && jam < 11) setSapaan({ teks: 'Selamat Pagi', pesan: 'Awali pagi dengan tilawah & Dhuha.', ikon: Sunrise });
        else if (jam >= 11 && jam < 15) setSapaan({ teks: 'Selamat Siang', pesan: 'Jangan lalaikan sholat di sela kesibukan.', ikon: Sun });
        else if (jam >= 15 && jam < 18) setSapaan({ teks: 'Selamat Sore', pesan: 'Waktu yang mustajab untuk dzikir petang.', ikon: Sunset });
        else setSapaan({ teks: 'Selamat Malam', pesan: 'Evaluasi ibadahmu & berniatlah bangun malam.', ikon: Moon });

        // Generate Tanggal Hijriah Otomatis (Dibersihkan)
        try {
            let hijri = new Intl.DateTimeFormat('id-ID-u-ca-islamic', {
                day: 'numeric', month: 'long', year: 'numeric'
            }).format(new Date());

            // Perbaiki format aneh dari browser (AH -> H, Ramadan -> Ramadhan)
            hijri = hijri.replace(/ AH/g, ' H').replace(/AH/g, 'H').replace(/Ramadan/g, 'Ramadhan');

            setTanggalHijriah(hijri);
        } catch (e) {
            setTanggalHijriah('');
        }
    }, []);

    // SKELETON LOADING
    if (!sudahDimuat) {
        return (
            // padding X diseragamkan menjadi px-3
            <div className="flex flex-col gap-4 animate-pulse pt-6 px-3 pb-24 min-h-[100dvh]">
                <div className="h-24 w-full bg-gray-200 dark:bg-zinc-800 rounded-3xl mb-2"></div>
                <div className="flex gap-3 overflow-hidden mb-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-[100px] w-[130px] bg-gray-200 dark:bg-zinc-800 rounded-2xl shrink-0"></div>
                    ))}
                </div>
                <div className="h-[130px] bg-gray-200 dark:bg-zinc-800 rounded-3xl mt-2"></div>
                <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="h-[180px] bg-gray-200 dark:bg-zinc-800 rounded-3xl"></div>
                    <div className="h-[180px] bg-gray-200 dark:bg-zinc-800 rounded-3xl"></div>
                </div>
            </div>
        );
    }

    // Kalkulasi Habit Donut Chart
    const habitSelesaiHariIni = daftarHabit.filter(h => h.riwayatSelesai.includes(tanggalHariIni)).length;
    const totalHabit = daftarHabit.length;
    const persentaseHabit = totalHabit > 0 ? Math.round((habitSelesaiHariIni / totalHabit) * 100) : 0;

    // Setup SVG Donut
    const radius = 34;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (persentaseHabit / 100) * circumference;
    const IkonSapaan = sapaan.ikon;

    // Logika Smart Quran Widget
    const penandaQuran = dataQuran.penanda;
    const linkQuran = penandaQuran ? `/quran/baca/${penandaQuran.nomorSurat}#ayat-${penandaQuran.nomorAyat}` : '/quran';

    // DATABASE MENU AKSES CEPAT
    const daftarMenuCepat = [
        {
            href: linkQuran, ikon: BookOpen,
            warna: 'group-hover:text-emerald-500',
            bgIkon: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
            borderHover: 'hover:border-emerald-300 dark:hover:border-emerald-700',
            judul: penandaQuran ? 'Lanjut Baca' : 'Mulai Ngaji',
            subJudul: penandaQuran ? `${penandaQuran.namaSurat} : ${penandaQuran.nomorAyat}` : 'Buka Al-Quran'
        },
        {
            href: '/tasbih', ikon: Fingerprint,
            warna: 'group-hover:text-purple-500',
            bgIkon: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400',
            borderHover: 'hover:border-purple-300 dark:hover:border-purple-700',
            judul: 'Tasbih', subJudul: 'Dzikir Digital'
        },
        {
            href: '/prayer', ikon: Compass,
            warna: 'group-hover:text-teal-500',
            bgIkon: 'bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400',
            borderHover: 'hover:border-teal-300 dark:hover:border-teal-700',
            judul: 'Arah Kiblat', subJudul: 'Kompas Presisi'
        },
        {
            href: '/habits', ikon: Activity,
            warna: 'group-hover:text-blue-500',
            bgIkon: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
            borderHover: 'hover:border-blue-300 dark:hover:border-blue-700',
            judul: 'Log Habit', subJudul: 'Isi Rutinitas'
        }
    ];

    return (
        <div className="flex flex-col min-h-[100dvh] bg-gray-50 dark:bg-[#09090b] pb-24 overscroll-none selection:bg-emerald-500/30">

            {/* 1. HEADER HERO */}
            {/* Mengubah px-4 menjadi px-3 agar sejajar sempurna */}
            <div className="px-3 pt-6 pb-6 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-b-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b border-gray-100 dark:border-zinc-800 relative overflow-hidden shrink-0 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/15 dark:bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

                <div className="flex justify-between items-start relative z-10">
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Link href="/prayer" className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 hover:border-emerald-300 shadow-sm transition-all text-[11px] font-bold text-gray-600 dark:text-gray-300">
                                <MapPin size={12} className="text-emerald-500 group-hover:animate-bounce" />
                                <span className="truncate max-w-[120px] capitalize">{namaLokasi}</span>
                            </Link>
                            {tanggalHijriah && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 shadow-sm">
                                    <Calendar size={12} />
                                    <span>{tanggalHijriah}</span>
                                </div>
                            )}
                        </div>

                        <h1 className="text-[26px] font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                            {sapaan.teks}
                        </h1>
                        <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
                            <IkonSapaan size={15} className="text-emerald-500 shrink-0 animate-pulse" />
                            <span className="truncate">{sapaan.pesan}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT WRAPPER */}
            {/* px-4 diubah ke px-3, gap-5 diubah ke gap-4 */}
            <div className="flex flex-col gap-4 px-3 pt-5 z-10 flex-1 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">

                {/* 2. MENU AKSES CEPAT */}
                {/* Margin negatif dan padding juga disesuaikan ke angka 3 (-mx-3 px-3) */}
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-3 px-3 snap-x snap-mandatory hide-scrollbar scroll-smooth">
                    {daftarMenuCepat.map((menu, idx) => {
                        const Ikon = menu.ikon;
                        return (
                            <Link key={idx} href={menu.href} className={`snap-start shrink-0 flex flex-col justify-between bg-white dark:bg-zinc-900 p-3.5 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 ${menu.borderHover} hover:shadow-md transition-all duration-300 w-[130px] group active:scale-95`}>
                                <div className={`w-10 h-10 rounded-xl ${menu.bgIkon} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform mb-2.5 shadow-inner`}>
                                    <Ikon size={18} strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span className={`font-bold text-[13px] text-gray-800 dark:text-gray-100 leading-tight transition-colors ${menu.warna}`}>
                                        {menu.judul}
                                    </span>
                                    <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                                        {menu.subJudul}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* 3. WIDGET UTAMA - Jadwal Sholat */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-end px-1">
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 text-[14px] flex items-center gap-2">
                            <div className="w-1.5 h-3.5 bg-emerald-500 rounded-full"></div> Fokus Saat Ini
                        </h3>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{tanggalMasehi}</span>
                    </div>
                    <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <PrayerCountdown berikutnya={sholatBerikutnya} />
                    </div>
                </div>

                {/* 4. BENTO GRID */}
                <div className="grid grid-cols-2 gap-3">

                    {/* Donut Chart Habit */}
                    <Link href="/habits" className="relative bg-white dark:bg-zinc-900 rounded-3xl p-4 shadow-sm border border-gray-100 dark:border-zinc-800 hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group flex flex-col justify-between overflow-hidden min-h-[180px]">
                        {persentaseHabit === 100 && totalHabit > 0 && (
                            <div className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/20"></div>
                        )}

                        <div className="flex justify-between items-start mb-1 relative z-10">
                            <div className="p-2 bg-gray-50 dark:bg-zinc-800 rounded-xl text-gray-600 dark:text-gray-300">
                                <Target size={16} />
                            </div>
                            <div className="w-7 h-7 rounded-full bg-gray-50 dark:bg-zinc-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowUpRight size={14} className="text-emerald-500" />
                            </div>
                        </div>

                        <div className="relative flex justify-center items-center my-1 z-10 group-hover:scale-105 transition-transform duration-500">
                            <svg width="80" height="80" className="transform -rotate-90 drop-shadow-sm">
                                <circle cx="40" cy="40" r={radius} strokeWidth="9" className="stroke-gray-100 dark:stroke-zinc-800" fill="transparent" />
                                <circle
                                    cx="40" cy="40" r={radius} strokeWidth="9"
                                    className={`transition-all duration-1000 ease-out ${persentaseHabit === 100 ? 'stroke-emerald-500' : 'stroke-emerald-400'}`}
                                    fill="transparent"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center justify-center">
                                <span className="font-black text-xl text-gray-800 dark:text-gray-100 leading-none">{persentaseHabit}%</span>
                            </div>
                        </div>

                        <div className="mt-2 text-center relative z-10">
                            <p className="font-bold text-gray-800 dark:text-gray-100 text-[12px]">Rutinitas</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400">{totalHabit > 0 ? `${totalHabit - habitSelesaiHariIni} sisa hari ini` : 'Belum ada habit'}</p>
                        </div>
                    </Link>

                    {/* Level Badge Box */}
                    <div className="relative flex flex-col min-h-[180px]">
                        <LencanaLevel data={dataGamifikasi} />
                    </div>
                </div>

                {/* 5. STATISTIK BANNER WIDGET */}
                <Link href="/statistics" className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-4 shadow-sm border border-gray-100 dark:border-zinc-800 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 flex items-center justify-between overflow-hidden active:scale-[0.98]">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/15 transition-colors"></div>

                    <div className="flex items-center gap-3 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/60 dark:to-blue-800/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                            <TrendingUp size={20} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-[14px] text-gray-800 dark:text-gray-100 tracking-tight">Statistik Ibadah</span>
                            <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                                Konsistensi: <strong className="text-blue-600 dark:text-blue-400">{dataStatistik?.konsistensi30Hari || 0}%</strong> bulan ini
                            </span>
                        </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-zinc-800 flex items-center justify-center text-gray-400 group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-md transition-all relative z-10 shrink-0">
                        <ArrowUpRight size={16} strokeWidth={2.5} />
                    </div>
                </Link>

            </div>

            {/* CSS Helper untuk Scroll Hiding */}
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}