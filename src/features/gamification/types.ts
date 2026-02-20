// features/gamification/types.ts
// features/gamification/types.ts

export interface InfoLevel {
    level: number;
    nama: string;
    xpMinimal: number;
    xpMaksimal: number;
}

export interface Lencana {
    id: string;
    nama: string;
    deskripsi: string;
    ikon: string; // Kita pakai string nama ikon Lucide nanti di UI
    terbuka: boolean;
}

export type FaseRamadhan = 'Rahmat' | 'Maghfirah' | 'Pembebasan' | 'Luar Ramadhan';

export interface DataGamifikasi {
    xpTotal: number;
    levelSekarang: InfoLevel;
    progressKeLevelSelanjutnya: number; // Persentase (0-100)
    daftarLencana: Lencana[];
    faseSaatIni: FaseRamadhan;
    hariKe: number;
}