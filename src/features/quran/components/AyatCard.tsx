// features/quran/components/AyatCard.tsx
import { useState, useEffect, useRef } from 'react';
import { Bookmark, BookmarkCheck, Copy, Check } from 'lucide-react';
import { Ayat } from '../types';

interface PropsAyat {
    ayat: Ayat;
    isDitandai?: boolean;
    onTandai?: () => void;
}

export default function KartuAyat({ ayat, isDitandai, onTandai }: PropsAyat) {
    // State untuk Animasi Scroll & Fitur Copy
    const [isVisible, setIsVisible] = useState(false);
    const [disalin, setDisalin] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Logic Animasi Reveal on Scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Cukup jalankan animasi sekali saat pertama kali terlihat
                }
            },
            { threshold: 0.1, rootMargin: "50px" } // Memicu animasi sedikit sebelum kartu masuk penuh
        );

        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    // Logic Copy Text
    const tanganiSalin = () => {
        const teks = `${ayat.teksArab}\n\n${ayat.teksIndonesia}\n(QS. Surat Ini: ${ayat.nomorAyat})`;
        navigator.clipboard.writeText(teks);
        setDisalin(true);
        setTimeout(() => setDisalin(false), 2000);
    };

    return (
        <div
            ref={cardRef}
            id={`ayat-${ayat.nomorAyat}`} // ID penting untuk auto-scroll dari Progress
            className={`group relative overflow-hidden bg-white dark:bg-zinc-900 rounded-[2rem] p-6 md:p-8 
                transform transition-all duration-[800ms] ease-out hover:-translate-y-1
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                ${isDitandai
                    ? 'border-2 border-emerald-400 dark:border-emerald-500 shadow-[0_10px_40px_rgba(16,185,129,0.15)] bg-emerald-50/40 dark:bg-emerald-950/20 z-10'
                    : 'border border-gray-100 dark:border-zinc-800 hover:border-emerald-200 dark:hover:border-emerald-900/60 shadow-sm hover:shadow-xl z-0'
                }`}
        >
            {/* Dekorasi Cahaya Latar (Hanya saat ditandai) */}
            {isDitandai && (
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-[50px] pointer-events-none transition-opacity duration-1000"></div>
            )}

            {/* HEADER AYAT: Nomor & Kumpulan Tombol */}
            <div className="flex justify-between items-center mb-8 relative z-10">

                {/* Ornamen Nomor Ayat (Islamic Star Geometry) */}
                <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 bg-emerald-50 dark:bg-emerald-900/30 rounded-[14px] rotate-45 transform origin-center transition-all duration-700 group-hover:rotate-90 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800/40 shadow-inner"></div>
                    <div className="absolute inset-0 border border-emerald-200 dark:border-emerald-700/60 rounded-[14px] rotate-45 transform origin-center scale-75 transition-transform duration-500 group-hover:scale-[0.85]"></div>
                    <span className="relative z-10 text-[15px] font-black text-emerald-700 dark:text-emerald-400">
                        {ayat.nomorAyat}
                    </span>
                </div>

                {/* Container Tombol Aksi */}
                <div className="flex items-center gap-2">

                    {/* Tombol Copy (Salin) */}
                    <button
                        onClick={tanganiSalin}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 bg-gray-50 hover:bg-emerald-50 dark:bg-zinc-800/80 dark:hover:bg-emerald-900/40 transition-all duration-300 active:scale-90"
                        title="Salin Ayat"
                    >
                        {disalin ? <Check size={16} className="text-emerald-500" strokeWidth={3} /> : <Copy size={16} />}
                    </button>

                    {/* Tombol Bookmark (Tandai) */}
                    <button
                        onClick={onTandai}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 active:scale-95 shadow-sm ${isDitandai
                                ? 'bg-emerald-500 text-white shadow-emerald-500/40 hover:bg-emerald-600 hover:shadow-lg'
                                : 'bg-white dark:bg-zinc-800/90 text-gray-500 hover:text-emerald-600 dark:text-gray-400 border border-gray-100 dark:border-zinc-700 hover:border-emerald-200 dark:hover:border-emerald-800'
                            }`}
                    >
                        {isDitandai ? (
                            <>
                                <BookmarkCheck size={16} className="fill-white/30" strokeWidth={2.5} />
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
            </div>

            {/* TEKS ARAB (Spasilega, Anti-Lelah) */}
            <div className="text-right pt-2 pb-7 relative z-10">
                <p
                    className="text-[20px] md:text-[32px] leading-[2.3] font-normal text-gray-800 dark:text-gray-100 drop-shadow-sm selection:bg-emerald-200 dark:selection:bg-emerald-900/60"
                    dir="rtl"
                    style={{ fontFamily: '"LPMQ Isep Misbah", "KFGQPC Uthman Taha Naskh", "Amiri", serif' }}
                >
                    {ayat.teksArab}
                </p>
            </div>

            {/* PEMISAH (Subtle Divider) */}
            <div className="h-px w-full bg-gradient-to-r from-emerald-50 via-gray-200 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 my-4"></div>

            {/* TERJEMAHAN & LATIN */}
            <div className="flex items-stretch gap-4 mt-6 relative z-10">

                {/* Garis Aksen Kiri (Lebih halus dan melengkung) */}
                <div className={`w-1.5 rounded-full transition-colors duration-500 ${isDitandai ? 'bg-gradient-to-b from-emerald-400 to-teal-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-gray-200 dark:bg-zinc-800 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/60'
                    }`}></div>

                <div className="flex flex-col gap-2.5 py-1.5 pr-2">
                    {/* Teks Latin (Gradasi Hijau) */}
                    <p className="text-[12px] font-black bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-500 bg-clip-text text-transparent tracking-[0.15em] uppercase">
                        {ayat.teksLatin}
                    </p>

                    {/* Teks Terjemahan (Abu-abu elegan, ukuran pas) */}
                    <p className="text-[14.5px] md:text-[15.5px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                        {ayat.teksIndonesia}
                    </p>
                </div>
            </div>

        </div>
    );
}