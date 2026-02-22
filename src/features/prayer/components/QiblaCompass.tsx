// features/prayer/components/QiblaCompass.tsx
'use client';

import { Compass, AlertCircle, Info, Loader2 } from 'lucide-react';
import { useQibla } from '../hooks/useQibla';

interface PropsKompas {
    kota: string; // <-- Diubah jadi string kota
}

const getArahMataAngin = (derajat: number) => {
    if (derajat >= 337.5 || derajat < 22.5) return 'Utara';
    if (derajat >= 22.5 && derajat < 67.5) return 'Timur Laut';
    if (derajat >= 67.5 && derajat < 112.5) return 'Timur';
    if (derajat >= 112.5 && derajat < 157.5) return 'Tenggara';
    if (derajat >= 157.5 && derajat < 202.5) return 'Selatan';
    if (derajat >= 202.5 && derajat < 247.5) return 'Barat Daya';
    if (derajat >= 247.5 && derajat < 292.5) return 'Barat';
    if (derajat >= 292.5 && derajat < 337.5) return 'Barat Laut';
    return '';
};

export default function KompasKiblat({ kota }: PropsKompas) {
    // Memasukkan nama kota ke dalam otak kompas
    const { heading, qiblaAngle, sudahPas, error, perluIzinSensor, mintaIzinSensor, kordinatAktif, loadingKiblat } = useQibla(kota);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-4 text-center">
                <AlertCircle className="text-red-500 mb-2" size={32} />
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{error}</p>
            </div>
        );
    }

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

    return (
        <div className="flex flex-col items-center justify-center py-2 relative">
            
            {/* Overlay Loading API Aladhan */}
            {loadingKiblat && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-3xl">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                </div>
            )}

            <div className="flex items-start gap-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-2xl mb-5 border border-blue-100 dark:border-blue-800/30 max-w-xs">
                <Info size={16} className="text-blue-500 mt-0.5 shrink-0" />
                <p className="text-[10.5px] text-blue-800 dark:text-blue-200 leading-relaxed font-medium">
                    <strong>Fakta:</strong> Kiblat di Indonesia bukan murni menghadap Barat (270°), melainkan agak serong ke kanan menuju <strong>Barat Laut (±294°)</strong>.
                </p>
            </div>

            <div className={`mb-5 px-4 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase transition-colors duration-500 ${sudahPas ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-gray-100 dark:bg-zinc-800 text-gray-500'}`}>
                {sudahPas ? 'Arah Kiblat Tepat' : 'Putar HP Anda'}
            </div>

            <div className="relative w-56 h-56 flex items-center justify-center">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[16px] border-l-transparent border-r-transparent border-b-emerald-500 z-20"></div>

                <div 
                    className="absolute w-52 h-52 border-4 border-gray-100 dark:border-zinc-800 rounded-full shadow-inner overflow-hidden bg-white dark:bg-zinc-950 transition-transform duration-300 ease-out z-10"
                    style={{ transform: `rotate(${heading !== null ? -heading : 0}deg)` }}
                >
                    <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[14px] font-black text-red-500">U</span>
                    <span className="absolute top-1/2 right-2 -translate-y-1/2 text-[12px] font-bold text-gray-400">T</span>
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[12px] font-bold text-gray-400">S</span>
                    <span className="absolute top-1/2 left-2 -translate-y-1/2 text-[12px] font-bold text-gray-400">B</span>

                    <div className="absolute inset-0" style={{ transform: `rotate(270deg)` }}>
                        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[1.5px] h-[32%] border-l-2 border-dashed border-gray-300 dark:border-zinc-700 opacity-60"></div>
                    </div>

                    <div className="absolute inset-0" style={{ transform: `rotate(${qiblaAngle}deg)` }}>
                        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-1.5 h-[40%] bg-gradient-to-t from-transparent to-emerald-400 opacity-50 rounded-full"></div>
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">🕋</div>
                    </div>
                </div>

                <div className="w-4 h-4 bg-gray-200 dark:bg-zinc-700 rounded-full border-2 border-white dark:border-zinc-900 z-20 shadow-sm"></div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-1.5 w-full">
                <div className="flex justify-between w-full max-w-[200px] text-[11px] font-bold">
                    <span className="text-gray-400">Kiblat ({kota}):</span>
                    <span className="text-emerald-500">{qiblaAngle}° ({getArahMataAngin(qiblaAngle)})</span>
                </div>
                <div className="flex justify-between w-full max-w-[200px] text-[10px] font-medium text-gray-500 border-t border-gray-100 dark:border-zinc-800 pt-1.5 mt-0.5">
                    <span>Arah HP Saat Ini:</span>
                    <span>{heading !== null ? `${Math.round(heading)}° (${getArahMataAngin(heading)})` : '--'}</span>
                </div>
                
                <div className="flex justify-between w-full max-w-[200px] text-[9px] font-medium text-gray-400 border-t border-gray-100 dark:border-zinc-800 pt-1.5 mt-0.5">
                    <span>Koordinat Ditemukan:</span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                        {kordinatAktif.lat.toFixed(2)}, {kordinatAktif.lng.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}