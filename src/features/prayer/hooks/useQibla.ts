// features/prayer/hooks/useQibla.ts
// features/prayer/hooks/useQibla.ts
'use client';

import { useState, useEffect } from 'react';
import { useGeolocation, Lokasi } from '@/hooks/useGeolocation';

// Koordinat Ka'bah di Mekkah
const LINTANG_KABAH = 21.422487;
const BUJUR_KABAH = 39.826206;

// Rumus Trigonometri menghitung arah kiblat
const hitungArahKiblat = (lokasiUser: Lokasi): number => {
    const lintangUser = lokasiUser.latitude * (Math.PI / 180);
    const lintangKabah = LINTANG_KABAH * (Math.PI / 180);
    const selisihBujur = (BUJUR_KABAH - lokasiUser.longitude) * (Math.PI / 180);

    const y = Math.sin(selisihBujur);
    const x = Math.cos(lintangUser) * Math.tan(lintangKabah) - Math.sin(lintangUser) * Math.cos(selisihBujur);

    let derajat = Math.atan2(y, x) * (180 / Math.PI);
    return (derajat + 360) % 360; // Pastikan nilainya 0-360 derajat
};

export function useQibla() {
    const { lokasi, errorLokasi, sedangMemuat } = useGeolocation();
    const [derajatKiblat, setDerajatKiblat] = useState<number | null>(null);
    const [arahHP, setArahHP] = useState<number>(0);
    const [izinSensor, setIzinSensor] = useState<'granted' | 'denied' | 'prompt'>('prompt');

    // Menghitung titik Kiblat saat lokasi user didapatkan
    useEffect(() => {
        if (lokasi) {
            setDerajatKiblat(hitungArahKiblat(lokasi));
        }
    }, [lokasi]);

    // Fungsi untuk meminta izin sensor kompas (terutama untuk iOS)
    const mintaIzinSensor = async () => {
        // @ts-ignore - Karena DeviceOrientationEvent.requestPermission itu spesifik iOS 13+
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                // @ts-ignore
                const izin = await DeviceOrientationEvent.requestPermission();
                setIzinSensor(izin);
            } catch (error) {
                console.error('Gagal meminta izin sensor:', error);
            }
        } else {
            // Android atau web biasa otomatis granted
            setIzinSensor('granted');
        }
    };

    // Membaca pergerakan kompas HP
    useEffect(() => {
        if (izinSensor !== 'granted') return;

        const tanganiOrientasi = (event: DeviceOrientationEvent) => {
            let arah = 0;

            // @ts-ignore - webkitCompassHeading khusus iOS
            if (event.webkitCompassHeading) {
                // @ts-ignore
                arah = event.webkitCompassHeading;
            } else if (event.alpha !== null) {
                // Android menggunakan alpha (0 = Utara)
                // Alpha berjalan terbalik (berlawanan jarum jam), jadi kita kalibrasi:
                arah = 360 - event.alpha;
            }

            setArahHP(arah);
        };

        window.addEventListener('deviceorientationabsolute', tanganiOrientasi as EventListener);
        window.addEventListener('deviceorientation', tanganiOrientasi as EventListener);

        return () => {
            window.removeEventListener('deviceorientationabsolute', tanganiOrientasi as EventListener);
            window.removeEventListener('deviceorientation', tanganiOrientasi as EventListener);
        };
    }, [izinSensor]);

    return {
        derajatKiblat,
        arahHP,
        lokasi,
        errorLokasi,
        sedangMemuat,
        izinSensor,
        mintaIzinSensor
    };
}