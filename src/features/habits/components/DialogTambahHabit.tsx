// features/habits/components/DialogTambahHabit.tsx
import { useState, useEffect } from "react";
import { X, Type, Tag, Sparkles } from "lucide-react";
import { KategoriHabit } from "../types";

interface PropsDialog {
    buka: boolean;
    tutupDialog: () => void;
    onSimpan: (nama: string, kategori: KategoriHabit) => void;
}

export default function DialogTambahHabit({ buka, tutupDialog, onSimpan }: PropsDialog) {
    const [namaBaru, setNamaBaru] = useState("");
    const [kategoriTerpilih, setKategoriTerpilih] = useState<KategoriHabit>("custom");

    // Efek untuk reset state saat dialog ditutup
    useEffect(() => {
        if (!buka) {
            // Kasih sedikit delay biar efek fade out modal selesai dulu baru reset
            const timer = setTimeout(() => {
                setNamaBaru("");
                setKategoriTerpilih("custom");
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [buka]);

    if (!buka) return null;

    const tanganiSimpan = () => {
        if (namaBaru.trim() === "") return;
        onSimpan(namaBaru, kategoriTerpilih);
        tutupDialog();
    };

    const disabled = namaBaru.trim() === "";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">

            {/* Area Klik untuk Menutup Dialog (Background Overlay) */}
            <div className="absolute inset-0" onClick={tutupDialog}></div>

            <div className="relative w-full max-w-[400px] rounded-[2rem] bg-white dark:bg-zinc-900 shadow-2xl border border-white/20 dark:border-zinc-800 p-7 animate-in zoom-in-95 duration-300 overflow-hidden">

                {/* Dekorasi Cahaya Latar */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-[40px] pointer-events-none"></div>

                {/* Tombol Tutup (Floating) */}
                <button
                    onClick={tutupDialog}
                    className="absolute top-4 right-4 z-50 flex items-center justify-center w-9 h-9 rounded-full 
  bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md 
  border border-gray-200 dark:border-zinc-700
  shadow-md hover:shadow-lg
  text-gray-600 dark:text-gray-300 
  hover:text-emerald-600 dark:hover:text-emerald-400
  transition-all duration-200 active:scale-95"
                    title="Tutup"
                >
                    <X size={18} strokeWidth={2.5} />
                </button>

                {/* Header Modal */}
                <div className="mb-7 relative z-10 pr-6">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-4">
                        <Sparkles size={24} strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-1.5">
                        Rutinitas Baru
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        Ibadah kecil yang konsisten lebih disukai daripada besar tapi terputus.
                    </p>
                </div>

                {/* Form Isi */}
                <div className="flex flex-col gap-6 relative z-10">

                    {/* Input: Nama Habit */}
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                            <Type size={16} className="text-emerald-500" />
                            Nama Ibadah / Kebiasaan
                        </label>
                        <div className="relative group">
                            <input
                                type="text"
                                value={namaBaru}
                                onChange={(e) => setNamaBaru(e.target.value)}
                                placeholder="Contoh: Baca Al-Waqi'ah"
                                autoFocus
                                maxLength={40}
                                className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/50 text-gray-800 dark:text-gray-100 text-[15px] font-medium placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-zinc-900 transition-all duration-300"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-medium text-gray-400 opacity-0 group-focus-within:opacity-100 transition-opacity">
                                {namaBaru.length}/40
                            </span>
                        </div>
                    </div>

                    {/* Select: Kategori */}
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                            <Tag size={16} className="text-emerald-500" />
                            Kategori Prioritas
                        </label>
                        <div className="relative">
                            <select
                                value={kategoriTerpilih}
                                onChange={(e) => setKategoriTerpilih(e.target.value as KategoriHabit)}
                                className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/50 text-gray-800 dark:text-gray-100 text-[15px] font-medium focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-zinc-900 transition-all duration-300 appearance-none cursor-pointer"
                            >
                                <option value="custom">Bebas (Custom)</option>
                                <option value="wajib">Fardhu / Wajib</option>
                                <option value="sunnah">Sunnah Muakkad</option>
                            </select>
                            {/* Custom Dropdown Arrow */}
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Tombol Simpan Utama */}
                    <button
                        onClick={tanganiSimpan}
                        disabled={disabled}
                        className={`group relative w-full mt-2 py-4 rounded-2xl font-bold text-[15px] transition-all duration-300 overflow-hidden ${disabled
                            ? "bg-gray-100 dark:bg-zinc-800 text-gray-400 cursor-not-allowed"
                            : "bg-gray-900 dark:bg-emerald-500 text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_20px_rgba(16,185,129,0.3)] hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                            }`}
                    >
                        {/* Animasi Kilauan (Shimmer) saat aktif */}
                        {!disabled && (
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></div>
                        )}
                        <span className="relative z-10">Mulai Rutinitas</span>
                    </button>

                </div>
            </div>
        </div>
    );
}