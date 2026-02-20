// features/quran/types.ts

export interface DataQuran {
    targetKhatam: number; // Target berapa kali khatam (default: 1)
    // Menyimpan riwayat bacaan berupa { "2026-02-20": 1.5, "2026-02-21": 2 }
    riwayatBacaan: Record<string, number>;
}