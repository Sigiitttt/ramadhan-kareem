// features/quran/components/SuratList.tsx
import Link from 'next/link';
import { Search, Book, ChevronRight } from 'lucide-react';
import { SuratSingkat } from '../types';

interface PropsSuratList {
    daftarSurat: SuratSingkat[];
    kataKunci: string;
    onCari: (keyword: string) => void;
}

export default function DaftarSurat({ daftarSurat, kataKunci, onCari }: PropsSuratList) {
    return (
        <div className="flex flex-col gap-6 mt-4">

            {/* Kolom Pencarian (Search Bar) */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-500">
                    <Search size={18} className="text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                    type="text"
                    value={kataKunci}
                    onChange={(e) => onCari(e.target.value)}
                    placeholder="Cari nama surat atau terjemahan..."
                    className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none text-sm transition-all duration-300 font-medium placeholder:text-gray-400"
                />
                {/* Dekorasi efek cahaya di belakang input saat focus */}
                <div className="absolute inset-0 -z-10 bg-emerald-400/20 blur-xl rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* List Surat */}
            <div className="flex flex-col gap-3 pb-8">
                {daftarSurat.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 dark:bg-zinc-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-zinc-800">
                        <Book size={32} className="text-gray-300 dark:text-gray-600 mb-3" />
                        <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">Surat tidak ditemukan.</p>
                        <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Coba gunakan kata kunci lain.</p>
                    </div>
                ) : (
                    daftarSurat.map((surat) => (
                        <Link
                            key={surat.nomor}
                            href={`/quran/baca/${surat.nomor}`}
                            className="group relative overflow-hidden bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(16,185,129,0.1)] hover:border-emerald-200 dark:hover:border-emerald-800/60 transition-all duration-300 flex items-center gap-4"
                        >
                            {/* Garis Aksen Kiri (muncul saat hover) */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-emerald-500 rounded-r-full group-hover:h-3/4 transition-all duration-300"></div>

                            {/* Nomor Surat bentuk Ornamen */}
                            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                                <div className="absolute inset-0 bg-gray-50 dark:bg-zinc-800 rounded-xl rotate-45 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 group-hover:rotate-90 transition-all duration-500"></div>
                                <div className="absolute inset-0 border border-gray-200 dark:border-zinc-700 rounded-xl rotate-45 scale-75 group-hover:border-emerald-300 dark:group-hover:border-emerald-700/60 group-hover:scale-90 transition-all duration-500"></div>
                                <span className="relative z-10 text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                    {surat.nomor}
                                </span>
                            </div>

                            {/* Informasi Surat */}
                            <div className="flex flex-col flex-grow">
                                <span className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors text-[15px]">
                                    {surat.namaLatin}
                                </span>

                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium line-clamp-1 max-w-[120px] sm:max-w-none">
                                        {surat.arti}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-zinc-700 shrink-0"></span>

                                    {/* Badge Jumlah Ayat & Tempat Turun */}
                                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-md whitespace-nowrap group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
                                        {surat.jumlahAyat} Ayat
                                    </span>
                                </div>
                            </div>

                            {/* Teks Arab & Chevron */}
                            <div className="flex items-center gap-3 text-right">
                                <span
                                    className="font-bold text-2xl text-emerald-600 dark:text-emerald-500 group-hover:scale-110 transition-transform duration-300 origin-right"
                                    dir="rtl"
                                    style={{ fontFamily: '"LPMQ Isep Misbah", "Amiri", serif' }}
                                >
                                    {surat.nama}
                                </span>
                                <ChevronRight size={18} className="text-gray-300 dark:text-gray-600 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}