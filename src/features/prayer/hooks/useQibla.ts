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

    // Rumus Trigonometri untuk menghitung sudut Kiblat dari koordinat user
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

    // Hitung ulang sudut Kiblat jika koordinat kota berubah
    useEffect(() => {
        if (latitude && longitude) {
            setQiblaAngle(hitungSudutKiblat(latitude, longitude));
        }
    }, [latitude, longitude, hitungSudutKiblat]);

    // Membaca Sensor Orientasi HP
    useEffect(() => {
        const handleOrientation = (event: DeviceOrientationEvent) => {
            let alpha = event.alpha;
            // Khusus iOS menggunakan webkitCompassHeading
            if ((event as any).webkitCompassHeading) {
                alpha = (event as any).webkitCompassHeading;
                setHeading(alpha);
            } else if (alpha !== null) {
                // Konversi alpha Android ke kompas (0 = Utara)
                setHeading(360 - alpha);
            }
        };

        // Cek apakah perangkat butuh izin manual (khusus iPhone/iOS 13+)
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            setPerluIzinSensor(true);
        } else {
            // Android bisa langsung baca sensor
            window.addEventListener('deviceorientationabsolute', handleOrientation, true);
            window.addEventListener('deviceorientation', handleOrientation, true);
        }

        return () => {
            window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
            window.removeEventListener('deviceorientation', handleOrientation, true);
        };
    }, []);

    // Fungsi untuk meminta izin sensor (Khusus iPhone)
    const mintaIzinSensor = async () => {
        try {
            const permissionState = await (DeviceOrientationEvent as any).requestPermission();
            if (permissionState === 'granted') {
                setPerluIzinSensor(false);
                window.addEventListener('deviceorientation', (event) => {
                    if ((event as any).webkitCompassHeading) {
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

    // Kalkulasi rotasi jarum dan deteksi posisi pas
    const rotasiKiblat = heading !== null ? qiblaAngle - heading : 0;
    const sudahPas = heading !== null && (Math.abs(rotasiKiblat) < 5 || Math.abs(rotasiKiblat) > 355);

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