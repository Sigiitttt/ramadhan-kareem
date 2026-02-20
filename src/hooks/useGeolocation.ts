// hooks/useGeolocation.ts
// hooks/useGeolocation.ts
'use client';

import { useState, useEffect } from 'react';

export interface Lokasi {
    latitude: number;
    longitude: number;
}

export function useGeolocation() {
    const [lokasi, setLokasi] = useState<Lokasi | null>(null);
    const [errorLokasi, setErrorLokasi] = useState<string | null>(null);
    const [sedangMemuat, setSedangMemuat] = useState(true);

    useEffect(() => {
        if (!('geolocation' in navigator)) {
            setErrorLokasi('Browser tidak mendukung akses lokasi');
            setSedangMemuat(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (posisi) => {
                setLokasi({
                    latitude: posisi.coords.latitude,
                    longitude: posisi.coords.longitude,
                });
                setSedangMemuat(false);
            },
            (err) => {
                setErrorLokasi('Akses lokasi ditolak atau gagal didapatkan');
                setSedangMemuat(false);
            },
            { enableHighAccuracy: true } // Minta akurasi tinggi untuk kompas
        );
    }, []);

    return { lokasi, errorLokasi, sedangMemuat };
}