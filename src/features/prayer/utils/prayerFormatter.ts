// features/prayer/utils/prayerFormatter.ts
import { WaktuSholat, InfoSholatBerikutnya } from '../types';

// Map nama dari API ke bahasa Indonesia
export const MAP_NAMA_SHOLAT: Record<string, string> = {
    Imsak: 'Imsak',
    Fajr: 'Subuh',
    Dhuhr: 'Dzuhur',
    Asr: 'Ashar',
    Maghrib: 'Maghrib',
    Isha: 'Isya'
};

export const cariSholatBerikutnya = (jadwal: WaktuSholat): InfoSholatBerikutnya | null => {
    const sekarang = new Date();
    const waktuSekarang = sekarang.getTime();

    // Urutan sholat yang ingin kita cek
    const urutan = ['Imsak', 'Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;

    for (const kunci of urutan) {
        const waktuString = jadwal[kunci];
        if (!waktuString) continue;

        const [jam, menit] = waktuString.split(':').map(Number);

        const targetWaktu = new Date();
        targetWaktu.setHours(jam, menit, 0, 0);

        const selisih = targetWaktu.getTime() - waktuSekarang;

        // Jika selisihnya positif, berarti waktu sholat ini belum terlewati hari ini
        if (selisih > 0) {
            return {
                nama: MAP_NAMA_SHOLAT[kunci],
                waktu: waktuString,
                sisaWaktuMs: selisih
            };
        }
    }

    // Jika sudah melewati Isya, sholat berikutnya adalah Imsak di hari berikutnya.
    // Untuk MVP, kita kembalikan null dulu (nanti bisa dikembangkan untuk fetch hari esok)
    return null;
};

export const formatHitungMundur = (ms: number): string => {
    if (ms <= 0) return "00:00:00";

    const detikTotal = Math.floor(ms / 1000);
    const jam = Math.floor(detikTotal / 3600);
    const menit = Math.floor((detikTotal % 3600) / 60);
    const detik = detikTotal % 60;

    return [jam, menit, detik]
        .map((val) => String(val).padStart(2, '0'))
        .join(':');
};