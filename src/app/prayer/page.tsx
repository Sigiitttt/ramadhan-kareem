// app/prayer/page.tsx
'use client';

import { useState } from 'react';
import { MapPin, Calendar, Compass, Search, X } from 'lucide-react';
import { usePrayerTimes } from '@/features/prayer/hooks/usePrayerTimes';
import PrayerCountdown from '@/features/prayer/components/PrayerCountdown';
import PrayerCard from '@/features/prayer/components/PrayerCard';
import KompasKiblat from '@/features/prayer/components/QiblaCompass';

export default function HalamanPrayer() {
    const { jadwal, sholatBerikutnya, namaLokasi, loading, error, ubahKota } = usePrayerTimes();

    const [modalBuka, setModalBuka] = useState(false);
    const [inputKota, setInputKota] = useState("");

    const handleSimpanKota = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputKota.trim() !== '') {
            ubahKota(inputKota.trim());
            setModalBuka(false);
        }
    };

    const formatZonaWaktu = (tz: string | undefined) => {
        if (!tz) return 'LOKAL';
        const zona = tz.toLowerCase();
        if (zona.includes('jakarta') || zona.includes('pontianak')) return 'WIB';
        if (zona.includes('makassar') || zona.includes('bali') || zona.includes('kuala_lumpur')) return 'WITA';
        if (zona.includes('jayapura')) return 'WIT';
        return tz.replace(/_/g, ' ');
    };

    if (loading) {
        return (
            // px-4 diubah ke px-3
            <div className="flex flex-col gap-4 animate-pulse pt-6 px-3 pb-24">
                <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-800 rounded-lg mb-2"></div>
                <div className="h-[130px] bg-gray-200 dark:bg-zinc-800 rounded-3xl"></div>
                <div className="h-[320px] bg-gray-200 dark:bg-zinc-800 rounded-3xl"></div>
                <div className="h-[400px] bg-gray-200 dark:bg-zinc-800 rounded-3xl"></div>
            </div>
        );
    }

    if (error || !jadwal) {
        return (
            // px-4 diubah ke px-3
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-3 text-center px-3">
                <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-3xl flex items-center justify-center mb-1 shadow-sm border border-red-100 dark:border-red-900/50">
                    <Compass size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Gagal Memuat Jadwal</h3>
                <p className="text-[13px] text-gray-500 max-w-[250px] leading-relaxed">
                    Pastikan nama kota <strong>{namaLokasi}</strong> benar dan periksa koneksi internet Anda.
                </p>
                <button
                    onClick={() => {
                        setInputKota(namaLokasi);
                        setModalBuka(true);
                    }}
                    className="mt-3 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-[13px] font-bold active:scale-95 transition-all shadow-md"
                >
                    Ubah Kota
                </button>
            </div>
        );
    }

    const tanggalMasehi = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }).format(new Date());

    let tanggalHijriah = '';
    try {
        tanggalHijriah = new Intl.DateTimeFormat('id-ID-u-ca-islamic', {
            day: 'numeric', month: 'long', year: 'numeric'
        }).format(new Date());
    } catch (e) {
        tanggalHijriah = 'Bulan Hijriah';
    }

    return (
        <div className="flex flex-col min-h-screen relative pb-24">

            {/* MODAL UBAH KOTA */}
            {modalBuka && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-3 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    {/* Padding modal dikurangi dari p-5 ke p-4 agar tidak memakan ruang */}
                    <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-4 w-full max-w-sm shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-zinc-800 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-4 px-1">
                            <h3 className="text-[17px] font-black text-gray-900 dark:text-white tracking-tight">Pilih Kota</h3>
                            <button onClick={() => setModalBuka(false)} className="p-2 bg-gray-50 dark:bg-zinc-800 rounded-full text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors">
                                <X size={16} strokeWidth={2.5} />
                            </button>
                        </div>
                        <form onSubmit={handleSimpanKota} className="flex flex-col gap-3">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search size={16} className="text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    autoFocus
                                    value={inputKota}
                                    onChange={(e) => setInputKota(e.target.value)}
                                    placeholder="Contoh: Sidoarjo, Surabaya..."
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-[1.25rem] text-[13px] font-bold focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all dark:text-white"
                                />
                            </div>
                            <button type="submit" className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-[1.25rem] font-bold text-[14px] transition-all active:scale-95 shadow-md">
                                Terapkan Lokasi
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* BACKGROUND DECORATION */}
            <div className="fixed top-0 left-0 w-full h-72 bg-gradient-to-b from-teal-50/80 to-transparent dark:from-teal-950/20 pointer-events-none -z-10"></div>
            <div className="fixed top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>

            {/* HEADER STICKY */}
            {/* Mengubah px-4 menjadi px-3 */}
            <div className="sticky top-0 z-40 px-3 pt-6 pb-4 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl border-b border-gray-100 dark:border-zinc-800/50 mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="flex flex-col gap-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => {
                                setInputKota(namaLokasi);
                                setModalBuka(true);
                            }}
                            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:border-emerald-300 dark:hover:border-emerald-700 shadow-sm transition-all text-[11px] font-bold text-gray-600 dark:text-gray-300 active:scale-95 cursor-pointer"
                        >
                            <MapPin size={12} className="text-emerald-500 group-hover:animate-bounce" />
                            <span className="truncate max-w-[150px] capitalize">{namaLokasi}</span>
                        </button>

                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                            <Calendar size={12} />
                            <span>{tanggalHijriah}</span>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-[26px] font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                            Jadwal & Kiblat
                        </h1>
                        <p className="text-[12px] font-bold text-gray-400 dark:text-gray-500 mt-0.5 uppercase tracking-wider">
                            {tanggalMasehi}
                        </p>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            {/* px-4 diubah ke px-3, gap-5 diubah ke gap-4 biar lebih rapat dan lebar di HP */}
            <div className="flex flex-col gap-4 z-10 px-3">

                {/* 1. COUNTDOWN WIDGET */}
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out fill-mode-both">
                    <div className="rounded-3xl overflow-hidden shadow-sm dark:shadow-none border border-white/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl">
                        <PrayerCountdown berikutnya={sholatBerikutnya} />
                    </div>
                </div>

                {/* 2. KIBLAT WIDGET */}
                <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 ease-out fill-mode-both">
                    <div className="flex items-center gap-2 px-1">
                        <div className="w-1.5 h-4 bg-gradient-to-b from-emerald-400 to-teal-600 rounded-full"></div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 text-[15px] tracking-tight">Arah Kiblat</h3>
                    </div>
                    {/* Mengurangi padding di dalam card kompas dari p-5 ke p-4 */}
                    <div className="rounded-3xl bg-white dark:bg-zinc-900 p-4 shadow-sm border border-gray-100 dark:border-zinc-800 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <KompasKiblat kota={namaLokasi} />
                        </div>
                    </div>
                </div>

                {/* 3. JADWAL LENGKAP WIDGET */}
                <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 ease-out fill-mode-both">
                    <div className="flex justify-between items-end px-1">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-4 bg-gradient-to-b from-emerald-400 to-teal-600 rounded-full"></div>
                            <h3 className="font-bold text-gray-800 dark:text-gray-100 text-[15px] tracking-tight">Waktu Lengkap</h3>
                        </div>
                        <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">
                            ZONA {formatZonaWaktu(jadwal.meta?.timezone)}
                        </span>
                    </div>

                    <div className="rounded-3xl bg-white dark:bg-zinc-900 p-2 shadow-sm border border-gray-100 dark:border-zinc-800">
                        <PrayerCard jadwal={jadwal.timings} sholatBerikutnya={sholatBerikutnya?.nama} />
                    </div>
                </div>

            </div>
        </div>
    );
}