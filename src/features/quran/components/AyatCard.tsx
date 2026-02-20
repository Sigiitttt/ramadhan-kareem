// features/quran/components/AyatCard.tsx
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Ayat } from '../types';

interface PropsAyat {
    ayat: Ayat;
    isDitandai?: boolean;
    onTandai?: () => void;
}

export default function KartuAyat({ ayat, isDitandai, onTandai }: PropsAyat) {
    return (
        <div
            id={`ayat-${ayat.nomorAyat}`} // <-- ID penting untuk auto-scroll
            className={`group relative overflow-hidden bg-white dark:bg-zinc-900 rounded-3xl p-6 transition-all duration-500 ${isDitandai
                    ? 'border-2 border-emerald-400 dark:border-emerald-600 shadow-[0_0_30px_rgba(16,185,129,0.15)] bg-emerald-50/30 dark:bg-emerald-950/20'
                    : 'border border-gray-100 dark:border-zinc-800 hover:border-emerald-200 dark:hover:border-emerald-900/50 shadow-sm hover:shadow-md'
                }`}
        >
            {/* Dekorasi Background Halus saat ditandai */}
            {isDitandai && (
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
            )}

            {/* Header Ayat (Nomor & Tombol Tandai) */}
            <div className="flex justify-between items-center mb-6 relative z-10">

                {/* Ornamen Nomor Ayat (Islamic Geometric Style) */}
                <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
                    {/* Latar belakang putar */}
                    <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl rotate-45 transform origin-center transition-transform group-hover:rotate-90 duration-700"></div>
                    {/* Garis dalam putar */}
                    <div className="absolute inset-0 border border-emerald-300 dark:border-emerald-700/60 rounded-xl rotate-45 transform origin-center scale-75 transition-transform group-hover:scale-90 duration-500"></div>
                    {/* Nomor */}
                    <span className="relative z-10 text-sm font-black text-emerald-700 dark:text-emerald-400">
                        {ayat.nomorAyat}
                    </span>
                </div>

                {/* Tombol Bookmark */}
                <button
                    onClick={onTandai}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 active:scale-95 ${isDitandai
                            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                            : 'bg-gray-50 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 dark:bg-zinc-800/80 dark:text-gray-400 dark:hover:bg-zinc-800'
                        }`}
                >
                    {isDitandai ? (
                        <>
                            <BookmarkCheck size={16} className="fill-white/20" />
                            <span>Tersimpan</span>
                        </>
                    ) : (
                        <>
                            <Bookmark size={16} className="group-hover:text-emerald-500 transition-colors" />
                            <span>Tandai</span>
                        </>
                    )}
                </button>
            </div>

            {/* Teks Arab */}
            <div className="text-right pt-2 pb-6 relative z-10">
                <p
                    className="text-[32px] leading-[2.6] font-bold text-gray-800 dark:text-gray-100 drop-shadow-sm selection:bg-emerald-200 dark:selection:bg-emerald-900"
                    dir="rtl"
                    style={{ fontFamily: '"LPMQ Isep Misbah", "KFGQPC Uthman Taha Naskh", "Amiri", serif' }}
                >
                    {ayat.teksArab}
                </p>
            </div>

            {/* Pemisah (Divider) */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-zinc-800 to-transparent my-2"></div>

            {/* Terjemahan & Latin (Blockquote Style) */}
            <div className="flex items-stretch gap-4 mt-5 relative z-10">
                {/* Garis Aksen Kiri */}
                <div className={`w-1.5 rounded-full transition-colors duration-300 ${isDitandai ? 'bg-emerald-400' : 'bg-emerald-200 dark:bg-emerald-800/60'}`}></div>

                <div className="flex flex-col gap-1.5 py-1">
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase text-[11px]">
                        {ayat.teksLatin}
                    </p>
                    <p className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                        "{ayat.teksIndonesia}"
                    </p>
                </div>
            </div>

        </div>
    );
}