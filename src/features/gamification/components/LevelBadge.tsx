// features/gamification/components/LevelBadge.tsx
// features/gamification/components/LevelBadge.tsx
import { Shield, Sparkles, Moon } from 'lucide-react';
import { DataGamifikasi } from '../types';

interface PropsLevel {
    data: DataGamifikasi;
}

export default function LencanaLevel({ data }: PropsLevel) {
    const { levelSekarang, xpTotal, progressKeLevelSelanjutnya, faseSaatIni, hariKe } = data;

    // Warna dinamis berdasarkan Fase Ramadhan
    const warnaFase =
        faseSaatIni === 'Rahmat' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
            faseSaatIni === 'Maghfirah' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                faseSaatIni === 'Pembebasan' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    'bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-400';

    return (
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
            {/* Dekorasi Background */}
            <Sparkles className="absolute -top-4 -right-4 text-emerald-500/30 w-32 h-32" strokeWidth={1} />

            <div className="flex justify-between items-start relative z-10 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-inner">
                        <Shield className="text-white fill-white/20" size={28} />
                    </div>
                    <div>
                        <p className="text-emerald-100 text-sm font-medium uppercase tracking-wider">Level {levelSekarang.level}</p>
                        <h3 className="font-bold text-xl">{levelSekarang.nama}</h3>
                    </div>
                </div>

                {/* Indikator Fase Ramadhan */}
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${warnaFase}`}>
                    <Moon size={12} className="fill-current" />
                    <span>Fase {faseSaatIni}</span>
                </div>
            </div>

            <div className="relative z-10">
                <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-emerald-50">{xpTotal} XP</span>
                    <span className="text-emerald-100">{levelSekarang.xpMaksimal} XP</span>
                </div>

                {/* Progress Bar XP */}
                <div className="w-full bg-black/20 rounded-full h-3 backdrop-blur-sm overflow-hidden border border-white/10">
                    <div
                        className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(253,224,71,0.5)]"
                        style={{ width: `${progressKeLevelSelanjutnya}%` }}
                    />
                </div>
                <p className="text-xs text-emerald-200 mt-2 text-center">
                    Kumpulkan {levelSekarang.xpMaksimal - xpTotal} XP lagi untuk naik level!
                </p>
            </div>
        </div>
    );
}