// features/prayer/components/PrayerCard.tsx
// features/prayer/components/PrayerCard.tsx
import { WaktuSholat } from '../types';
import { MAP_NAMA_SHOLAT } from '../utils/prayerFormatter';

interface PropsPrayerCard {
    jadwal: WaktuSholat;
    sholatBerikutnya: string | undefined;
}

export default function PrayerCard({ jadwal, sholatBerikutnya }: PropsPrayerCard) {
    // Hanya ambil waktu yang penting
    const urutan = ['Imsak', 'Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;

    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-2 shadow-sm">
            <div className="flex flex-col">
                {urutan.map((kunci, index) => {
                    const namaLokal = MAP_NAMA_SHOLAT[kunci];
                    const adalahBerikutnya = sholatBerikutnya === namaLokal;

                    return (
                        <div
                            key={kunci}
                            className={`flex justify-between items-center p-4 rounded-xl transition-colors ${adalahBerikutnya
                                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50'
                                    : index !== urutan.length - 1 ? 'border-b border-gray-100 dark:border-zinc-800/50' : ''
                                }`}
                        >
                            <span className={`font-medium ${adalahBerikutnya ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-gray-600 dark:text-gray-300'}`}>
                                {namaLokal}
                            </span>
                            <span className={`text-lg font-bold tabular-nums ${adalahBerikutnya ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-800 dark:text-gray-100'}`}>
                                {jadwal[kunci]}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}