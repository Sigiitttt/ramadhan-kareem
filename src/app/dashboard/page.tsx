// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    ChevronRight, Target, Sun, Moon, Sunrise, Sunset, 
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
    const { sholatBerikutnya, namaLokasi, loading: sholatLoading, deteksiLokasi } = usePrayerTimes();
    const { daftarHabit, sudahDimuat: habitDimuat } = useHabits();
    const { dataQuran, sudahDimuat: quranDimuat } = useQuranTracker(); // <-- Hook baru ditambahkan

    const [sapaan, setSapaan] = useState({ teks: 'Halo', pesan: 'Siap beribadah hari ini?', ikon: Sun });
    const [tanggalHijriah, setTanggalHijriah] = useState('');
    const { dataStatistik, sudahDimuat: statistikDimuat } = useStatistics(); 

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

        // Generate Tanggal Hijriah Otomatis dari sistem
        try {
            const hijri = new Intl.DateTimeFormat('id-ID-u-ca-islamic', {
                day: 'numeric', month: 'long', year: 'numeric'
            }).format(new Date());
            setTanggalHijriah(hijri);
        } catch (e) {
            setTanggalHijriah(''); // Fallback jika browser tidak support
        }
    }, []);

    if (!sudahDimuat) {
        return (
            <div className="flex flex-col gap-4 animate-pulse pt-4 px-4">
                <div className="h-16 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded-2xl mb-4"></div>
                <div className="flex gap-3 overflow-hidden">
                    <div className="h-24 w-36 bg-gray-200 dark:bg-zinc-800 rounded-2xl shrink-0"></div>
                    <div className="h-24 w-36 bg-gray-200 dark:bg-zinc-800 rounded-2xl shrink-0"></div>
                    <div className="h-24 w-36 bg-gray-200 dark:bg-zinc-800 rounded-2xl shrink-0"></div>
                </div>
                <div className="h-[140px] bg-gray-200 dark:bg-zinc-800 rounded-[2rem] mt-2"></div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="h-[200px] bg-gray-200 dark:bg-zinc-800 rounded-[2rem]"></div>
                    <div className="h-[200px] bg-gray-200 dark:bg-zinc-800 rounded-[2rem]"></div>
                </div>
            </div>
        );
    }

    // Kalkulasi Habit Donut Chart
    const habitSelesaiHariIni = daftarHabit.filter(h => h.riwayatSelesai.includes(tanggalHariIni)).length;
    const totalHabit = daftarHabit.length;
    const persentaseHabit = totalHabit > 0 ? Math.round((habitSelesaiHariIni / totalHabit) * 100) : 0;

    // Setup SVG Donut
    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (persentaseHabit / 100) * circumference;
    const IkonSapaan = sapaan.ikon;

    // --- LOGIKA SMART QURAN WIDGET ---
    const penandaQuran = dataQuran.penanda;
    const linkQuran = penandaQuran
        ? `/quran/baca/${penandaQuran.nomorSurat}#ayat-${penandaQuran.nomorAyat}`
        : '/quran';

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50 dark:bg-zinc-950 pb-">

            {/* 1. HEADER HERO (Dual Calendar & Smart Greeting) */}
            <div className="px-5 pt-8 pb-8 bg-white dark:bg-zinc-900 rounded-b-[2.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border-b border-gray-100 dark:border-zinc-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

                <div className="flex justify-between items-start relative z-10">
                    <div className="flex flex-col gap-1.5 w-full">

                        {/* Info Lokasi & Tanggal Ganda */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            <button
                                onClick={deteksiLokasi}
                                title="Deteksi lokasi saat ini"
                                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-emerald-50 dark:bg-zinc-800/80 dark:hover:bg-emerald-900/30 border border-gray-100 dark:border-zinc-700 hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all text-[11px] font-bold text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer active:scale-95"
                            >
                                <MapPin size={12} className="text-emerald-500 group-hover:animate-bounce" />
                                <span className="truncate max-w-[120px]">{namaLokasi}</span>
                            </button>
                            {tanggalHijriah && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                                    <Calendar size={12} />
                                    <span>{tanggalHijriah}</span>
                                </div>
                            )}
                        </div>

                        {/* Teks Sapaan */}
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                            {sapaan.teks}
                        </h1>
                        <p className="text-[13.5px] font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
                            <IkonSapaan size={16} className="text-emerald-500" /> {sapaan.pesan}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6 px-4 pt-6 z-10">

                {/* 2. MENU AKSES CEPAT (Smart Widgets Horizontal Scroll) */}
                <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 snap-x hide-scrollbar">

                    {/* WIDGET Cerdas Al-Quran */}
                    <Link href={linkQuran} className="snap-start shrink-0 flex flex-col justify-between bg-white dark:bg-zinc-900 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition-all w-[140px] group">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/60 dark:to-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform mb-3">
                            <BookOpen size={20} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-[13.5px] text-gray-800 dark:text-gray-100 leading-tight">
                                {penandaQuran ? 'Lanjut Baca' : 'Mulai Ngaji'}
                            </span>
                            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                                {penandaQuran ? `${penandaQuran.namaSurat} : ${penandaQuran.nomorAyat}` : 'Buka Al-Quran'}
                            </span>
                        </div>
                    </Link>
                    <Link href="/tasbih" className="snap-start shrink-0 flex flex-col justify-between bg-white dark:bg-zinc-900 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition-all w-[140px] group">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/60 dark:to-purple-800/60 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform mb-3">
                            <Fingerprint size={20} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-[13.5px] text-gray-800 dark:text-gray-100 leading-tight">Tasbih</span>
                            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mt-0.5">Dzikir Digital</span>
                        </div>
                    </Link>

                    {/* WIDGET Arah Kiblat */}
                    <Link href="/prayer" className="snap-start shrink-0 flex flex-col justify-between bg-white dark:bg-zinc-900 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-md transition-all w-[140px] group">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/60 dark:to-teal-800/60 text-teal-600 dark:text-teal-400 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform mb-3">
                            <Compass size={20} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-[13.5px] text-gray-800 dark:text-gray-100 leading-tight">Arah Kiblat</span>
                            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mt-0.5">Kompas Presisi</span>
                        </div>
                    </Link>

                    {/* WIDGET Log Habit */}
                    <Link href="/habits" className="snap-start shrink-0 flex flex-col justify-between bg-white dark:bg-zinc-900 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all w-[140px] group">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/60 dark:to-blue-800/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform mb-3">
                            <Activity size={20} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-[13.5px] text-gray-800 dark:text-gray-100 leading-tight">Log Habit</span>
                            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mt-0.5">Isi tracker harian</span>
                        </div>
                    </Link> 
                                      
                </div>
                

                {/* 3. WIDGET UTAMA - Jadwal Sholat */}
                <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-end px-1">
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 text-[15px] flex items-center gap-2">
                            <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div> Fokus Saat Ini
                        </h3>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{tanggalMasehi}</span>
                    </div>
                    <div className="rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <PrayerCountdown berikutnya={sholatBerikutnya} />
                    </div>
                </div>

                {/* 4. BENTO GRID (Habit & Gamifikasi) */}
                <div className="grid grid-cols-2 gap-4">

                    {/* Donut Chart Habit */}
                    <Link href="/habits" className="relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-5 shadow-sm border border-gray-100 dark:border-zinc-800 hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group flex flex-col justify-between overflow-hidden">
                        {persentaseHabit === 100 && totalHabit > 0 && (
                            <div className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/20"></div>
                        )}

                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <div className="p-2.5 bg-gray-50 dark:bg-zinc-800 rounded-2xl text-gray-600 dark:text-gray-300">
                                <Target size={18} />
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-zinc-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowUpRight size={16} className="text-emerald-500" />
                            </div>
                        </div>

                        <div className="relative flex justify-center items-center my-1 z-10 group-hover:scale-105 transition-transform duration-500">
                            <svg width="100" height="100" className="transform -rotate-90 drop-shadow-sm">
                                <circle cx="50" cy="50" r={radius} strokeWidth="11" className="stroke-gray-100 dark:stroke-zinc-800" fill="transparent" />
                                <circle
                                    cx="50" cy="50" r={radius} strokeWidth="11"
                                    className={`transition-all duration-1000 ease-out ${persentaseHabit === 100 ? 'stroke-emerald-500' : 'stroke-emerald-400'}`}
                                    fill="transparent"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center justify-center">
                                <span className="font-black text-2xl text-gray-800 dark:text-gray-100 leading-none">{persentaseHabit}%</span>
                            </div>
                        </div>

                        <div className="mt-3 text-center relative z-10">
                            <p className="font-bold text-gray-800 dark:text-gray-100 text-[13px]">Rutinitas</p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{totalHabit - habitSelesaiHariIni} sisa hari ini</p>
                        </div>
                    </Link>

                    <div className="relative bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-md flex flex-col overflow-hidden">
                        <div className="p-3 h-full flex flex-col justify-center">
                            <LencanaLevel data={dataGamifikasi} />
                        </div>
                    </div>
                </div>

                <Link href="/statistics" className="group relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-5 md:p-6 shadow-sm border border-gray-100 dark:border-zinc-800 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all flex items-center justify-between overflow-hidden mt-2">
                    {/* Efek kilauan background */}
                    <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>
                    
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/60 dark:to-blue-800/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                            <TrendingUp size={26} strokeWidth={2} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-[15px] text-gray-800 dark:text-gray-100">Statistik Ibadah</span>
                            <span className="text-[12px] font-medium text-gray-500 dark:text-gray-400">
                                Konsistensi: <strong className="text-blue-600 dark:text-blue-400">{dataStatistik?.konsistensi30Hari || 0}%</strong> bulan ini
                            </span>
                        </div>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-zinc-800 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 transition-all active:scale-95 relative z-10">
                        <ArrowUpRight size={18} />
                    </div>
                </Link>

            </div>

            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}