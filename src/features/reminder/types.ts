// features/reminder/types.ts
// features/reminder/types.ts

export interface ItemPengingat {
    id: string;
    nama: string;
    waktu: string; // Format "HH:mm" (24 jam)
    pesan: string;
    aktif: boolean;
}

export interface DataPengingat {
    aktifGlobal: boolean; // Saklar utama mati/nyala semua notifikasi
    daftar: ItemPengingat[];
}