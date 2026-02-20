// features/quran/hooks/useDetailSurat.ts
'use client';

import { useState, useEffect } from 'react';
import { DetailSurat } from '../types';
import { ambilDetailSurat } from '../services/equranApi';

export function useDetailSurat(nomor: number) {
    const [detail, setDetail] = useState<DetailSurat | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!nomor) return;

        const fetchDetail = async () => {
            try {
                setLoading(true);
                const data = await ambilDetailSurat(nomor);
                setDetail(data);
            } catch (err) {
                setError('Gagal memuat data surat.');
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [nomor]);

    return { detail, loading, error };
}