// app/habits/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Plus, Calendar as CalendarIcon, Sun, Moon, Sunrise, Sunset } from 'lucide-react';
import { useHabits } from '@/features/habits/hooks/useHabits';
import { dapatkanTanggalHariIni } from '@/utils/tanggal';
import DaftarHabit from '@/features/habits/components/DaftarHabit';
import DialogTambahHabit from '@/features/habits/components/DialogTambahHabit';
import TampilanKalenderHabit from '@/features/habits/components/HabitCalendarView';

export default function HalamanHabit() {
    const { daftarHabit, tambahHabit, hapusHabit, toggleHabit, sudahDimuat } = useHabits();
    const [bukaDialog, setBukaDialog] = useState(false);
    const [sapaan, setSapaan] = useState({ teks: 'Halo!', ikon: Sun });

    const tanggalHariIni = dapatkanTanggalHariIni();
    
    // Format tanggal cantik
    const tanggalCantik = new Intl.DateTimeFormat('id-ID', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    }).format(new Date());

    // Logic Sapaan Waktu (Dynamic Greeting)
    useEffect(() => {
        const jam = new Date().getHours();
        if (jam >= 3 && jam < 11) setSapaan({ teks: 'Selamat Pagi', ikon: Sunrise });
        else if (jam >= 11 && jam < 15) setSapaan({ teks: 'Selamat Siang', ikon: Sun });
        else if (jam >= 15 && jam < 18) setSapaan({ teks: 'Selamat Sore', ikon: Sunset });
        else setSapaan({ teks: 'Selamat Malam', ikon: Moon });
    }, []);

    // Skeleton Loading Halus
    if (!sudahDimuat) {
        return (
            <div className="flex flex-col gap-5 animate-pulse pt-4 px-2">
                <div className="flex justify-between items-end mb-4">
                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
                        <div className="h-8 w-40 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
                    </div>
                    <div className="h-11 w-32 bg-gray-200 dark:bg-zinc-800 rounded-full"></div>
                </div>
                <div className="h-[140px] bg-gray-200 dark:bg-zinc-800 rounded-3xl mt-2"></div>
                <div className="h-[300px] bg-gray-200 dark:bg-zinc-800 rounded-3xl mt-4"></div>
            </div>
        );
    }

    const IkonSapaan = sapaan.ikon;

    return (
        <div className="flex flex-col min-h-screen relative pb-0">
            
            {/* Ambient Background Glow (Dekorasi Atmosfer) */}
            <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-950/20 pointer-events-none -z-10"></div>
            
            {/* STICKY HEADER GLASSMORPHISM */}
            {/* Header ini akan menempel di atas saat di-scroll dengan efek kaca blur */}
            <div className="sticky top-0 z-40 -mx-4 px-4 pt-4 pb-4 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-zinc-800/50 mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="flex justify-between items-end">
                    
                    <div className="flex flex-col">
                        {/* Sapaan Waktu Dinamis */}
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-500 mb-1">
                            <IkonSapaan size={16} className="animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-widest">{sapaan.teks}</span>
                        </div>
                        
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-1.5">
                            Tracker
                        </h1>
                        
                        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                            <CalendarIcon size={14} className="text-gray-400 dark:text-gray-500" />
                            <span className="text-[11px] font-bold uppercase tracking-widest">{tanggalCantik}</span>
                        </div>
                    </div>
                    
                    {/* Tombol Tambah Premium (Glowing) */}
                    <button
                        onClick={() => setBukaDialog(true)}
                        className="group relative flex items-center gap-2 bg-gray-900 dark:bg-emerald-500 text-white px-5 py-3 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_20px_rgba(16,185,129,0.25)] hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300 overflow-hidden"
                    >
                        {/* Shimmer Effect Hover */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></div>
                        
                        <Plus size={18} className="relative z-10 group-hover:rotate-90 transition-transform duration-500" /> 
                        <span className="relative z-10 text-sm font-bold">Tambah</span>
                    </button>
                    
                </div>
            </div>

            {/* KONTEN UTAMA */}
            <div className="flex flex-col gap-2 z-10">
                {/* Render List Komponen & Progress Bar */}
                <DaftarHabit
                    daftarHabit={daftarHabit}
                    tanggalAktif={tanggalHariIni}
                    onToggle={toggleHabit}
                    onHapus={hapusHabit}
                />

                {/* Render Kalender Heatmap */}
                <TampilanKalenderHabit daftarHabit={daftarHabit} />
            </div>

            {/* Render Dialog Modal */}
            <DialogTambahHabit
                buka={bukaDialog}
                tutupDialog={() => setBukaDialog(false)}
                onSimpan={tambahHabit}
            />
            
        </div>
    );
}