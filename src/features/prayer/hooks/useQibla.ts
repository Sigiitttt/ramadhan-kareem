// features/prayer/hooks/useQibla.ts
'use client';

import { useState, useEffect } from 'react';

export function useQibla(kota: string) {
    const [heading, setHeading] = useState<number | null>(null);
    const [qiblaAngle, setQiblaAngle] = useState<number>(294);
    const [error, setError] = useState<string | null>(null);
    const [perluIzinSensor, setPerluIzinSensor] = useState(false);

    const [kordinatAktif, setKordinatAktif] = useState({ lat: -7.45, lng: 112.72 });
    const [loadingKiblat, setLoadingKiblat] = useState(true);

    useEffect(() => {
        if (!kota) return;

        const fetchKiblatAPI = async () => {
            setLoadingKiblat(true);
            try {
                // 1. Cari Koordinat dari Kota yang Diinput
                const resKota = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(kota)}&country=Indonesia&method=20`);
                const dataKota = await resKota.json();

                let lat = -7.4478; // Default: Sidoarjo
                let lng = 112.7183;

                if (dataKota.code === 200 && dataKota.data && dataKota.data.meta) {
                    lat = parseFloat(dataKota.data.meta.latitude);
                    lng = parseFloat(dataKota.data.meta.longitude);
                }

                // SATPAM: Kalau aneh-aneh (Luar Indonesia), tolak!
                if (isNaN(lat) || isNaN(lng) || lng < 90 || lng > 150) {
                    lat = -7.4478;
                    lng = 112.7183;
                }

                setKordinatAktif({ lat, lng });

                // 2. Tembak Qibla Direction API dari Aladhan
                const resQibla = await fetch(`https://api.aladhan.com/v1/qibla/${lat}/${lng}`);
                const dataQibla = await resQibla.json();

                if (dataQibla.code === 200 && dataQibla.data) {
                    setQiblaAngle(Math.round(dataQibla.data.direction));
                }
            } catch (err) {
                console.error("Gagal memuat API Kiblat Aladhan:", err);
            } finally {
                setLoadingKiblat(false);
            }
        };

        fetchKiblatAPI();
    }, [kota]);

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

    let selisihDerajat = heading !== null ? Math.abs(qiblaAngle - heading) % 360 : null;
    if (selisihDerajat !== null && selisihDerajat > 180) {
        selisihDerajat = 360 - selisihDerajat;
    }
    const sudahPas = selisihDerajat !== null && selisihDerajat <= 5;

    return { heading, qiblaAngle, sudahPas, error, perluIzinSensor, mintaIzinSensor, kordinatAktif, loadingKiblat };
}