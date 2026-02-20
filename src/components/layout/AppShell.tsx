// components/layout/AppShell.tsx
'use client';

import { Moon, Sun } from 'lucide-react';
import BilahNavigasiBawah from './Navbar';
import { useDarkMode } from '@/hooks/useTemaGelap';


interface PropsBungkus {
    children: React.ReactNode;
}

export default function BungkusAplikasi({ children }: PropsBungkus) {
    const { DarkMode, gantiTema, sudahDimuat } = useDarkMode();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 flex justify-center">
            {/* Container utama dibuat max-w-md biar tampilannya persis HP walau dibuka di PC */}
            <div className="w-full max-w-md bg-white dark:bg-zinc-950 min-h-screen relative pb-20 shadow-xl">

                {/* Header Atas (Bisa dipindah ke komponen terpisah nanti kalau mau) */}
                <header className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-zinc-800 sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur z-40">
                    <h1 className="font-bold text-lg text-emerald-600 dark:text-emerald-400">Ramadhan Tracker</h1>

                    <button
                        onClick={gantiTema}
                        className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300"
                    >
                        {!sudahDimuat ? null : DarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </header>

                {/* Konten Halaman */}
                <main className="p-4">
                    {children}
                </main>

                <BilahNavigasiBawah />
            </div>
        </div>
    );
}