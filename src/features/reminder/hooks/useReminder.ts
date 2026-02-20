// features/reminder/hooks/useReminder.ts
// features/reminder/hooks/useReminder.ts
'use client';

import { useState, useEffect, useRef } from 'react';
import { usePenyimpananLokal } from '@/hooks/usePenyimpananLokal';
import { DataPengingat, ItemPengingat } from '../types';
import { cekDukunganNotifikasi, mintaIzinNotifikasi, kirimNotifikasi } from '../services/notificationService';

// Jadwal bawaan saat pertama kali aplikasi dibuka
const DATA_BAWAAN: DataPengingat = {
    aktifGlobal: false,
    daftar: [
        { id: 'r-imsak', nama: 'Persiapan Imsak', waktu: '04:00', pesan: 'Waktu Imsak sebentar lagi. Yuk segera selesaikan sahurmu!', aktif: true },
        { id: 'r-dhuha', nama: 'Sholat Dhuha', waktu: '08:00', pesan: 'Awali harimu dengan berkah Sholat Dhuha yuk!', aktif: true },
        { id: 'r-quran', nama: 'Tilawah Quran', waktu: '16:00', pesan: 'Sambil nunggu buka puasa, tilawah Quran dulu yuk.', aktif: true },
        { id: 'r-tarawih', nama: 'Tarawih', waktu: '19:30', pesan: 'Waktu isya telah tiba. Jangan lupa sholat tarawih berjamaah!', aktif: true },
    ]
};

export function useReminder() {
    const [dataPengingat, setDataPengingat, sudahDimuat] = usePenyimpananLokal<DataPengingat>(
        'data_pengingat_ramadhan',
        DATA_BAWAAN
    );

    const [statusIzin, setStatusIzin] = useState<NotificationPermission>('default');

    // useRef dipakai untuk mencatat waktu notifikasi terakhir agar tidak terkirim dua kali di menit yang sama
    const waktuTerakhirTerkirim = useRef<string>('');

    // Mengecek status izin saat komponen pertama kali dimuat
    useEffect(() => {
        if (cekDukunganNotifikasi()) {
            setStatusIzin(Notification.permission);
        }
    }, []);

    // Scheduler: Mengecek waktu setiap 30 detik
    useEffect(() => {
        if (!dataPengingat.aktifGlobal || statusIzin !== 'granted') return;

        const interval = setInterval(() => {
            const sekarang = new Date();
            // Format jam saat ini ke "HH:mm"
            const jamMenitSekarang = sekarang.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).replace('.', ':'); // Menangani perbedaan format locale beberapa browser

            // Cegah spam: kalau di menit ini sudah pernah ngirim, jangan kirim lagi
            if (waktuTerakhirTerkirim.current === jamMenitSekarang) return;

            // Cari pengingat yang waktunya sama persis dengan sekarang dan statusnya aktif
            const pengingatTerkini = dataPengingat.daftar.find(
                (p) => p.waktu === jamMenitSekarang && p.aktif
            );

            if (pengingatTerkini) {
                kirimNotifikasi(`Pengingat: ${pengingatTerkini.nama}`, pengingatTerkini.pesan);
                waktuTerakhirTerkirim.current = jamMenitSekarang; // Catat supaya gak dikirim ulang detik berikutnya
            }
        }, 30000); // Jalan setiap 30.000 ms (30 detik)

        return () => clearInterval(interval);
    }, [dataPengingat, statusIzin]);

    // Fungsi: Menyalakan/Mematikan Semua Pengingat
    const toggleAktifGlobal = async () => {
        // Kalau user mau menyalakan, minta izin dulu ke browser
        if (!dataPengingat.aktifGlobal && statusIzin !== 'granted') {
            const diizinkan = await mintaIzinNotifikasi();
            if (cekDukunganNotifikasi()) setStatusIzin(Notification.permission);

            if (!diizinkan) {
                alert('Kamu harus mengizinkan notifikasi di pengaturan browser untuk menggunakan fitur ini.');
                return;
            }
        }

        setDataPengingat(lama => ({ ...lama, aktifGlobal: !lama.aktifGlobal }));
    };

    // Fungsi: Menyalakan/Mematikan Pengingat Spesifik
    const togglePengingat = (id: string) => {
        setDataPengingat(lama => ({
            ...lama,
            daftar: lama.daftar.map(p => p.id === id ? { ...p, aktif: !p.aktif } : p)
        }));
    };

    // Fungsi: Mengubah Jam Pengingat
    const ubahWaktuPengingat = (id: string, waktuBaru: string) => {
        setDataPengingat(lama => ({
            ...lama,
            daftar: lama.daftar.map(p => p.id === id ? { ...p, waktu: waktuBaru } : p)
        }));
    };

    return {
        dataPengingat,
        statusIzin,
        toggleAktifGlobal,
        togglePengingat,
        ubahWaktuPengingat,
        sudahDimuat
    };
}