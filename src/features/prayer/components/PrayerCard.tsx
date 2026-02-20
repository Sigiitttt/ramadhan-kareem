// features/prayer/components/PrayerCard.tsx
import { Moon, Sunrise, Sun, SunDim, Sunset, MoonStar, BellRing } from 'lucide-react';
import { WaktuSholat } from '../types';
import { MAP_NAMA_SHOLAT } from '../utils/prayerFormatter';

interface PropsPrayerCard {
    jadwal: WaktuSholat;
    sholatBerikutnya: string | undefined;
}

// Mapping Ikon untuk masing-masing waktu sholat
const IKON_SHOLAT: Record<string, React.ElementType> = {
    Imsak: Moon,
    Fajr: Sunrise,
    Dhuhr: Sun,
    Asr: SunDim,
    Maghrib: Sunset,
    Isha: MoonStar
};

export default function PrayerCard({ jadwal, sholatBerikutnya }: PropsPrayerCard) {
    // Hanya ambil waktu yang penting
    const urutan = ['Imsak', 'Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;

    return (
        // Hapus border & bg luar karena sudah dibungkus oleh parent (di page.tsx)
        <div className="flex flex-col gap-1.5 py-1">
            {urutan.map((kunci) => {
                const namaLokal = MAP_NAMA_SHOLAT[kunci];
                const adalahBerikutnya = sholatBerikutnya === namaLokal;
                const Ikon = IKON_SHOLAT[kunci];

                return (
                    <div
                        key={kunci}
                        className={`group relative flex justify-between items-center px-3 py-3.5 md:p-4 rounded-[1.5rem] transition-all duration-500 overflow-hidden ${adalahBerikutnya
                                ? 'bg-gradient-to-r from-teal-500/10 to-emerald-500/5 dark:from-teal-900/30 dark:to-emerald-900/10 shadow-[inset_0_0_20px_rgba(20,184,166,0.05)] border border-teal-500/20 dark:border-teal-400/20'
                                : 'hover:bg-gray-50/80 dark:hover:bg-zinc-800/50 border border-transparent'
                            }`}
                    >
                        {/* Indikator Garis Menyala (Hanya untuk sholat berikutnya) */}
                        {adalahBerikutnya && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-gradient-to-b from-teal-400 to-emerald-500 rounded-r-full shadow-[0_0_12px_rgba(20,184,166,0.6)] animate-pulse"></div>
                        )}

                        {/* Kiri: Ikon & Nama Sholat */}
                        <div className="flex items-center gap-4 pl-3">
                            <div className={`w-11 h-11 rounded-[14px] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${adalahBerikutnya
                                    ? 'bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/60 dark:to-emerald-900/60 text-teal-600 dark:text-teal-400 shadow-inner'
                                    : 'bg-gray-100 dark:bg-zinc-800/80 text-gray-500 dark:text-gray-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/40 group-hover:text-emerald-500'
                                }`}>
                                <Ikon size={22} strokeWidth={adalahBerikutnya ? 2.5 : 2} />
                            </div>

                            <div className="flex flex-col justify-center">
                                <span className={`text-[16px] leading-tight ${adalahBerikutnya ? 'font-black text-teal-700 dark:text-teal-400' : 'font-bold text-gray-700 dark:text-gray-200 group-hover:text-emerald-600 transition-colors'}`}>
                                    {namaLokal}
                                </span>

                                {/* Label "Akan Datang" muncul kecil di bawah nama sholat */}
                                {adalahBerikutnya && (
                                    <span className="text-[10px] font-bold text-teal-500 uppercase tracking-widest flex items-center gap-1 mt-0.5">
                                        <BellRing size={10} className="animate-pulse" /> Akan Datang
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Kanan: Jam Sholat */}
                        <div className="pr-3 text-right">
                            <span className={`text-xl md:text-2xl tabular-nums tracking-tight ${adalahBerikutnya
                                    ? 'font-black text-transparent bg-clip-text bg-gradient-to-b from-teal-600 to-emerald-500 dark:from-teal-400 dark:to-emerald-400'
                                    : 'font-bold text-gray-800 dark:text-gray-100'
                                }`}>
                                {jadwal[kunci]}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}