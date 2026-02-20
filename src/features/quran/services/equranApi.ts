// features/quran/services/equranApi.ts
import { SuratSingkat, DetailSurat } from '../types';

const BASE_URL = 'https://equran.id/api/v2';

// Mengambil daftar 114 surat
export const ambilDaftarSurat = async (): Promise<SuratSingkat[]> => {
    const respon = await fetch(`${BASE_URL}/surat`);
    if (!respon.ok) throw new Error('Gagal mengambil daftar surat');

    const json = await respon.json();
    return json.data;
};

// Mengambil detail satu surat beserta ayat-ayatnya
export const ambilDetailSurat = async (nomorSurat: number): Promise<DetailSurat> => {
    const respon = await fetch(`${BASE_URL}/surat/${nomorSurat}`);
    if (!respon.ok) throw new Error(`Gagal mengambil surat nomor ${nomorSurat}`);

    const json = await respon.json();
    return json.data;
};