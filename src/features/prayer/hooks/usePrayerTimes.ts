// features/prayer/hooks/usePrayerTimes.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { DataSholatAPI, InfoSholatBerikutnya } from '../types';
import { ambilJadwalSholat } from '../services/prayerApi';
import { cariSholatBerikutnya } from '../utils/prayerFormatter';

export function usePrayerTimes() {
    const [jadwal, setJadwal] = useState<DataSholatAPI | null>(null);
    const [sholatBerikutnya, setSholatBerikutnya] = useState<InfoSholatBerikutnya | null>(null);
    const [namaLokasi, setNamaLokasi] = useState<string>('Jakarta');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Gunakan useCallback agar tidak me-render ulang terus-menerus
    const fetchData = useCallback(async (lat: number, lng: number, fallbackNamaKota: string) => {
        try {
            setLoading(true);

            // 1. Ambil Nama Kota (Reverse Geocoding)
            try {
                const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=id`);
                const locData = await res.json();
                setNamaLokasi(locData.city || locData.locality || fallbackNamaKota);
            } catch (e) {
                setNamaLokasi(fallbackNamaKota);
            }

            // 2. Ambil Jadwal Sholat dari API
            const data = await ambilJadwalSholat(lat, lng, new Date());
            setJadwal(data);
            setSholatBerikutnya(cariSholatBerikutnya(data.timings));
        } catch (err) {
            setError('Gagal memuat jadwal sholat');
        } finally {
            setLoading(false);
        }
    }, []);

    // LOAD PERTAMA KALI: Langsung pakai Jakarta tanpa minta izin GPS
    useEffect(() => {
        // Koordinat Monas, Jakarta
        fetchData(-6.1751, 106.8272, 'Jakarta');
    }, [fetchData]);

    // FUNGSI MANUAL: Dipanggil saat user klik tombol "Sesuaikan Posisi"
    const deteksiLokasi = () => {
        if ('geolocation' in navigator) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    fetchData(pos.coords.latitude, pos.coords.longitude, 'Lokasi Saat Ini');
                },
                (err) => {
                    console.warn('Lokasi ditolak/gagal', err);
                    alert('Gagal mendapatkan lokasi. Pastikan GPS aktif dan browser diizinkan mengakses lokasi.');
                    setLoading(false);
                }
            );
        } else {
            alert('Browser Anda tidak mendukung fitur lokasi.');
        }
    };

    // Export deteksiLokasi agar bisa diklik dari UI
    return { jadwal, sholatBerikutnya, namaLokasi, loading, error, deteksiLokasi };
}