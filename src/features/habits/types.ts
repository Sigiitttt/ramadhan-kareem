// features/habits/types.ts

export type KategoriHabit = 'wajib' | 'sunnah' | 'custom';

export interface DataHabit {
    id: string;
    nama: string;
    kategori: KategoriHabit;
    riwayatSelesai: string[];
    dibuatPada: string; 
}