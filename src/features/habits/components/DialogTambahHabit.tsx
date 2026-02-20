import { useState } from 'react';
import { X } from 'lucide-react';
import { KategoriHabit } from '../types';

interface PropsDialog {
    buka: boolean;
    tutupDialog: () => void;
    onSimpan: (nama: string, kategori: KategoriHabit) => void;
}

export default function DialogTambahHabit({ buka, tutupDialog, onSimpan }: PropsDialog) {
    const [namaBaru, setNamaBaru] = useState('');
    const [kategoriTerpilih, setKategoriTerpilih] = useState<KategoriHabit>('custom');

    if (!buka) return null;

    const tanganiSimpan = () => {
        if (namaBaru.trim() === '') return;
        onSimpan(namaBaru, kategoriTerpilih);
        setNamaBaru('');
        tutupDialog();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-2xl p-5 shadow-xl animate-in fade-in zoom-in-95">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="font-bold text-lg">Tambah Habit Baru</h3>
                    <button onClick={tutupDialog} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Nama Habit</label>
                        <input
                            type="text"
                            value={namaBaru}
                            onChange={(e) => setNamaBaru(e.target.value)}
                            placeholder="Contoh: Sholat Dhuha"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Kategori</label>
                        <select
                            value={kategoriTerpilih}
                            onChange={(e) => setKategoriTerpilih(e.target.value as KategoriHabit)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="custom">Bebas (Custom)</option>
                            <option value="wajib">Wajib</option>
                            <option value="sunnah">Sunnah</option>
                        </select>
                    </div>

                    <button
                        onClick={tanganiSimpan}
                        className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg transition-colors"
                    >
                        Simpan Habit
                    </button>
                </div>
            </div>
        </div>
    );
}