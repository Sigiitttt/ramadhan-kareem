// features/statistics/types.ts
// features/statistics/types.ts

export interface DataStatistik {
    totalIbadah: number;       // Total semua centang habit yang pernah dilakukan
    completionRate: number;    // Persentase penyelesaian (semua waktu)
    streakTerpanjang: number;  // Streak (berturut-turut) paling tinggi
    streakSaatIni: number;     // Streak yang sedang berjalan hari ini
    konsistensi30Hari: number; // Persentase konsistensi dalam 30 hari terakhir
}