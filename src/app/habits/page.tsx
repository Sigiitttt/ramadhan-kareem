// app/habits/page.tsx
'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useHabits } from '@/features/habits/hooks/useHabits';
import { dapatkanTanggalHariIni } from '@/utils/tanggal';
import DaftarHabit from '@/features/habits/components/DaftarHabit';
import DialogTambahHabit from '@/features/habits/components/DialogTambahHabit';

export default function HalamanHabit() {
    const { daftarHabit, tambahHabit, hapusHabit, toggleHabit, sudahDimuat } = useHabits();
    const [bukaDialog, setBukaDialog] = useState(false);

    const tanggalHariIni = dapatkanTanggalHariIni();

    if (!sudahDimuat) return <div className="p-4 text-center">Memuat data ibadah...</div>;

    const habitSelesaiHariIni = daftarHabit.filter(h => h.riwayatSelesai.includes(tanggalHariIni)).length;
    const totalHabit = daftarHabit.length;
    const persentaseSelesai = totalHabit > 0 ? Math.round((habitSelesaiHariIni / totalHabit) * 100) : 0;

    return (
        <div className="flex flex-col gap-5">
            {/* Header Info Harian */}
            <div className="bg-emerald-600 text-white rounded-2xl p-5 shadow-md">
                <h2 className="text-xl font-bold mb-1">Ibadah Hari Ini</h2>
                <p className="text-emerald-100 text-sm mb-4">
                    Kamu sudah menyelesaikan {habitSelesaiHariIni} dari {totalHabit} target.
                </p>

                {/* Progress Bar Sederhana */}
                <div className="w-full bg-emerald-800/50 rounded-full h-2.5">
                    <div
                        className="bg-white h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${persentaseSelesai}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-2">
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">Daftar Tracker</h3>
                <button
                    onClick={() => setBukaDialog(true)}
                    className="flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1.5 rounded-full"
                >
                    <Plus size={16} /> Tambah
                </button>
            </div>

            {/* Render List Komponen */}
            <DaftarHabit
                daftarHabit={daftarHabit}
                tanggalAktif={tanggalHariIni}
                onToggle={toggleHabit}
                onHapus={hapusHabit}
            />

            {/* Render Dialog Modal */}
            <DialogTambahHabit
                buka={bukaDialog}
                tutupDialog={() => setBukaDialog(false)}
                onSimpan={tambahHabit}
            />
        </div>
    );
}