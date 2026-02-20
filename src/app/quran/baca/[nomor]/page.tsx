// app/quran/baca/[nomor]/page.tsx
'use client';

import { use, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowLeftCircle } from 'lucide-react';
import { useDetailSurat } from '@/features/quran/hooks/useDetailSurat';
import { useQuranTracker } from '@/features/quran/hooks/useQuranTracker';
import KartuAyat from '@/features/quran/components/AyatCard';
import PemutarMurottal from '@/features/quran/components/MurottalPlayer';

export default function HalamanBacaSurat({ params }: { params: Promise<{ nomor: string }> }) {
    const resolvedParams = use(params);
    const nomorSurat = parseInt(resolvedParams.nomor, 10);

    const { detail, loading, error } = useDetailSurat(nomorSurat);
    const { dataQuran, simpanPenanda } = useQuranTracker();

    // --- LOGIKA BARU: Auto-Scroll setelah data ayat selesai dimuat ---
    useEffect(() => {
        // Jika data tidak lagi loading dan detail surat sudah ada
        if (!loading && detail) {
            // Ambil hash dari URL (misal: "#ayat-22")
            const hash = window.location.hash;
            if (hash) {
                // Beri sedikit waktu (delay 500ms) agar browser selesai me-render (menggambar) UI
                setTimeout(() => {
                    const elemenTarget = document.querySelector(hash);
                    if (elemenTarget) {
                        // Gulung layar dengan mulus, dan posisikan ayat tepat di tengah layar
                        elemenTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 500);
            }
        }
    }, [loading, detail]); // Jalankan ulang jika status loading berubah

    if (loading) {
        return (
            <div className="flex flex-col gap-4 animate-pulse pt-4">
                <div className="h-12 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded-xl mb-4"></div>
                <div className="h-28 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-2xl w-full"></div>
                <div className="h-64 bg-gray-200 dark:bg-zinc-800 rounded-[2rem] w-full"></div>
            </div>
        );
    }

    if (error || !detail) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <p className="text-red-500 font-medium">{error || 'Surat tidak ditemukan.'}</p>
                <Link href="/quran" className="px-5 py-2.5 bg-emerald-600 text-white rounded-full text-sm font-bold shadow-md">
                    Kembali ke Daftar Surat
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 pb-20">

            {/* Header Sticky Navbar */}
            <div className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl pt-4 pb-4 border-b border-gray-100 dark:border-zinc-800/80 flex items-center gap-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:static sm:bg-transparent sm:border-none sm:pt-0">
                <Link
                    href="/quran"
                    className="p-2.5 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-full hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 dark:hover:bg-zinc-800 transition-all"
                >
                    <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
                </Link>
                <div className="flex flex-col">
                    <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                        {detail.namaLatin}
                        <span className="text-sm font-arabic text-emerald-600 dark:text-emerald-400 font-normal drop-shadow-sm">{detail.nama}</span>
                    </h2>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
                        {detail.arti} • {detail.jumlahAyat} Ayat
                    </p>
                </div>
            </div>

            {/* Komponen Audio Player Terpisah */}
            <PemutarMurottal audioFull={detail.audioFull} />

            {/* Lafadz Bismillah */}
            {nomorSurat !== 1 && nomorSurat !== 9 && (
                <div className="text-center py-6">
                    <p
                        className="text-[30px]  text-gray-800 dark:text-gray-100 drop-shadow-sm"
                        style={{ fontFamily: '"LPMQ Isep Misbah", "KFGQPC Uthman Taha Naskh", "Amiri", serif' }}
                    >
                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </p>
                </div>
            )}

            {/* List Ayat */}
            <div className="flex flex-col gap-5">
                {detail.ayat.map((ayat) => {
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
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100 dark:border-zinc-800/80">
                {detail.suratSebelumnya ? (
                    <Link
                        href={`/quran/baca/${detail.suratSebelumnya.nomor}`}
                        className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-2xl text-[13px] font-bold text-gray-600 dark:text-gray-300 transition-all active:scale-95"
                    >
                        <ArrowLeftCircle size={18} className="text-gray-400" />
                        <span className="hidden sm:inline">Sebelumnya</span>
                    </Link>
                ) : <div />}

                {detail.suratSelanjutnya ? (
                    <Link
                        href={`/quran/baca/${detail.suratSelanjutnya.nomor}`}
                        className="group flex items-center gap-2 px-5 py-3 bg-gray-900 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_20px_rgba(16,185,129,0.3)] rounded-2xl text-[13px] font-bold transition-all active:scale-95"
                    >
                        <span className="hidden sm:inline group-hover:mr-1 transition-all">Selanjutnya</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                ) : <div />}
            </div>

        </div>
    );
}