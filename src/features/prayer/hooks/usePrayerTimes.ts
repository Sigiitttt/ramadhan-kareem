// features/prayer/hooks/usePrayerTimes.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ambilJadwalSholatBerdasarkanKota } from '../services/prayerApi';
import { cariSholatBerikutnya } from '../utils/prayerFormatter';
import { DataSholatAPI, InfoSholatBerikutnya } from '../types';

export function usePrayerTimes() {
    const [jadwal, setJadwal] = useState<DataSholatAPI | null>(null);
    const [sholatBerikutnya, setSholatBerikutnya] = useState<InfoSholatBerikutnya | null>(null);

    const [kotaAktif, setKotaAktif] = useState('Jakarta');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchJadwal = useCallback(async (namaKota: string) => {
        try {
            setLoading(true);
            setError(null);
            setKotaAktif(namaKota);

            localStorage.setItem('kota_sholat', namaKota);

            const data = await ambilJadwalSholatBerdasarkanKota(namaKota, new Date());
            setJadwal(data);
            setSholatBerikutnya(cariSholatBerikutnya(data.timings));
        } catch (err) {
            console.error("Gagal memuat jadwal:", err);
            setError(err instanceof Error ? err.message : "Gagal memuat jadwal");
            // Bisa tambahkan toast error di sini jika mau
        } finally {
            setLoading(false);
        }
    }, []);

    // Load Pertama Kali (Ambil dari Local Storage)
    useEffect(() => {
        const savedKota = localStorage.getItem('kota_sholat');
        fetchJadwal(savedKota || 'Jakarta');
    }, [fetchJadwal]);

    // Fungsi untuk di-trigger dari UI
    const ubahKota = (kotaBaru: string) => {
        // Cek agar user tidak menginput kosong
        if (kotaBaru && kotaBaru.trim() !== '') {
            fetchJadwal(kotaBaru.trim());
        }
    };

    return {
        jadwal,
        sholatBerikutnya,
        namaLokasi: kotaAktif,
        ubahKota,
        loading,
        error
    };
}