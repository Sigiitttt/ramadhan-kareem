// features/habits/hooks/useHabits.ts
// features/habits/hooks/useHabits.ts
'use client';

import { usePenyimpananLokal } from '@/hooks/usePenyimpananLokal';
import { DataHabit, KategoriHabit } from '../types';
import { dapatkanTanggalHariIni } from '@/utils/tanggal';

// Data bawaan pas aplikasi pertama kali dibuka
const HABIT_BAWAAN: DataHabit[] = [
    { id: 'h-puasa', nama: 'Puasa', kategori: 'wajib', riwayatSelesai: [], dibuatPada: dapatkanTanggalHariIni() },
    { id: 'h-tarawih', nama: 'Tarawih', kategori: 'sunnah', riwayatSelesai: [], dibuatPada: dapatkanTanggalHariIni() },
    { id: 'h-tahajud', nama: 'Tahajud', kategori: 'sunnah', riwayatSelesai: [], dibuatPada: dapatkanTanggalHariIni() },
    { id: 'h-quran', nama: 'Baca Quran', kategori: 'sunnah', riwayatSelesai: [], dibuatPada: dapatkanTanggalHariIni() },
    { id: 'h-dzikir', nama: 'Dzikir', kategori: 'sunnah', riwayatSelesai: [], dibuatPada: dapatkanTanggalHariIni() },
    { id: 'h-sedekah', nama: 'Sedekah', kategori: 'sunnah', riwayatSelesai: [], dibuatPada: dapatkanTanggalHariIni() },
];

export function useHabits() {
    // Panggil hook penyimpanan lokal yang udah kita bikin di awal
    const [daftarHabit, setDaftarHabit, sudahDimuat] = usePenyimpananLokal<DataHabit[]>(
        'data_habit_ramadhan',
        HABIT_BAWAAN
    );

    // Fungsi 1: Tambah Habit Baru (Custom)
    const tambahHabit = (nama: string, kategori: KategoriHabit) => {
        const habitBaru: DataHabit = {
            // Bikin ID unik pakai waktu sekarang + random dikit biar aman
            id: `h-custom-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            nama,
            kategori,
            riwayatSelesai: [],
            dibuatPada: dapatkanTanggalHariIni(),
        };

        setDaftarHabit((dataLama) => [...dataLama, habitBaru]);
    };

    // Fungsi 2: Hapus Habit
    const hapusHabit = (id: string) => {
        setDaftarHabit((dataLama) => dataLama.filter((habit) => habit.id !== id));
    };

    // Fungsi 3: Toggle Habit (Centang / Batal Centang)
    const toggleHabit = (id: string, tanggal: string) => {
        setDaftarHabit((dataLama) =>
            dataLama.map((habit) => {
                // Cari habit yang lagi diklik
                if (habit.id === id) {
                    const udahSelesaiBelum = habit.riwayatSelesai.includes(tanggal);

                    return {
                        ...habit,
                        // Kalau udah dicentang, kita hapus tanggalnya dari array (batalin)
                        // Kalau belum, kita masukin tanggalnya ke array
                        riwayatSelesai: udahSelesaiBelum
                            ? habit.riwayatSelesai.filter((tgl) => tgl !== tanggal)
                            : [...habit.riwayatSelesai, tanggal]
                    };
                }
                return habit;
            })
        );
    };

    return {
        daftarHabit,
        tambahHabit,
        hapusHabit,
        toggleHabit,
        sudahDimuat
    };
}