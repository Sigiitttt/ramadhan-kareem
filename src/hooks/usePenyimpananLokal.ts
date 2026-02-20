'use client';

import { useState, useEffect } from 'react';

export function usePenyimpananLokal<T>(kunci: string, nilaiAwal: T) {
    // Simpan data di state React biar UI bisa re-render otomatis kalau data berubah
    const [data, setData] = useState<T>(nilaiAwal);
    const [sudahDimuat, setSudahDimuat] = useState<boolean>(false);

    // Ambil data dari local storage cuma pas pertama kali komponen dimuat (client-side)
    useEffect(() => {
        try {
            const dataTersimpan = window.localStorage.getItem(kunci);
            if (dataTersimpan) {
                setData(JSON.parse(dataTersimpan));
            }
        } catch (error) {
            console.error(`Gagal membaca ${kunci} dari penyimpanan lokal:`, error);
        }
        setSudahDimuat(true);
    }, [kunci]);

    // Fungsi khusus buat nyimpen data ke state sekaligus ke local storage
    const simpanData = (nilaiBaru: T | ((nilaiLama: T) => T)) => {
        try {
            // Cek apakah nilaiBaru itu fungsi (kayak di setState biasa) atau nilai langsung
            const nilaiYangAkanDisimpan =
                nilaiBaru instanceof Function ? nilaiBaru(data) : nilaiBaru;

            // Update state React
            setData(nilaiYangAkanDisimpan);

            // Simpan ke local storage browser
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(kunci, JSON.stringify(nilaiYangAkanDisimpan));
            }
        } catch (error) {
            console.error(`Gagal menyimpan ${kunci} ke penyimpanan lokal:`, error);
        }
    };

    // Kita return datanya, fungsi simpannya, dan status loadingnya
    return [data, simpanData, sudahDimuat] as const;
}