// app/prayer/page.tsx
'use client';

import { MapPin, Calendar, Compass } from 'lucide-react';
import { usePrayerTimes } from '@/features/prayer/hooks/usePrayerTimes';
import PrayerCountdown from '@/features/prayer/components/PrayerCountdown';
import PrayerCard from '@/features/prayer/components/PrayerCard';
import KompasKiblat from '@/features/prayer/components/QiblaCompass';

export default function HalamanPrayer() {
    // Memanggil hook yang sudah di-upgrade sebelumnya
    const { jadwal, sholatBerikutnya, namaLokasi, loading, error, deteksiLokasi } = usePrayerTimes();

    // SKELETON LOADING PREMIUM
    if (loading) {
        return (
            <div className="flex flex-col gap-6 animate-pulse pt-4 px-2">
                <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-800 rounded-lg mb-2"></div>
                <div className="h-40 bg-gray-200 dark:bg-zinc-800 rounded-[2.5rem]"></div>
                <div className="h-72 bg-gray-200 dark:bg-zinc-800 rounded-[2.5rem]"></div>
                <div className="h-[400px] bg-gray-200 dark:bg-zinc-800 rounded-[2.5rem]"></div>
            </div>
        );
    }

    // STATE ERROR PREMIUM
    if (error || !jadwal) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
                <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-[2rem] flex items-center justify-center mb-2 shadow-sm border border-red-100 dark:border-red-900/50">
                    <Compass size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Gagal Memuat</h3>
                <p className="text-sm text-gray-500 max-w-[250px]">{error || 'Periksa koneksi internet Anda dan coba lagi.'}</p>
                <button onClick={deteksiLokasi} className="mt-4 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-sm font-bold active:scale-95 transition-transform">
                    Coba Lagi
                </button>
            </div>
        );
    }

    // Format Tanggal
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
        <div className="flex flex-col min-h-screen relative pb-2">
            
            {/* Latar Belakang Cahaya (Ambient Glow) */}
            <div className="fixed top-0 left-0 w-full h-72 bg-gradient-to-b from-teal-50/80 to-transparent dark:from-teal-950/20 pointer-events-none -z-10"></div>
            <div className="fixed top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>

            {/* HEADER STICKY (Glassmorphism) */}
            <div className="sticky top-0 z-40 -mx-4 px-4 pt-6 pb-5 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl border-b border-gray-200/50 dark:border-zinc-800/50 mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="flex flex-col gap-3">
                    
                    {/* Chip Lokasi & Tanggal Hijriah */}
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={deteksiLokasi}
                            title="Perbarui Lokasi"
                            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:border-teal-300 dark:hover:border-teal-700 shadow-sm transition-all text-[11px] font-bold text-gray-600 dark:text-gray-300 active:scale-95 cursor-pointer"
                        >
                            <MapPin size={12} className="text-teal-500 group-hover:animate-bounce" />
                            <span className="truncate max-w-[150px]">{namaLokasi}</span>
                        </button>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/30 text-[11px] font-bold text-teal-700 dark:text-teal-400">
                            <Calendar size={12} />
                            <span>{tanggalHijriah}</span>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                            Jadwal & Kiblat
                        </h1>
                        <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">
                            {tanggalMasehi}
                        </p>
                    </div>
                </div>
            </div>

            {/* KONTEN UTAMA */}
            <div className="flex flex-col gap-8 z-10">
                
                {/* 1. WIDGET HITUNG MUNDUR */}
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out fill-mode-both">
                    <div className="rounded-[2.5rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none border border-white/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl">
                        <PrayerCountdown berikutnya={sholatBerikutnya} />
                    </div>
                </div>

                {/* 2. WIDGET KOMPAS KIBLAT */}
                <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 ease-out fill-mode-both">
                    <div className="flex items-center gap-2 px-1">
                        <div className="w-1.5 h-5 bg-gradient-to-b from-teal-400 to-emerald-600 rounded-full"></div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg tracking-tight">Arah Kiblat</h3>
                    </div>
                    <div className="rounded-[2.5rem] bg-white dark:bg-zinc-900 p-6 shadow-sm border border-gray-100 dark:border-zinc-800 relative overflow-hidden group">
                        {/* Efek cahaya saat disorot */}
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <KompasKiblat />
                        </div>
                    </div>
                </div>

                {/* 3. WIDGET DAFTAR JADWAL LENGKAP */}
                <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 ease-out fill-mode-both">
                    <div className="flex justify-between items-end px-1">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-5 bg-gradient-to-b from-teal-400 to-emerald-600 rounded-full"></div>
                            <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg tracking-tight">Waktu Lengkap</h3>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
                            Zona {jadwal.meta.timezone.replace('_', ' ')}
                        </span>
                    </div>
                    
                    <div className="rounded-[2.5rem] bg-white dark:bg-zinc-900 p-2 shadow-sm border border-gray-100 dark:border-zinc-800">
                        <PrayerCard jadwal={jadwal.timings} sholatBerikutnya={sholatBerikutnya?.nama} />
                    </div>
                </div>

            </div>
        </div>
    );
}