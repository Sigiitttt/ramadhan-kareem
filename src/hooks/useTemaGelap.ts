'use client';

import { useState, useEffect } from 'react';

export function useDarkMode() {
    const [DarkMode, setDarkMode] = useState<boolean>(false);
    const [sudahDimuat, setSudahDimuat] = useState<boolean>(false);

    useEffect(() => {
        const temaSimpanan = localStorage.getItem('tema');
        const preferensiSistem = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (temaSimpanan === 'gelap' || (!temaSimpanan && preferensiSistem)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
        setSudahDimuat(true);
    }, []);

    const gantiTema = () => {
        setDarkMode((sebelumnya) => {
            const temaBaru = !sebelumnya;
            if (temaBaru) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('tema', 'gelap');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('tema', 'terang');
            }
            return temaBaru;
        });
    };

    return { DarkMode, gantiTema, sudahDimuat };
}