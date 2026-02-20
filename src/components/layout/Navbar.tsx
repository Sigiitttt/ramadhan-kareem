// components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, CheckSquare, BookOpen, Compass,
    Settings, BarChart2, Fingerprint
} from 'lucide-react';

export default function BilahNavigasiBawah() {
    const ruteSekarang = usePathname();

    // Sembunyikan navbar jika sedang di halaman Landing/Onboarding
    if (ruteSekarang === '/') return null;

    // Daftar 7 Menu Premium
    const daftarMenu = [
        { nama: 'Home', rute: '/dashboard', ikon: LayoutDashboard },
        { nama: 'Quran', rute: '/quran', ikon: BookOpen },
        { nama: 'Sholat', rute: '/prayer', ikon: Compass },
        { nama: 'Tasbih', rute: '/tasbih', ikon: Fingerprint },
        { nama: 'Habit', rute: '/habits', ikon: CheckSquare },
        { nama: 'Stats', rute: '/statistics', ikon: BarChart2 },
        { nama: 'Setelan', rute: '/settings', ikon: Settings },
    ];

    // Logika Cerdas: Cek apakah menu sedang aktif (termasuk sub-rutenya)
    const cekAktif = (rute: string) => {
        if (rute === '/dashboard' && ruteSekarang === '/dashboard') return true;
        if (rute !== '/dashboard' && ruteSekarang.startsWith(rute)) return true;
        return false;
    };

    return (
        // Pembungkus luar agar mengambang di tengah bawah
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">

            {/* Cangkang Glassmorphism Floating Dock */}
            {/* PERHATIKAN: Kita menggunakan class Tailwind khusus ([&::-webkit-scrollbar]:hidden) untuk menyembunyikan scrollbar tanpa tag <style> */}
            <nav className="bg-white/85 dark:bg-zinc-900/85 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/60 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] rounded-full px-2 py-2 flex items-center gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pointer-events-auto max-w-full">

                {daftarMenu.map((menu) => {
                    const lagiAktif = cekAktif(menu.rute);
                    const IkonMenu = menu.ikon;

                    return (
                        <Link
                            key={menu.rute}
                            href={menu.rute}
                            title={menu.nama}
                            className={`flex items-center justify-center gap-2 rounded-full transition-all duration-500 ease-out shrink-0 ${lagiAktif
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2.5 shadow-md scale-100'
                                    : 'text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-zinc-800/80 p-2.5 scale-95 hover:scale-100'
                                }`}
                        >
                            <IkonMenu size={20} strokeWidth={lagiAktif ? 2.5 : 2} className="shrink-0" />

                            {/* Teks hanya muncul jika menu sedang aktif */}
                            {lagiAktif && (
                                <span className="text-[12px] font-bold tracking-wide whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                                    {menu.nama}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}