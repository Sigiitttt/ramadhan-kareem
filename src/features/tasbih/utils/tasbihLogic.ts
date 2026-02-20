// features/tasbih/utils/tasbihLogic.ts

// Helper untuk getaran (Haptic feedback) biar terasa seperti tasbih asli
export const getarkanTasbih = () => {
    if (typeof window !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(50); // Getar super singkat 50ms
    }
};

// Hitung siklus per 33 putaran (standar dzikir Subhanallah, Alhamdulillah, Allahu Akbar)
export const hitungProgressSiklus = (hitungan: number, target: number = 33): number => {
    return hitungan % target;
};