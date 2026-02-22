// features/prayer/hooks/useQibla.ts
'use client';

import { useState, useEffect } from 'react';

// Koordinat Absolut Ka'bah (Makkah)
const KAABAH_LAT = 21.422487;
const KAABAH_LNG = 39.826206;

// 1. KAMUS KOTA OFFLINE (Super Cepat, 100% Anti-Gagal)
const KAMUS_KOTA: Record<string, { lat: number; lng: number }> = {
    'jakarta': { lat: -6.2088, lng: 106.8456 },
    'surabaya': { lat: -7.2504, lng: 112.7688 },
    'bandung': { lat: -6.9175, lng: 107.6191 },
    'yogyakarta': { lat: -7.7956, lng: 110.3695 },
    'semarang': { lat: -6.9932, lng: 110.4203 },
    'medan': { lat: 3.5952, lng: 98.6722 },
    'makassar': { lat: -5.1477, lng: 119.4327 },
    'aceh': { lat: 5.5483, lng: 95.3238 },
    'banda aceh': { lat: 5.5483, lng: 95.3238 },
    'mataram': { lat: -8.5833, lng: 116.1167 },
    'pontianak': { lat: -0.0227, lng: 109.3333 },
    'jayapura': { lat: -2.5337, lng: 140.7181 },
    'sidoarjo': { lat: -7.4478, lng: 112.7183 },
};

export function useQibla(kota: string) {
    const [heading, setHeading] = useState<number | null>(null);
    const [qiblaAngle, setQiblaAngle] = useState<number>(294);
    const [error, setError] = useState<string | null>(null);
    const [perluIzinSensor, setPerluIzinSensor] = useState(false);
    
    const [kordinatAktif, setKordinatAktif] = useState({ lat: -7.45, lng: 112.72 });
    const [loadingKiblat, setLoadingKiblat] = useState(true);

    // 2. RUMUS NAVIGASI MANDIRI (Tanpa API)
    const hitungKiblat = (lat: number, lng: number) => {
        const toRad = (deg: number) => (deg * Math.PI) / 180;
        const toDeg = (rad: number) => (rad * 180) / Math.PI;

        const y = Math.sin(toRad(KAABAH_LNG - lng));
        const x = Math.cos(toRad(lat)) * Math.tan(toRad(KAABAH_LAT)) - Math.sin(toRad(lat)) * Math.cos(toRad(KAABAH_LNG - lng));
        
        return Math.round((toDeg(Math.atan2(y, x)) + 360) % 360);
    };

    useEffect(() => {
        if (!kota) return;

        const cariKoordinat = async () => {
            setLoadingKiblat(true);
            let lat = -7.4478; 
            let lng = 112.7183;

            const kotaLower = kota.toLowerCase().trim();

            // Skenario A: Cari di Kamus Offline (Instan)
            if (KAMUS_KOTA[kotaLower]) {
                lat = KAMUS_KOTA[kotaLower].lat;
                lng = KAMUS_KOTA[kotaLower].lng;
            } else {
                // Skenario B: Tanya OpenStreetMap jika kota tidak ada di kamus
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(kota)},Indonesia&format=json&limit=1`);
                    const data = await res.json();
                    
                    if (data && data.length > 0) {
                        lat = parseFloat(data[0].lat);
                        lng = parseFloat(data[0].lon); // OSM menggunakan 'lon'
                    }
                } catch (err) {
                    console.error("Gagal melacak satelit OpenStreetMap:", err);
                }
            }

            // Satpam: Pastikan lokasinya masuk akal (Di Indonesia)
            if (isNaN(lat) || isNaN(lng) || lng < 90 || lng > 150) {
                lat = -7.4478;
                lng = 112.7183;
            }

            // Simpan Koordinat & Hitung Derajat
            setKordinatAktif({ lat, lng });
            setQiblaAngle(hitungKiblat(lat, lng));
            setLoadingKiblat(false);
        };

        cariKoordinat();
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