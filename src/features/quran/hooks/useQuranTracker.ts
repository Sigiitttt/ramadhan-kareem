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

    const simpanPenanda = (nomorSurat: number, namaSurat: string, nomorAyat: number) => {
        setDataQuran((dataLama) => ({
            ...dataLama,
            penanda: { nomorSurat, namaSurat, nomorAyat }
        }));
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