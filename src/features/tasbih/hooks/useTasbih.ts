// features/tasbih/hooks/useTasbih.ts
'use client';

import { usePenyimpananLokal } from '@/hooks/usePenyimpananLokal';
import { DataTasbih } from '../types';
import { dapatkanTanggalHariIni } from '@/utils/tanggal';
import { getarkanTasbih } from '../utils/tasbihLogic';

const DATA_BAWAAN: DataTasbih = {
    hitunganSaatIni: 0,
    riwayatHarian: {},
};

export function useTasbih() {
    const [dataTasbih, setDataTasbih, sudahDimuat] = usePenyimpananLokal<DataTasbih>(
        'data_tasbih_ramadhan',
        DATA_BAWAAN
    );

    const tanggalHariIni = dapatkanTanggalHariIni();
    const totalHariIni = dataTasbih.riwayatHarian[tanggalHariIni] || 0;

    const tambahHitungan = () => {
        getarkanTasbih(); // Panggil fungsi getar dari utils

        setDataTasbih((dataLama) => {
            const riwayatHariIni = dataLama.riwayatHarian[tanggalHariIni] || 0;
            return {
                ...dataLama,
                hitunganSaatIni: dataLama.hitunganSaatIni + 1,
                riwayatHarian: {
                    ...dataLama.riwayatHarian,
                    [tanggalHariIni]: riwayatHariIni + 1,
                }
            };
        });
    };

    const resetHitungan = () => {
        setDataTasbih((dataLama) => ({
            ...dataLama,
            hitunganSaatIni: 0,
        }));
    };

    return {
        hitunganSaatIni: dataTasbih.hitunganSaatIni,
        totalHariIni,
        tambahHitungan,
        resetHitungan,
        sudahDimuat
    };
}