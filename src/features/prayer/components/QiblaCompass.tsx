// features/prayer/components/QiblaCompass.tsx
'use client';

import { Compass, AlertCircle } from 'lucide-react';
import { useQibla } from '../hooks/useQibla';

interface PropsKompas {
    latitude: number;
    longitude: number;
}

export default function KompasKiblat({ latitude, longitude }: PropsKompas) {
    // Panggil logika dari custom hook
    const {
        heading,
        rotasiKiblat,
        sudahPas,
        error,
        perluIzinSensor,
        mintaIzinSensor
    } = useQibla(latitude, longitude);

    // Tampilan jika terjadi error (Browser tidak mendukung)
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-4 text-center">
                <AlertCircle className="text-red-500 mb-2" size={32} />
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{error}</p>
            </div>
        );
    }

    // Tampilan jika butuh izin (Khusus iPhone)
    if (perluIzinSensor) {
        return (
            <div className="flex flex-col items-center justify-center py-6 text-center">
                <Compass className="text-emerald-500 mb-3 animate-pulse" size={40} />
                <p className="text-[13px] text-gray-600 dark:text-gray-400 mb-4 max-w-[200px]">
                    Tekan tombol di bawah untuk mengaktifkan sensor kompas.
                </p>
                <button onClick={mintaIzinSensor} className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold text-sm shadow-md active:scale-95 transition-all">
                    Aktifkan Kompas
                </button>
            </div>
        );
    }

    // Tampilan Utama Kompas
    return (
        <div className="flex flex-col items-center justify-center py-4">
            
            {/* Indikator "Pas" */}
            <div className={`mb-4 px-4 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase transition-colors duration-500 ${sudahPas ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-gray-100 dark:bg-zinc-800 text-gray-500'}`}>
                {sudahPas ? 'Arah Kiblat Tepat' : 'Putar HP Anda'}
            </div>

            {/* Piringan Kompas */}
            <div className="relative w-48 h-48 border-4 border-gray-100 dark:border-zinc-800 rounded-full flex items-center justify-center shadow-inner overflow-hidden bg-gray-50 dark:bg-zinc-950">
                
                {/* Garis Arah Kiblat Utama */}
                <div 
                    className="absolute w-full h-full transition-transform duration-300 ease-out"
                    style={{ transform: `rotate(${rotasiKiblat}deg)` }}
                >
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-20 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-6 bg-emerald-900 rounded flex items-center justify-center text-[10px] text-emerald-300 font-bold border border-emerald-500">
                        🕋
                    </div>
                </div>

                {/* Titik Tengah Kompas */}
                <div className="w-4 h-4 bg-gray-300 dark:bg-zinc-700 rounded-full border-2 border-white dark:border-zinc-900 z-10"></div>
            </div>

            {/* Derajat Heading */}
            <p className="mt-5 text-[12px] font-bold text-gray-400">
                Menunjuk: {heading !== null ? Math.round(heading) + '°' : 'Mencari sensor...'}
            </p>
        </div>
    );
}