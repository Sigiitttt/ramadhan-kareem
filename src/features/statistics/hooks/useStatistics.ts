'use client';

import { useHabits } from '@/features/habits/hooks/useHabits';
import { useQuranTracker } from '@/features/quran/hooks/useQuranTracker';
import { DataStatistik } from '../types';
import { dapatkanXHariTerakhir, hitungStreak } from '../utils/statsAggregator';
import { dapatkanTanggalHariIni } from '@/utils/tanggal';

export function useStatistics() {
    // Panggil data dari fitur lain
    const { daftarHabit, sudahDimuat: habitDimuat } = useHabits();
    const { dataQuran, sudahDimuat: quranDimuat } = useQuranTracker();

    const tanggalHariIni = dapatkanTanggalHariIni();
    const sudahDimuat = habitDimuat && quranDimuat;

    // 1. Hitung Total Ibadah (Total semua checklist habit + target quran)
    const totalChecklistHabit = daftarHabit.reduce((total, habit) => total + habit.riwayatSelesai.length, 0);
    const totalJuzQuran = Object.values(dataQuran.riwayatBacaan).length; // Menghitung berapa kali user input quran
    const totalIbadah = totalChecklistHabit + totalJuzQuran;

    // 2. Hitung Streak Keseluruhan (Rata-rata atau streak tertinggi dari habit wajib)
    // Untuk simpelnya, kita ambil streak tertinggi dari semua habit yang ada
    const semuaStreak = daftarHabit.map(habit => hitungStreak(habit.riwayatSelesai, tanggalHariIni));
    const streakSaatIni = semuaStreak.length > 0 ? Math.max(...semuaStreak) : 0;

    // Asumsi streak terpanjang sama dengan streak saat ini untuk MVP
    // (Untuk nyimpen *highest score* beneran, butuh disave di local storage terpisah nanti)
    const streakTerpanjang = streakSaatIni;

    // 3. Hitung Konsistensi 30 Hari
    const hari30Terakhir = dapatkanXHariTerakhir(30);
    let totalPotensiChecklist = daftarHabit.length * 30;
    let totalChecklist30Hari = 0;

    if (totalPotensiChecklist > 0) {
        daftarHabit.forEach(habit => {
            habit.riwayatSelesai.forEach(tgl => {
                if (hari30Terakhir.includes(tgl)) {
                    totalChecklist30Hari++;
                }
            });
        });
    }
    const konsistensi30Hari = totalPotensiChecklist > 0
        ? Math.round((totalChecklist30Hari / totalPotensiChecklist) * 100)
        : 0;

    // 4. Hitung Completion Rate Keseluruhan (Sejak aplikasi dipakai)
    // Hitung berapa hari sejak habit paling awal dibuat
    let totalHariAktif = 1;
    if (daftarHabit.length > 0) {
        const tanggalBuatTua = daftarHabit
            .map(h => new Date(h.dibuatPada).getTime())
            .sort((a, b) => a - b)[0];

        if (tanggalBuatTua) {
            const selisihWaktu = new Date().getTime() - tanggalBuatTua;
            totalHariAktif = Math.max(1, Math.ceil(selisihWaktu / (1000 * 3600 * 24)));
        }
    }

    const totalPotensiKeseluruhan = daftarHabit.length * totalHariAktif;
    const completionRate = totalPotensiKeseluruhan > 0
        ? Math.round((totalChecklistHabit / totalPotensiKeseluruhan) * 100)
        : 0;

    const dataStatistik: DataStatistik = {
        totalIbadah,
        completionRate,
        streakTerpanjang,
        streakSaatIni,
        konsistensi30Hari
    };

    return { dataStatistik, sudahDimuat };
}