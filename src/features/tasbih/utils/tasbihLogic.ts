// features/tasbih/utils/tasbihLogic.ts

export const hitungPersentaseProgress = (hitungan: number, target: number): number => {
    if (target <= 0) return 0;
    return Math.min((hitungan / target) * 100, 100);
};

export const getarkanHP = (pola: number | number[]) => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(pola);
    }
};

// Fungsi untuk mendapatkan tanggal format YYYY-MM-DD
export const getTanggalHariIni = (): string => {
    return new Date().toISOString().split('T')[0];
};