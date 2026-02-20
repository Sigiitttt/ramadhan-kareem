// features/prayer/services/prayerApi.ts
import { DataSholatAPI } from '../types';

export const ambilJadwalSholat = async (lat: number, lng: number, tanggal: Date): Promise<DataSholatAPI> => {
    // Format tanggal untuk API Aladhan (DD-MM-YYYY)
    const tgl = String(tanggal.getDate()).padStart(2, '0');
    const bln = String(tanggal.getMonth() + 1).padStart(2, '0');
    const thn = tanggal.getFullYear();
    const formatTanggal = `${tgl}-${bln}-${thn}`;

    // method=11 adalah standar Kemenag RI
    const url = `https://api.aladhan.com/v1/timings/${formatTanggal}?latitude=${lat}&longitude=${lng}&method=11`;

    const respon = await fetch(url);

    if (!respon.ok) {
        throw new Error('Gagal mengambil data jadwal sholat');
    }

    const data = await respon.json();
    return data.data;
};