// features/quran/hooks/useQuranTracker.ts
'use client';

import { usePenyimpananLokal } from '@/hooks/usePenyimpananLokal';
import { DataQuran } from '../types';

const DATA_BAWAAN: DataQuran = {
    targetKhatam: 1,
    riwayatBacaan: {},
};

export function useQuranTracker() {
    const [dataQuran, setDataQuran, sudahDimuat] = usePenyimpananLokal<DataQuran>(
        'data_quran_ramadhan',
        DATA_BAWAAN
    );

    // Hitung total juz yang sudah dibaca dari seluruh riwayat
    const totalJuzTerbaca = Object.values(dataQuran.riwayatBacaan).reduce((total, juz) => total + juz, 0);

    // Total target juz (1x khatam = 30 juz)
    const targetTotalJuz = dataQuran.targetKhatam * 30;

    // Hitung persentase (maksimal 100%)
    const persentaseProgress = Math.min(100, Math.round((totalJuzTerbaca / targetTotalJuz) * 100));

    // Fungsi mengubah target khatam
    const aturTargetKhatam = (targetBaru: number) => {
        if (targetBaru < 1) return;
        setDataQuran((dataLama) => ({
            ...dataLama,
            targetKhatam: targetBaru,
        }));
    };

    // Fungsi menambah/mengurangi bacaan juz di tanggal tertentu
    const updateJuzHarian = (tanggal: string, jumlahTambahan: number) => {
        setDataQuran((dataLama) => {
            const juzSebelumnya = dataLama.riwayatBacaan[tanggal] || 0;
            // Memastikan jumlah juz tidak minus
            const juzBaru = Math.max(0, juzSebelumnya + jumlahTambahan);

            return {
                ...dataLama,
                riwayatBacaan: {
                    ...dataLama.riwayatBacaan,
                    [tanggal]: parseFloat(juzBaru.toFixed(2)) // Hindari angka desimal panjang
                }
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
        sudahDimuat
    };
}