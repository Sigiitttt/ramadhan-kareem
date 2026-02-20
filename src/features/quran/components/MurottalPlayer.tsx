// features/quran/components/MurottalPlayer.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Mic2, Activity } from 'lucide-react';

const DAFTAR_QARI: Record<string, string> = {
    '01': 'Abdullah Al-Juhany',
    '02': 'Abdul Muhsin Al-Qasim',
    '03': 'Abdurrahman As-Sudais',
    '04': 'Ibrahim Al-Dawsari',
    '05': 'Misyari Rasyid Al-Afasi'
};

interface PropsMurottal {
    audioFull: Record<string, string>;
}

export default function PemutarMurottal({ audioFull }: PropsMurottal) {
    const [pilihanQari, setPilihanQari] = useState<string>('05');
    const [sedangMain, setSedangMain] = useState(false);
    const [progress, setProgress] = useState(0);
    const [durasi, setDurasi] = useState(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Format detik ke "MM:SS"
    const formatWaktu = (waktu: number) => {
        if (isNaN(waktu)) return "00:00";
        const menit = Math.floor(waktu / 60);
        const detik = Math.floor(waktu % 60);
        return `${menit.toString().padStart(2, '0')}:${detik.toString().padStart(2, '0')}`;
    };

    // Handle Play / Pause
    const togglePlayPause = () => {
        if (!audioRef.current) return;

        if (sedangMain) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setSedangMain(!sedangMain);
    };

    // Handle perubahan slider
    const handleGeserSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;
        const waktuBaru = Number(e.target.value);
        audioRef.current.currentTime = waktuBaru;
        setProgress(waktuBaru);
    };

    // Sinkronisasi state saat audio berjalan
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateWaktu = () => setProgress(audio.currentTime);
        const updateDurasi = () => setDurasi(audio.duration);
        const audioSelesai = () => setSedangMain(false);

        audio.addEventListener('timeupdate', updateWaktu);
        audio.addEventListener('loadedmetadata', updateDurasi);
        audio.addEventListener('ended', audioSelesai);

        return () => {
            audio.removeEventListener('timeupdate', updateWaktu);
            audio.removeEventListener('loadedmetadata', updateDurasi);
            audio.removeEventListener('ended', audioSelesai);
        };
    }, [pilihanQari]); // Jalankan ulang effect jika qari berubah

    // Otomatis play saat Qari diubah (jika sebelumnya sedang play)
    useEffect(() => {
        if (sedangMain && audioRef.current) {
            audioRef.current.play().catch(() => setSedangMain(false));
        }
    }, [pilihanQari]);

    if (!audioFull || Object.keys(audioFull).length === 0) return null;

    return (
        <div className="relative overflow-hidden bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm">

            {/* Latar Belakang Dekoratif */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Elemen Audio Asli (DISEMBUNYIKAN) */}
            <audio
                ref={audioRef}
                src={audioFull[pilihanQari]}
                preload="metadata"
                className="hidden"
            />

            {/* Bagian Atas: Pilihan Qari & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/40 dark:to-emerald-800/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
                        <Mic2 size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm">Murottal Full</h3>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-500">
                            {sedangMain ? (
                                <>
                                    <Activity size={12} className="animate-pulse" /> Sedang diputar
                                </>
                            ) : 'Siap diputar'}
                        </div>
                    </div>
                </div>

                <select
                    value={pilihanQari}
                    onChange={(e) => setPilihanQari(e.target.value)}
                    className="bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer py-2 px-3 shadow-sm appearance-none pr-8 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_10px_center] bg-no-repeat"
                >
                    {Object.entries(DAFTAR_QARI).map(([kode, nama]) => (
                        audioFull[kode] && (
                            <option key={kode} value={kode}>{nama}</option>
                        )
                    ))}
                </select>
            </div>

            {/* Bagian Bawah: Kontrol Pemutar & Slider */}
            <div className="flex items-center gap-4 relative z-10">

                {/* Tombol Play/Pause Raksasa */}
                <button
                    onClick={togglePlayPause}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-lg transition-all duration-300 ${sedangMain
                            ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
                            : 'bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-105 hover:shadow-emerald-500/30'
                        }`}
                >
                    {sedangMain ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-1" />}
                </button>

                <div className="flex flex-col w-full gap-1">
                    {/* Custom Range Slider */}
                    <input
                        type="range"
                        min="0"
                        max={durasi || 100}
                        value={progress}
                        onChange={handleGeserSlider}
                        className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />

                    {/* Indikator Waktu */}
                    <div className="flex justify-between w-full text-[10px] font-medium text-gray-500 dark:text-gray-400 font-mono mt-1">
                        <span>{formatWaktu(progress)}</span>
                        <span>{formatWaktu(durasi)}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}