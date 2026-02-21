// app/page.tsx
import Link from 'next/link';
import { Target, BookOpen, Compass, Fingerprint, BarChart2, Settings, ArrowRight, Moon, Star } from 'lucide-react';

export default function HalamanOnboarding() {
    const daftarFitur = [
        { ikon: Target, judul: 'Habit' },
        { ikon: BookOpen, judul: 'Al Quran' },
        { ikon: Compass, judul: 'Kiblat' },
        { ikon: Fingerprint, judul: 'Tasbih' },
        { ikon: BarChart2, judul: 'Statistik' },
        { ikon: Settings, judul: 'Setelan' },
    ];

    return (
        // LAYOUT AMAN: h-[100dvh] + overflow-hidden mengunci layar tanpa merusak sentuhan (touch)
        <div className="flex flex-col h-[100dvh] w-full bg-gradient-to-b from-[#0bc287] to-[#09ab76] dark:from-[#088c61] dark:to-[#056042] font-sans selection:bg-white/30 relative overflow-hidden">

            {/* --- 1. AMBIENT BACKGROUND --- */}
            <div
                className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M40 80c22.091 0 40-17.909 40-40S62.091 0 40 0 0 17.909 0 40s17.909 40 40 40zm0-2c20.987 0 38-17.013 38-38S60.987 2 40 2 2 19.013 2 40s17.013 38 38 38zm0-76c20.987 0 38 17.013 38 38S60.987 78 40 78 2 60.987 2 40 19.013 2 40 2zm0 2c19.882 0 36 16.118 36 36S59.882 76 40 76 4 59.882 4 40 20.118 4 40 4zm0 2c18.778 0 34 15.222 34 34S58.778 74 40 74 6 58.778 6 40 21.222 6 40 6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '120px 120px'
                }}
            ></div>

            <Star size={12} fill="currentColor" className="absolute top-[10%] left-[15%] text-yellow-200/60 animate-[pulse_3s_ease-in-out_infinite]" />
            <Star size={16} fill="currentColor" className="absolute top-[22%] right-[12%] text-white/40 animate-[pulse_4s_ease-in-out_infinite_delay-1000]" />
            <Star size={8} fill="currentColor" className="absolute top-[35%] left-[8%] text-yellow-100/50 animate-[pulse_2s_ease-in-out_infinite_delay-2000]" />

            <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-white/10 dark:bg-emerald-400/10 blur-[80px] rounded-full pointer-events-none"></div>

            {/* --- 2. HEADER TEXT (Tengah dinamis) --- */}
            {/* flex-1 akan membuat area teks ini otomatis menyesuaikan sisa layar yang ada */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-md mx-auto px-4 min-h-[160px]">

                <div className="mb-4 flex items-center justify-center bg-white/15 dark:bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/20 shadow-sm animate-in fade-in zoom-in duration-1000">
                    <Moon size={28} strokeWidth={1.5} className="text-yellow-100 drop-shadow-sm" />
                </div>

                <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150 px-2">
                    <h1 className="text-[34px] sm:text-[38px] leading-[1.1] font-black tracking-[0.15em] uppercase text-white drop-shadow-md mb-1">
                        Ramadhan
                    </h1>
                    <p className="text-[18px] sm:text-[20px] font-bold text-[#fef08a] dark:text-[#fde047] tracking-[0.35em] uppercase mb-3 drop-shadow-sm">
                        Kareem
                    </p>
                    <p className="text-[12.5px] font-medium text-white/90 max-w-[280px] mx-auto leading-relaxed drop-shadow-sm">
                        Sempurnakan ibadahmu, catat kebaikanmu, raih kemenangan yang hakiki.
                    </p>
                </div>
            </div>

            {/* --- 3. BOTTOM STACK (Menu Bawah) --- */}
            {/* shrink-0 memastikan area menu ini ukurannya tidak akan pernah terkompres/rusak */}
            <div className="w-full flex flex-col relative z-20 shrink-0 mt-auto">

                {/* SILUET MASJID (Dikembalikan ke proporsi natural) */}
                <div className="w-full text-white dark:text-[#09090b] -mb-[1px] animate-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <svg viewBox="0 0 1000 160" className="w-full h-auto drop-shadow-[0_-10px_20px_rgba(0,0,0,0.05)] dark:drop-shadow-[0_-10px_20px_rgba(0,0,0,0.3)] fill-current" preserveAspectRatio="xMidYMax meet">
                        <path d="M340,160 C340,60 660,60 660,160 Z" />
                        <path d="M150,160 C150,100 320,100 320,160 Z" />
                        <path d="M680,160 C680,100 850,100 850,160 Z" />

                        <rect x="80" y="40" width="16" height="120" rx="3" />
                        <polygon points="76,40 100,40 88,10" />
                        <circle cx="88" cy="5" r="4" />

                        <rect x="904" y="40" width="16" height="120" rx="3" />
                        <polygon points="900,40 924,40 912,10" />
                        <circle cx="912" cy="5" r="4" />

                        <rect x="496" y="20" width="8" height="40" rx="4" />
                        <path d="M495,10 A16,16 0 1,0 520,25 A14,14 0 1,1 502,0 Z" />

                        <g className="opacity-80 fill-[#fef08a] dark:fill-[#fbbf24] dark:opacity-60">
                            <rect x="465" y="110" width="16" height="30" rx="8" />
                            <rect x="519" y="110" width="16" height="30" rx="8" />
                            <rect x="220" y="125" width="12" height="20" rx="6" opacity="0.6" />
                            <rect x="250" y="125" width="12" height="20" rx="6" />
                            <rect x="738" y="125" width="12" height="20" rx="6" />
                            <rect x="768" y="125" width="12" height="20" rx="6" opacity="0.6" />
                        </g>
                        <rect x="0" y="155" width="1000" height="10" />
                    </svg>
                </div>

                {/* BOTTOM SHEET MENU */}
                {/* Padding dirapikan agar solid dan tidak kepanjangan di HP */}
                <div className="bg-white dark:bg-[#09090b] w-full pt-1 pb-6 md:pb-8 px-6 z-30 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] relative">
                    <div className="w-full max-w-md mx-auto flex flex-col items-center">

                        {/* Handle Laci */}
                        <div className="w-10 h-1 bg-gray-200 dark:bg-zinc-800 rounded-full mb-5 mt-1"></div>

                        {/* Grid Ikon Menu (Sedikit dikecilkan agar pas di layar pendek) */}
                        <div className="w-full grid grid-cols-3 gap-y-4 gap-x-4 mb-6">
                            {daftarFitur.map((fitur, idx) => {
                                const Ikon = fitur.ikon;
                                return (
                                    <div
                                        key={idx}
                                        style={{ animationFillMode: 'both', animationDelay: `${500 + (idx * 100)}ms` }}
                                        className="flex flex-col items-center gap-1.5 group cursor-pointer animate-in zoom-in-95 fade-in duration-500"
                                    >
                                        <div className="w-[58px] h-[58px] sm:w-[64px] sm:h-[64px] rounded-[1.2rem] bg-[#f0fdf9] dark:bg-[#0bc287]/15 flex items-center justify-center text-[#0bc287] transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1 group-hover:bg-[#0bc287] group-hover:text-white shadow-sm ring-1 ring-[#0bc287]/5 dark:ring-transparent group-hover:shadow-[0_8px_20px_rgba(11,194,135,0.25)]">
                                            <Ikon size={22} strokeWidth={2.2} className="transition-transform duration-300 group-hover:scale-110" />
                                        </div>
                                        <span className="text-[11px] sm:text-[12px] font-bold text-gray-700 dark:text-gray-200 group-hover:text-[#0bc287] dark:group-hover:text-[#0bc287] transition-colors">
                                            {fitur.judul}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA BUTTON */}
                        <Link
                            href="/dashboard"
                            className="group relative w-full flex items-center justify-center gap-3 py-3.5 rounded-[1.25rem] bg-[#0bc287] hover:bg-[#09ab76] dark:hover:bg-[#0ba373] text-white font-bold text-[15px] transition-all duration-300 active:scale-95 shadow-[0_5px_15px_rgba(11,194,135,0.2)] hover:shadow-[0_8px_25px_rgba(11,194,135,0.35)] overflow-hidden animate-in slide-in-from-bottom-6 fade-in duration-700 delay-[1000ms] fill-mode-both"
                        >
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] animate-[shimmer_2s_ease-out_1s] skew-x-12"></div>
                            <span className="relative z-10 tracking-wide">Mulai Perjalanan</span>
                            <ArrowRight size={18} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>

                    </div>
                </div>

            </div>

        </div>
    );
}