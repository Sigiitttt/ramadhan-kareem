// features/quran/hooks/useDaftarSurat.ts
'use client';

import { useState, useEffect } from 'react';
import { SuratSingkat } from '../types';
import { ambilDaftarSurat } from '../services/equranApi';

export function useDaftarSurat() {
    const [daftarSurat, setDaftarSurat] = useState<SuratSingkat[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [kataKunci, setKataKunci] = useState('');

    useEffect(() => {
        const fetchSurat = async () => {
            try {
                setLoading(true);
                const data = await ambilDaftarSurat();
                setDaftarSurat(data);
            } catch (err) {
                setError('Terjadi kesalahan saat memuat Al-Quran.');
            } finally {
                setLoading(false);
            }
        };

        fetchSurat();
    }, []);

    // Fitur pencarian surat yang langsung di-handle di hook
    const suratDifilter = daftarSurat.filter(surat =>
        surat.namaLatin.toLowerCase().includes(kataKunci.toLowerCase()) ||
        surat.arti.toLowerCase().includes(kataKunci.toLowerCase())
    );

    return {
        daftarSurat: suratDifilter,
        loading,
        error,
        kataKunci,
        setKataKunci
    };
}