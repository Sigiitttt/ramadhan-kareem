// features/prayer/hooks/useQibla.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

// Koordinat presisi Ka'bah
const KAABAH_LAT = 21.422487;
const KAABAH_LNG = 39.826206;

export function useQibla(latitude: number, longitude: number) {
    const [heading, setHeading] = useState<number | null>(null);
    const [qiblaAngle, setQiblaAngle] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [perluIzinSensor, setPerluIzinSensor] = useState(false);

    // Rumus Trigonometri menghitung arah Ka'bah
    const hitungSudutKiblat = useCallback((lat: number, lng: number) => {
        const toRad = (deg: number) => (deg * Math.PI) / 180;
        const toDeg = (rad: number) => (rad * 180) / Math.PI;

        const phiK = toRad(KAABAH_LAT);
        const lambdaK = toRad(KAABAH_LNG);
        const phi = toRad(lat);
        const lambda = toRad(lng);

        const y = Math.sin(lambdaK - lambda);
        const x = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda);

        let qibla = toDeg(Math.atan2(y, x));
        return (qibla + 360) % 360;
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            setQiblaAngle(hitungSudutKiblat(latitude, longitude));
        }
    }, [latitude, longitude, hitungSudutKiblat]);

    // Membaca Sensor HP (Sudah diperbaiki dari bentrok sensor)
    useEffect(() => {
        let pakaiSensorAbsolut = false; // Flag penanda agar tidak ditimpa sensor abal-abal

        // Event handler untuk kompas sungguhan (Android Chrome modern)
        const handleAbsolute = (event: DeviceOrientationEvent) => {
            if (event.alpha !== null) {
                pakaiSensorAbsolut = true;
                setHeading(360 - event.alpha); // Konversi agar searah jarum jam (0 = Utara)
            }
        };

        // Event handler standar (iOS / Fallback Android)
        const handleOrientation = (event: DeviceOrientationEvent) => {
            // Prioritas 1: Sensor kompas khusus iPhone/iOS
            if (typeof (event as any).webkitCompassHeading !== 'undefined') {
                setHeading((event as any).webkitCompassHeading);
                return;
            }

            // Prioritas 2: Jika HP Android sudah pakai sensor absolut, abaikan event ini! (Ini kunci perbaikannya)
            if (pakaiSensorAbsolut) return;

            // Prioritas 3: Android lama yang menyatukan sensor di event biasa
            if (event.absolute && event.alpha !== null) {
                setHeading(360 - event.alpha);
            }
        };

        // Cek Izin khusus iPhone (iOS 13+)
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            setPerluIzinSensor(true);
        } else {
            // Pasang Listener di Android (Prioritaskan Absolute)
            window.addEventListener('deviceorientationabsolute', handleAbsolute as EventListener, true);
            window.addEventListener('deviceorientation', handleOrientation, true);
        }

        return () => {
            window.removeEventListener('deviceorientationabsolute', handleAbsolute as EventListener, true);
            window.removeEventListener('deviceorientation', handleOrientation, true);
        };
    }, []);

    // Izin khusus untuk iPhone
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

    // Hitung berapa derajat jarum harus diputar
    const rotasiKiblat = heading !== null ? qiblaAngle - heading : 0;

    // Perbaikan deteksi toleransi "Arah Kiblat Tepat" agar lebih akurat (5 derajat)
    let selisihDerajat = heading !== null ? Math.abs(rotasiKiblat) % 360 : null;
    if (selisihDerajat !== null && selisihDerajat > 180) {
        selisihDerajat = 360 - selisihDerajat;
    }
    const sudahPas = selisihDerajat !== null && selisihDerajat <= 5;

    return {
        heading,
        qiblaAngle,
        rotasiKiblat,
        sudahPas,
        error,
        perluIzinSensor,
        mintaIzinSensor
    };
}