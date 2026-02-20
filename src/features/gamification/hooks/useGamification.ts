// features/gamification/hooks/useGamification.ts
// features/gamification/hooks/useGamification.ts
'use client';

import { useHabits } from '@/features/habits/hooks/useHabits';
import { useQuranTracker } from '@/features/quran/hooks/useQuranTracker';
import { useStatistics } from '@/features/statistics/hooks/useStatistics';
import {
    hitungLevel,
    hitungProgressLevel,
    evaluasiLencana,
    hitungFaseRamadhan
} from '../services/levelEngine';
import { DataGamifikasi } from '../types';

export function useGamification() {
    const { daftarHabit, sudahDimuat: habitDimuat } = useHabits();
    const { totalJuzTerbaca, sudahDimuat: quranDimuat } = useQuranTracker();
    const { dataStatistik, sudahDimuat: statsDimuat } = useStatistics();

    const sudahDimuat = habitDimuat && quranDimuat && statsDimuat;

    // 1. Hitung XP Total
    // 10 XP untuk setiap habit yang dicentang
    const totalCentangHabit = daftarHabit.reduce((total, habit) => total + habit.riwayatSelesai.length, 0);
    const xpHabit = totalCentangHabit * 10;

    // 50 XP untuk setiap Juz yang dibaca
    const xpQuran = Math.floor(totalJuzTerbaca) * 50;

    const xpTotal = xpHabit + xpQuran;

    // 2. Hitung Level & Progress
    const levelSekarang = hitungLevel(xpTotal);
    const progressKeLevelSelanjutnya = hitungProgressLevel(xpTotal, levelSekarang);

    // 3. Evaluasi Lencana (Badges)
    const daftarLencana = evaluasiLencana(dataStatistik.streakTerpanjang, totalJuzTerbaca);

    // 4. Hitung Fase Ramadhan
    const { fase, hariKe } = hitungFaseRamadhan();

    const dataGamifikasi: DataGamifikasi = {
        xpTotal,
        levelSekarang,
        progressKeLevelSelanjutnya,
        daftarLencana,
        faseSaatIni: fase,
        hariKe
    };

    return { dataGamifikasi, sudahDimuat };
}