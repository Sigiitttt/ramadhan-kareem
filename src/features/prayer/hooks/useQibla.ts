// features/prayer/hooks/useQibla.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

// Koordinat Presisi Makkah
const KAABAH_LAT = 21.422487;
const KAABAH_LNG = 39.826206;

export function useQibla(latitude: any, longitude: any) {
    const [heading, setHeading] = useState<number | null>(null);
    const [qiblaAngle, setQiblaAngle] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [perluIzinSensor, setPerluIzinSensor] = useState(false);

    const hitungSudutKiblat = useCallback((latRaw: any, lngRaw: any) => {
        let lat = Number(latRaw);
        let lng = Number(lngRaw);

        // SAFEGUARD 1: Jika data API kosong/error, paksakan kembali ke Sidoarjo
        if (isNaN(lat) || isNaN(lng)) {
            lat = -7.4478;
            lng = 112.7183;
        }

        // SAFEGUARD 2: Jika koordinat terbalik (Longitude masuk ke Latitude)
        // Latitude di dunia tidak mungkin lebih dari 90 atau kurang dari -90.
        if (lat > 90 || lat < -90) {
            const temp = lat;
            lat = lng;
            lng = temp;
        }

        const toRad = (deg: number) => (deg * Math.PI) / 180;
        const toDeg = (rad: number) => (rad * 180) / Math.PI;

        // RUMUS QIBLA UNIVERSAL (Spherical Trigonometry Standar Navigasi)
        const dLon = toRad(KAABAH_LNG - lng);
        const latUserRad = toRad(lat);
        const latKaabahRad = toRad(KAABAH_LAT);

        const y = Math.sin(dLon) * Math.cos(latKaabahRad);
        const x = Math.cos(latUserRad) * Math.sin(latKaabahRad) - Math.sin(latUserRad) * Math.cos(latKaabahRad) * Math.cos(dLon);
        
        let qibla = toDeg(Math.atan2(y, x));
        
        // SAFEGUARD 3: Pastikan sudut tidak pernah bernilai negatif (mengatasi bug browser)
        if (qibla < 0) {
            qibla += 360;
        }
        
        return Math.round(qibla); // Dibulatkan agar rapi
    }, []);

    useEffect(() => {
        if (latitude !== undefined && longitude !== undefined) {
            setQiblaAngle(hitungSudutKiblat(latitude, longitude));
        }
    }, [latitude, longitude, hitungSudutKiblat]);

    // Membaca Sensor HP
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

    let selisihDerajat = heading !== null ? Math.abs(qiblaAngle - heading) % 360 : null;
    if (selisihDerajat !== null && selisihDerajat > 180) {
        selisihDerajat = 360 - selisihDerajat;
    }
    const sudahPas = selisihDerajat !== null && selisihDerajat <= 5;

    return { heading, qiblaAngle, sudahPas, error, perluIzinSensor, mintaIzinSensor };
}