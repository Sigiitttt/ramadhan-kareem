// features/prayer/hooks/usePrayerTimes.ts
'use client';

import { useState, useEffect } from 'react';
import { DataSholatAPI, InfoSholatBerikutnya } from '../types';
import { ambilJadwalSholat } from '../services/prayerApi';
import { cariSholatBerikutnya } from '../utils/prayerFormatter';

export function usePrayerTimes() {
    const [jadwal, setJadwal] = useState<DataSholatAPI | null>(null);
    const [sholatBerikutnya, setSholatBerikutnya] = useState<InfoSholatBerikutnya | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async (lat: number, lng: number) => {
            try {
                setLoading(true);
                const data = await ambilJadwalSholat(lat, lng, new Date());
                setJadwal(data);
                setSholatBerikutnya(cariSholatBerikutnya(data.timings));
            } catch (err) {
                setError('Gagal memuat jadwal sholat');
            } finally {
                setLoading(false);
            }
        };

        // Ambil lokasi user
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    fetchData(pos.coords.latitude, pos.coords.longitude);
                },
                (err) => {
                    console.warn('Lokasi ditolak, menggunakan default Jakarta', err);
                    // Default: Jakarta (Monas)
                    fetchData(-6.1751, 106.8272);
                }
            );
        } else {
            // Default: Jakarta
            fetchData(-6.1751, 106.8272);
        }
    }, []);

    return { jadwal, sholatBerikutnya, loading, error };
}