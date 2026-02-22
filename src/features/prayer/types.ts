// features/prayer/types.ts

export interface WaktuSholat {
    Imsak: string;
    Fajr: string;   
    Dhuhr: string;  // Dzuhur
    Asr: string;    // Ashar  
    Maghrib: string;
    Isha: string;   
}

export interface DataSholatAPI {
    timings: WaktuSholat; 
    meta: {
        timezone: string;
        latitude: number;  
        longitude: number; 
    };
}
export interface InfoSholatBerikutnya {
    nama: string;
    waktu: string;
    sisaWaktuMs: number; 
}

