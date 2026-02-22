// features/tasbih/types.ts

export interface StateTasbih {
    hitungan: number;
    target: number;
    totalHariIni: number;
}

export interface PropsTasbihCounter {
    hitungan: number;
    target: number;
    onTekan: () => void;
}

export interface PropsTasbihHistory {
    totalHariIni: number;
}