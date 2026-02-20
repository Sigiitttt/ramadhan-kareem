export interface PenandaQuran {
    nomorSurat: number;
    namaSurat: string;
    nomorAyat: number;
}

export interface DataQuran {
    targetKhatam: number;
    riwayatBacaan: Record<string, number>;
    penanda: PenandaQuran | null; // <-- Tambahan Baru
}

export interface SuratSingkat {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    audioFull: Record<string, string>;
}

export interface Ayat {
    nomorAyat: number;
    teksArab: string;
    teksLatin: string;
    teksIndonesia: string;
    audio: Record<string, string>;
}

export interface DetailSurat extends SuratSingkat {
    ayat: Ayat[];
    suratSelanjutnya: SuratSingkat | false;
    suratSebelumnya: SuratSingkat | false;
}