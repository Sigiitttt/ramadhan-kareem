// features/prayer/components/QiblaCompass.tsx
// features/prayer/components/QiblaCompass.tsx
'use client';

import { Navigation, Compass } from 'lucide-react';
import { useQibla } from '../hooks/useQibla';

export default function KompasKiblat() {
    const {
        derajatKiblat,
        arahHP,
        errorLokasi,
        sedangMemuat,
        izinSensor,
        mintaIzinSensor
    } = useQibla();

    if (sedangMemuat) {
        return <div className="p-4 text-center text-gray-500 animate-pulse">Mencari lokasi...</div>;
    }

    if (errorLokasi) {
        return <div className="p-4 text-center text-red-500 bg-red-50 rounded-xl">{errorLokasi}</div>;
    }

    // Jika butuh izin khusus (pengguna iPhone/iOS)
    if (izinSensor === 'prompt') {
        return (
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
                <Compass size={48} className="text-gray-400 mb-3" />
                <h3 className="font-bold mb-2">Akses Kompas Diperlukan</h3>
                <p className="text-sm text-gray-500 mb-4">Kami butuh izin sensor perangkat untuk menunjukkan arah kiblat secara *real-time*.</p>
                <button
                    onClick={mintaIzinSensor}
                    className="bg-emerald-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-emerald-700 transition-colors"
                >
                    Aktifkan Kompas
                </button>
            </div>
        );
    }

    // Putaran piringan kompas utama (menghadap utara)
    const putaranKompas = -arahHP;
    // Putaran jarum kiblat relatif terhadap kompas
    const putaranJarum = derajatKiblat || 0;

    // Cek apakah HP sudah menghadap presisi ke kiblat (toleransi 5 derajat)
    const menghadapKiblat = Math.abs(arahHP - (derajatKiblat || 0)) < 5 || Math.abs(arahHP - (derajatKiblat || 0)) > 355;

    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col items-center overflow-hidden">
            <div className="mb-6 text-center">
                <h3 className="font-bold text-lg mb-1">Arah Kiblat</h3>
                <p className="text-sm text-gray-500">
                    Kiblat berada pada {derajatKiblat?.toFixed(1)}° dari Utara
                </p>
            </div>

            <div className="relative w-60 h-60 flex items-center justify-center">
                {/* Piringan Kompas (Utara, Selatan, Timur, Barat) */}
                <div
                    className="absolute inset-0 rounded-full border-4 border-gray-100 dark:border-zinc-800 shadow-inner flex items-center justify-center transition-transform duration-300 ease-out"
                    style={{ transform: `rotate(${putaranKompas}deg)` }}
                >
                    <div className="absolute top-2 font-bold text-red-500">U</div>
                    <div className="absolute bottom-2 font-bold text-gray-400">S</div>
                    <div className="absolute right-4 font-bold text-gray-400">T</div>
                    <div className="absolute left-4 font-bold text-gray-400">B</div>

                    {/* Garis-garis kecil penunjuk derajat kompas */}
                    <div className="w-full h-full rounded-full border border-gray-200/50 dark:border-zinc-700/50"></div>

                    {/* Panah/Jarum Penunjuk Ka'bah */}
                    {derajatKiblat !== null && (
                        <div
                            className="absolute w-full h-full flex items-center justify-center transition-transform duration-300"
                            style={{ transform: `rotate(${putaranJarum}deg)` }}
                        >
                            <div className="w-1 h-1/2 bg-transparent absolute top-0 flex flex-col items-center">
                                <Navigation
                                    size={48}
                                    className={`-mt-6 ${menghadapKiblat ? 'text-emerald-500 fill-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]' : 'text-emerald-600 fill-emerald-600'}`}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Titik tengah kompas */}
                <div className="w-4 h-4 bg-gray-800 dark:bg-zinc-100 rounded-full z-10 border-2 border-white dark:border-zinc-950"></div>
            </div>

            <div className={`mt-8 px-4 py-2 rounded-full font-medium text-sm transition-colors ${menghadapKiblat ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-300'}`}>
                {menghadapKiblat ? 'Anda Menghadap Kiblat ✨' : 'Putar HP Anda'}
            </div>
        </div>
    );
}