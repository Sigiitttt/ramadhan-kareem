// features/prayer/services/prayerApi.ts

export async function ambilJadwalSholatBerdasarkanKota(kota: string, tanggal: Date) {
    const tgl = tanggal.getDate().toString().padStart(2, '0');
    const bln = (tanggal.getMonth() + 1).toString().padStart(2, '0');
    const thn = tanggal.getFullYear();
    const dateStr = `${tgl}-${bln}-${thn}`;

    const url = `https://api.aladhan.com/v1/timingsByAddress/${dateStr}?address=${kota},Indonesia&method=20`;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Gagal mengambil data dari Aladhan API');
    }
    
    const res = await response.json();
    return res.data;
}