// features/gamification/services/levelEngine.ts
// features/gamification/services/levelEngine.ts
import { InfoLevel, Lencana, FaseRamadhan } from '../types';

// Aturan XP untuk setiap level
export const DAFTAR_LEVEL: InfoLevel[] = [
    { level: 1, nama: 'Pencari Berkah', xpMinimal: 0, xpMaksimal: 99 },
    { level: 2, nama: 'Hamba Taat', xpMinimal: 100, xpMaksimal: 299 },
    { level: 3, nama: 'Pejuang Istiqomah', xpMinimal: 300, xpMaksimal: 599 },
    { level: 4, nama: 'Mujahid Ramadhan', xpMinimal: 600, xpMaksimal: 999 },
    { level: 5, nama: 'Insan Taqwa', xpMinimal: 1000, xpMaksimal: 999999 }, // Level Max
];

// Cari tahu user ada di level mana berdasarkan XP-nya
export const hitungLevel = (xp: number): InfoLevel => {
    return DAFTAR_LEVEL.find(l => xp >= l.xpMinimal && xp <= l.xpMaksimal) || DAFTAR_LEVEL[0];
};

// Hitung persentase bar progress ke level selanjutnya
export const hitungProgressLevel = (xp: number, levelSaatIni: InfoLevel): number => {
    if (levelSaatIni.level === DAFTAR_LEVEL.length) return 100; // Jika sudah level max

    const xpDibutuhkan = levelSaatIni.xpMaksimal - levelSaatIni.xpMinimal;
    const xpDidapatDiLevelIni = xp - levelSaatIni.xpMinimal;

    return Math.min(100, Math.round((xpDidapatDiLevelIni / xpDibutuhkan) * 100));
};

// Evaluasi syarat badge terbuka atau tidak
export const evaluasiLencana = (streakTerpanjang: number, totalJuz: number): Lencana[] => {
    return [
        {
            id: 'streak-7',
            nama: 'Silver Badge',
            deskripsi: '7 Hari Konsisten Beribadah',
            ikon: 'Medal',
            terbuka: streakTerpanjang >= 7,
        },
        {
            id: 'streak-15',
            nama: 'Gold Badge',
            deskripsi: '15 Hari Konsisten Beribadah',
            ikon: 'Award',
            terbuka: streakTerpanjang >= 15,
        },
        {
            id: 'streak-30',
            nama: 'Ramadhan Champion',
            deskripsi: '30 Hari Konsisten Tanpa Putus',
            ikon: 'Trophy',
            terbuka: streakTerpanjang >= 30,
        },
        {
            id: 'khatam-1',
            nama: 'Khatam Quran',
            deskripsi: 'Menyelesaikan 30 Juz',
            ikon: 'BookOpen',
            terbuka: totalJuz >= 30,
        }
    ];
};

// Menentukan fase Ramadhan (Untuk MVP, kita asumsikan berdasarkan hari aktif user atau tanggal statis)
// Ramadhan 2026 diperkirakan mulai 18 Februari 2026.
export const hitungFaseRamadhan = (): { fase: FaseRamadhan; hariKe: number } => {
    const tglMulaiRamadhan = new Date('2026-02-18T00:00:00');
    const hariIni = new Date();

    const selisihWaktu = hariIni.getTime() - tglMulaiRamadhan.getTime();
    const hariKe = Math.floor(selisihWaktu / (1000 * 3600 * 24)) + 1;

    if (hariKe >= 1 && hariKe <= 10) return { fase: 'Rahmat', hariKe };
    if (hariKe >= 11 && hariKe <= 20) return { fase: 'Maghfirah', hariKe };
    if (hariKe >= 21 && hariKe <= 30) return { fase: 'Pembebasan', hariKe };

    // Jika di luar rentang 30 hari tersebut
    return { fase: 'Luar Ramadhan', hariKe: hariKe < 1 ? 0 : hariKe };
};