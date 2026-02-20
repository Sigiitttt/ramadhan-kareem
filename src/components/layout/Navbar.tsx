// components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CheckSquare, BookOpen, Clock, Settings } from 'lucide-react';

export default function BilahNavigasiBawah() {
    const ruteSekarang = usePathname();

    const daftarMenu = [
        { nama: 'Beranda', rute: '/', ikon: Home },
        { nama: 'Habit', rute: '/habits', ikon: CheckSquare },
        { nama: 'Quran', rute: '/quran', ikon: BookOpen },
        { nama: 'Sholat', rute: '/prayer', ikon: Clock },
        { nama: 'Setelan', rute: '/settings', ikon: Settings },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800 pb-safe">
            <div className="max-w-md mx-auto flex justify-between items-center px-6 py-3">
                {daftarMenu.map((menu) => {
                    const lagiAktif = ruteSekarang === menu.rute;
                    const IkonMenu = menu.ikon;

                    return (
                        <Link
                            key={menu.rute}
                            href={menu.rute}
                            className={`flex flex-col items-center gap-1 ${lagiAktif ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'
                                }`}
                        >
                            <IkonMenu size={24} strokeWidth={lagiAktif ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{menu.nama}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}