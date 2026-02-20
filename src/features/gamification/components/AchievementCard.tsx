// features/gamification/components/AchievementCard.tsx
// features/gamification/components/AchievementCard.tsx
import { Medal, Award, Trophy, BookOpen, Lock } from 'lucide-react';
import { Lencana } from '../types';

interface PropsPencapaian {
    daftarLencana: Lencana[];
}

export default function KartuPencapaian({ daftarLencana }: PropsPencapaian) {
    // Mapping string nama ikon ke komponen Lucide
    const dapatkanIkon = (namaIkon: string, terbuka: boolean) => {
        const props = {
            size: 24,
            className: terbuka ? 'text-yellow-500 fill-yellow-500/20' : 'text-gray-400'
        };

        switch (namaIkon) {
            case 'Medal': return <Medal {...props} />;
            case 'Award': return <Award {...props} />;
            case 'Trophy': return <Trophy {...props} />;
            case 'BookOpen': return <BookOpen {...props} />;
            default: return <Award {...props} />;
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Koleksi Lencana</h3>

            <div className="grid grid-cols-2 gap-3">
                {daftarLencana.map((lencana) => (
                    <div
                        key={lencana.id}
                        className={`flex flex-col items-center text-center p-3 rounded-xl border relative overflow-hidden transition-all ${lencana.terbuka
                            ? 'bg-yellow-50/50 border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-900/50'
                            : 'bg-gray-50 border-gray-100 dark:bg-zinc-900 dark:border-zinc-800 grayscale opacity-60'
                            }`}
                    >
                        {!lencana.terbuka && (
                            <div className="absolute top-2 right-2 text-gray-300 dark:text-gray-600">
                                <Lock size={12} />
                            </div>
                        )}

                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${lencana.terbuka ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-gray-200 dark:bg-zinc-800'
                            }`}>
                            {dapatkanIkon(lencana.ikon, lencana.terbuka)}
                        </div>

                        <span className={`text-xs font-bold mb-0.5 ${lencana.terbuka ? 'text-gray-800 dark:text-gray-200' : 'text-gray-500'}`}>
                            {lencana.nama}
                        </span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                            {lencana.deskripsi}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}