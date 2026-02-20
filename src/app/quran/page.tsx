// app/quran/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookMarked } from 'lucide-react';
import { useQuranTracker } from '@/features/quran/hooks/useQuranTracker';
import { useDaftarSurat } from '@/features/quran/hooks/useDaftarSurat';
import KartuProgressQuran from '@/features/quran/components/QuranProgressCard';
import DaftarSurat from '@/features/quran/components/SurahList';
import { dapatkanTanggalHariIni } from '@/utils/tanggal';

export default function HalamanQuran() {
    // State untuk Tab Aktif ('progress' atau 'baca')
    const [tabAktif, setTabAktif] = useState<'progress' | 'baca'>('progress');

    const {
        dataQuran,
        totalJuzTerbaca,
        targetTotalJuz,
        persentaseProgress,
        aturTargetKhatam,
        updateJuzHarian,
        sudahDimuat
    } = useQuranTracker();

    const { daftarSurat, loading: quranLoading, kataKunci, setKataKunci } = useDaftarSurat();

    const tanggalHariIni = dapatkanTanggalHariIni();
    const bacaanHariIni = dataQuran.riwayatBacaan[tanggalHariIni] || 0;

    if (!sudahDimuat) return null;

    return (
        <div className="flex flex-col gap-4 pb-6">

            <div className="flex flex-col mb-1">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Al-Quran</h2>
            </div>

            {/* Navigasi Tab Ala iOS */}
            <div className="flex bg-gray-100 dark:bg-zinc-800/50 p-1 rounded-xl w-full relative z-10">
                <button
                    onClick={() => setTabAktif('progress')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${tabAktif === 'progress' ? 'bg-white dark:bg-zinc-700 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Progress
                </button>
                <button
                    onClick={() => setTabAktif('baca')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${tabAktif === 'baca' ? 'bg-white dark:bg-zinc-700 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Baca Surat
                </button>
            </div>

            {/* KONTEN TAB: PROGRESS */}
            {tabAktif === 'progress' && (
                <div className="flex flex-col gap-6 mt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">

                    {/* Kartu Terakhir Dibaca (Bookmark) */}
                    <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 opacity-10">
                            <BookMarked size={120} />
                        </div>

                        <p className="text-emerald-100 text-xs font-medium uppercase tracking-wider mb-2">Terakhir Dibaca</p>

                        {dataQuran.penanda ? (
                            <>
                                <h3 className="font-bold text-2xl mb-1">{dataQuran.penanda.namaSurat}</h3>
                                <p className="text-emerald-50 text-sm mb-6">Ayat {dataQuran.penanda.nomorAyat}</p>
                                {/* Link ini akan otomatis auto-scroll ke elemen dengan ID #ayat-xx */}
                                <Link
                                    href={`/quran/baca/${dataQuran.penanda.nomorSurat}#ayat-${dataQuran.penanda.nomorAyat}`}
                                    className="inline-flex items-center bg-white text-emerald-700 px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:scale-105 active:scale-95 transition-transform"
                                >
                                    Lanjutkan Membaca
                                </Link>
                            </>
                        ) : (
                            <>
                                <h3 className="font-bold text-lg mb-1 opacity-80">Belum ada penanda</h3>
                                <p className="text-emerald-100/70 text-xs mb-6 max-w-[200px]">Mulai baca Al-Quran dan tandai ayat terakhirmu di sini.</p>
                                <button
                                    onClick={() => setTabAktif('baca')}
                                    className="inline-flex items-center bg-white/20 text-white backdrop-blur-sm border border-white/30 px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-white/30 transition-colors"
                                >
                                    Mulai Membaca
                                </button>
                            </>
                        )}
                    </div>

                    {/* Kartu Manual Tracker Khatam */}
                    <div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3 px-1">Tracker Khatam (Manual)</h3>
                        <KartuProgressQuran
                            targetKhatam={dataQuran.targetKhatam}
                            totalJuzTerbaca={totalJuzTerbaca}
                            targetTotalJuz={targetTotalJuz}
                            persentaseProgress={persentaseProgress}
                            juzHariIni={bacaanHariIni}
                            onUpdateJuz={(tambahan) => updateJuzHarian(tanggalHariIni, tambahan)}
                            onUbahTarget={aturTargetKhatam}
                        />
                    </div>
                </div>
            )}

            {/* KONTEN TAB: BACA QURAN */}
            {tabAktif === 'baca' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 mt-2">
                    {quranLoading ? (
                        <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div></div>
                    ) : (
                        <DaftarSurat
                            daftarSurat={daftarSurat}
                            kataKunci={kataKunci}
                            onCari={setKataKunci}
                        />
                    )}
                </div>
            )}

        </div>
    );
}