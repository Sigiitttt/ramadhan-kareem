// features/quran/hooks/useQuranTracker.ts
'use client';

import { usePenyimpananLokal } from '@/hooks/usePenyimpananLokal';
import { DataQuran } from '../types';

const DATA_BAWAAN: DataQuran = {
    targetKhatam: 1,
    riwayatBacaan: {},
    penanda: null,
};

export function useQuranTracker() {
    const [dataQuran, setDataQuran, sudahDimuat] = usePenyimpananLokal<DataQuran>(
        'data_quran_ramadhan',
        DATA_BAWAAN
    );

    const totalJuzTerbaca = Object.values(dataQuran.riwayatBacaan).reduce((total, juz) => total + juz, 0);
    const targetTotalJuz = dataQuran.targetKhatam * 30;
    const persentaseProgress = Math.min(100, Math.round((totalJuzTerbaca / targetTotalJuz) * 100));

    const aturTargetKhatam = (targetBaru: number) => {
        if (targetBaru < 1) return;
        setDataQuran((dataLama) => ({ ...dataLama, targetKhatam: targetBaru }));
    };

    const updateJuzHarian = (tanggal: string, jumlahTambahan: number) => {
        setDataQuran((dataLama) => {
            const juzSebelumnya = dataLama.riwayatBacaan[tanggal] || 0;
            const juzBaru = Math.max(0, juzSebelumnya + jumlahTambahan);
            return {
                ...dataLama,
                riwayatBacaan: {
                    ...dataLama.riwayatBacaan,
                    [tanggal]: parseFloat(juzBaru.toFixed(2))
                }
            };
        });
    };

    // --- LOGIKA YANG DIPERBAIKI: Bisa Simpan & Batal (Toggle) ---
    const simpanPenanda = (nomorSurat: number, namaSurat: string, nomorAyat: number) => {
        setDataQuran((dataLama) => {
            // 1. Cek apakah ayat yang diklik SAMA persis dengan yang sudah ditandai di memori
            const apakahSudahDitandai =
                dataLama.penanda?.nomorSurat === nomorSurat &&
                dataLama.penanda?.nomorAyat === nomorAyat;

            return {
                ...dataLama,
                // 2. Jika sama, batalkan (jadikan null). Jika beda/baru, simpan datanya.
                penanda: apakahSudahDitandai ? null : { nomorSurat, namaSurat, nomorAyat }
            };
        });
    };

    return {
        dataQuran,
        totalJuzTerbaca,
        targetTotalJuz,
        persentaseProgress,
        aturTargetKhatam,
        updateJuzHarian,
        simpanPenanda,
        sudahDimuat
    };
}