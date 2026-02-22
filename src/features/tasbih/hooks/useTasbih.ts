// features/tasbih/hooks/useTasbih.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { getarkanHP, getTanggalHariIni } from '../utils/tasbihLogic';

export function useTasbih() {
    const [hitungan, setHitungan] = useState(0);
    const [target, setTarget] = useState(33);
    const [totalHariIni, setTotalHariIni] = useState(0);

    // Load data & Cek Tanggal saat pertama kali dibuka
    useEffect(() => {
        const simpananHitungan = localStorage.getItem('tasbih_hitungan');
        const simpananTarget = localStorage.getItem('tasbih_target');
        const simpananTotal = localStorage.getItem('tasbih_total');
        const simpananTanggal = localStorage.getItem('tasbih_tanggal');
        
        const hariIni = getTanggalHariIni();

        if (simpananHitungan) setHitungan(parseInt(simpananHitungan, 10));
        if (simpananTarget) setTarget(parseInt(simpananTarget, 10));

        // Jika tanggal di memori SAMA dengan hari ini, load totalnya.
        // Jika beda (sudah ganti hari), reset total ke 0.
        if (simpananTanggal === hariIni && simpananTotal) {
            setTotalHariIni(parseInt(simpananTotal, 10));
        } else {
            setTotalHariIni(0);
            localStorage.setItem('tasbih_tanggal', hariIni);
            localStorage.setItem('tasbih_total', '0');
        }
    }, []);

    // Auto-save setiap kali ada perubahan angka
    useEffect(() => {
        localStorage.setItem('tasbih_hitungan', hitungan.toString());
        localStorage.setItem('tasbih_target', target.toString());
        localStorage.setItem('tasbih_total', totalHariIni.toString());
    }, [hitungan, target, totalHariIni]);

    // Fungsi Utama Tekan Tasbih
    const tekanTasbih = useCallback(() => {
        setHitungan((prev) => {
            // Kalau sudah mentok target, jangan ditambah lagi
            if (target > 0 && prev >= target) return prev;

            const angkaBaru = prev + 1;
            
            // Tambah juga total hari ini
            setTotalHariIni((t) => t + 1);
            
            // Haptic Feedback
            if (target > 0 && angkaBaru === target) {
                getarkanHP([100, 50, 100]); // Getar ganda: Selesai!
            } else {
                getarkanHP(40); // Getar pendek: Klik biasa
            }

            return angkaBaru;
        });
    }, [target]);

    const resetTasbih = useCallback(() => {
        setHitungan(0);
        getarkanHP(100);
    }, []);

    const ubahTarget = (targetBaru: number) => {
        setTarget(targetBaru);
        if (hitungan >= targetBaru && targetBaru !== 0) {
            setHitungan(0);
        }
    };

    return { hitungan, target, totalHariIni, tekanTasbih, resetTasbih, ubahTarget };
}