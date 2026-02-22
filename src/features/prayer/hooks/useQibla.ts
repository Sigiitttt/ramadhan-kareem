// features/prayer/hooks/useQibla.ts
'use client';

import { useState, useEffect } from 'react';

export function useQibla(latitude: any, longitude: any) {
    const [heading, setHeading] = useState<number | null>(null);
    const [qiblaAngle, setQiblaAngle] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [perluIzinSensor, setPerluIzinSensor] = useState(false);
    
    // State untuk UI
    const [kordinatAktif, setKordinatAktif] = useState({ lat: 0, lng: 0 });
    const [loadingKiblat, setLoadingKiblat] = useState(true);

    // KUNCI PERBAIKAN: Mengambil data langsung dari API Aladhan Qibla Direction
    useEffect(() => {
        let lat = parseFloat(latitude);
        let lng = parseFloat(longitude);

        // SATPAM ANTI-NYASAR KE AFRIKA: 
        // Indonesia itu ada di Longitude 95 sampai 141. 
        // Kalau Aladhan ngasih data Longitude 7.78 (Nigeria), kita tolak dan paksa ke Sidoarjo!
        if (isNaN(lat) || isNaN(lng) || lng < 90 || lng > 150) {
            console.warn("API Aladhan memberikan koordinat di luar Indonesia. Memaksa ke Sidoarjo.");
            lat = -7.4478; 
            lng = 112.7183;
        }

        setKordinatAktif({ lat, lng });

        const fetchKiblatAPI = async () => {
            setLoadingKiblat(true);
            try {
                // Sesuai dokumentasi Aladhan: GET /qibla/{latitude}/{longitude}
                const res = await fetch(`https://api.aladhan.com/v1/qibla/${lat}/${lng}`);
                const response = await res.json();
                
                if (response.code === 200 && response.data) {
                    // Mengambil data "direction" dari API
                    setQiblaAngle(Math.round(response.data.direction));
                } else {
                    setQiblaAngle(294); // Fallback default Barat Laut
                }
            } catch (err) {
                console.error("Gagal mengambil data dari API Qibla Aladhan:", err);
                setQiblaAngle(294);
            } finally {
                setLoadingKiblat(false);
            }
        };

        fetchKiblatAPI();
    }, [latitude, longitude]);

    // Membaca Sensor Kompas HP (Tetap menggunakan sensor hardware HP)
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