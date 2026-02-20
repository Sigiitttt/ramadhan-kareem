// app/quran/baca/[nomor]/page.tsx
'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowLeftCircle } from 'lucide-react';
import { useDetailSurat } from '@/features/quran/hooks/useDetailSurat';
import KartuAyat from '@/features/quran/components/AyatCard';
import PemutarMurottal from '@/features/quran/components/MurottalPlayer';
import { useQuranTracker } from '@/features/quran/hooks/useQuranTracker';

export default function HalamanBacaSurat({ params }: { params: Promise<{ nomor: string }> }) {
    const resolvedParams = use(params);
    const nomorSurat = parseInt(resolvedParams.nomor, 10);

    const { detail, loading, error } = useDetailSurat(nomorSurat);
    const { dataQuran, simpanPenanda } = useQuranTracker();

    if (loading) {
        return (
            <div className="flex flex-col gap-4 animate-pulse pt-4">
                <div className="h-12 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded-xl mb-4"></div>
                <div className="h-28 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-2xl w-full"></div>
                <div className="h-64 bg-gray-200 dark:bg-zinc-800 rounded-2xl w-full"></div>
            </div>
        );
    }

    if (error || !detail) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <p className="text-red-500 font-medium">{error || 'Surat tidak ditemukan.'}</p>
                <Link href="/quran" className="px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-bold">
                    Kembali ke Daftar Surat
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 pb-20">

            {/* Header Sticky Navbar */}
            <div className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md pt-4 pb-4 border-b border-gray-200 dark:border-zinc-800 flex items-center gap-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:static sm:bg-transparent sm:border-none sm:pt-0">
                <Link
                    href="/quran"
                    className="p-2.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-700 dark:text-gray-300" />
                </Link>
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                        {detail.namaLatin}
                        <span className="text-sm font-arabic text-emerald-600 dark:text-emerald-400 font-normal">{detail.nama}</span>
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {detail.arti} • {detail.jumlahAyat} Ayat • {detail.tempatTurun}
                    </p>
                </div>
            </div>

            {/* Komponen Audio Player Terpisah */}
            <PemutarMurottal audioFull={detail.audioFull} />

            {/* Lafadz Bismillah */}
            {nomorSurat !== 1 && nomorSurat !== 9 && (
                <div className="text-center py-4">
                    <p
                        className="text-3xl font-bold text-gray-800 dark:text-gray-100 drop-shadow-sm"
                        style={{ fontFamily: '"LPMQ Isep Misbah", "KFGQPC Uthman Taha Naskh", "Amiri", serif' }}
                    >
                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </p>
                </div>
            )}

            {/* List Ayat */}
            <div className="flex flex-col gap-4">
                {detail.ayat.map((ayat) => {
                    // Cek apakah ayat ini adalah ayat yang ditandai
                    const isDitandai =
                        dataQuran.penanda?.nomorSurat === nomorSurat &&
                        dataQuran.penanda?.nomorAyat === ayat.nomorAyat;

                    return (
                        <KartuAyat
                            key={ayat.nomorAyat}
                            ayat={ayat}
                            isDitandai={isDitandai}
                            onTandai={() => simpanPenanda(nomorSurat, detail.namaLatin, ayat.nomorAyat)}
                        />
                    );
                })}
            </div>



            {/* Navigasi Footer */}
            <div className="flex justify-between items-center mt-4 pt-6 border-t border-gray-200 dark:border-zinc-800">
                {detail.suratSebelumnya ? (
                    <Link
                        href={`/quran/baca/${detail.suratSebelumnya.nomor}`}
                        className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-emerald-500 rounded-xl text-sm font-medium transition-all"
                    >
                        <ArrowLeftCircle size={18} className="text-gray-400" />
                        <span className="hidden sm:inline">Sebelumnya</span>
                    </Link>
                ) : <div />}

                {detail.suratSelanjutnya ? (
                    <Link
                        href={`/quran/baca/${detail.suratSelanjutnya.nomor}`}
                        className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 rounded-xl text-sm font-bold transition-all"
                    >
                        <span className="hidden sm:inline">Selanjutnya</span>
                        <ArrowRight size={18} />
                    </Link>
                ) : <div />}
            </div>

        </div>
    );
}