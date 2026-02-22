// features/prayer/hooks/useQibla.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

// Koordinat Absolut Ka'bah (Makkah)
const KAABAH_LAT = 21.422487;
const KAABAH_LNG = 39.826206;

export function useQibla(latitude: any, longitude: any) {
    const [heading, setHeading] = useState<number | null>(null);
    const [qiblaAngle, setQiblaAngle] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [perluIzinSensor, setPerluIzinSensor] = useState(false);

    // Rumus Matematika Anti-Gagal
    const hitungSudutKiblat = useCallback((latRaw: any, lngRaw: any) => {
        // 1. Pastikan data yang masuk adalah Angka Asli (Desimal)
        let lat = parseFloat(latRaw);
        let lng = parseFloat(lngRaw);

        // 2. Jika API gagal/ngadat, paksa gunakan Sidoarjo sebagai cadangan aman
        if (isNaN(lat) || isNaN(lng)) {
            lat = -7.4478;
            lng = 112.7183;
        }

        // 3. Konversi ke Radian
        const toRad = (deg: number) => (deg * Math.PI) / 180;
        const toDeg = (rad: number) => (rad * 180) / Math.PI;

        const latK = toRad(KAABAH_LAT);
        const lngK = toRad(KAABAH_LNG);
        const latU = toRad(lat);
        const lngU = toRad(lng);

        // 4. Rumus Inti Arah Kiblat (Disederhanakan agar browser tidak error)
        const y = Math.sin(lngK - lngU);
        const x = Math.cos(latU) * Math.tan(latK) - Math.sin(latU) * Math.cos(lngK - lngU);

        let qibla = toDeg(Math.atan2(y, x));

        // 5. Pastikan derajatnya bulat antara 0 - 360
        return Math.round((qibla + 360) % 360);
    }, []);

    // Jalankan rumus setiap kali lokasi berubah
    useEffect(() => {
        if (latitude !== undefined && longitude !== undefined) {
            setQiblaAngle(hitungSudutKiblat(latitude, longitude));
        }
    }, [latitude, longitude, hitungSudutKiblat]);

    // Membaca Sensor Kompas HP
    useEffect(() => {
        let pakaiSensorAbsolut = false;

        const handleAbsolute = (event: DeviceOrientationEvent) => {
            if (event.alpha !== null) {
                pakaiSensorAbsolut = true;
                setHeading(360 - event.alpha);
            }
        };

        const handleOrientation = (event: DeviceOrientationEvent) => {
            if (typeof (event as any).webkitCompassHeading !== 'undefined') {
                setHeading((event as any).webkitCompassHeading);
                return;
            }
            if (pakaiSensorAbsolut) return;
            if (event.absolute && event.alpha !== null) {
                setHeading(360 - event.alpha);
            }
        };

        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            setPerluIzinSensor(true);
        } else {
            window.addEventListener('deviceorientationabsolute', handleAbsolute as EventListener, true);
            window.addEventListener('deviceorientation', handleOrientation, true);
        }

        return () => {
            window.removeEventListener('deviceorientationabsolute', handleAbsolute as EventListener, true);
            window.removeEventListener('deviceorientation', handleOrientation, true);
        };
    }, []);

    const mintaIzinSensor = async () => {
        try {
            const permissionState = await (DeviceOrientationEvent as any).requestPermission();
            if (permissionState === 'granted') {
                setPerluIzinSensor(false);
                window.addEventListener('deviceorientation', (event) => {
                    if (typeof (event as any).webkitCompassHeading !== 'undefined') {
                        setHeading((event as any).webkitCompassHeading);
                    }
                }, true);
            } else {
                setError('Izin sensor kompas ditolak.');
            }
        } catch (err) {
            setError('Browser tidak mendukung sensor kompas.');
        }
    };

    // Deteksi hijau "Arah Kiblat Tepat" (Toleransi 5 derajat)
    let selisihDerajat = heading !== null ? Math.abs(qiblaAngle - heading) % 360 : null;
    if (selisihDerajat !== null && selisihDerajat > 180) {
        selisihDerajat = 360 - selisihDerajat;
    }
    const sudahPas = selisihDerajat !== null && selisihDerajat <= 5;

    return { heading, qiblaAngle, sudahPas, error, perluIzinSensor, mintaIzinSensor };
}