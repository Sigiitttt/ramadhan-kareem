// features/prayer/types.ts

export interface WaktuSholat {
    Imsak: string;
    Fajr: string;   // Subuh
    Dhuhr: string;  // Dzuhur
    Asr: string;    // Ashar
    Maghrib: string;
    Isha: string;   // Isya
}

export interface DataSholatAPI {
    timings: WaktuSholat; // (Ini biarkan seperti aslinya)
    meta: {
        timezone: string;
        latitude: number;  // <-- TAMBAHKAN INI
        longitude: number; // <-- TAMBAHKAN INI
    };
}
export interface InfoSholatBerikutnya {
    nama: string;
    waktu: string;
    sisaWaktuMs: number; // Sisa waktu dalam milidetik untuk hitung mundur
}

