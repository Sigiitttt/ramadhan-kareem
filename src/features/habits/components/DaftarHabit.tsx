// features/habits/components/DaftarHabit.tsx
import { DataHabit } from '../types';
import KartuHabit from './HabitCard';

interface PropsDaftarHabit {
    daftarHabit: DataHabit[];
    tanggalAktif: string;
    onToggle: (id: string, tanggal: string) => void;
    onHapus: (id: string) => void;
}

export default function DaftarHabit({ daftarHabit, tanggalAktif, onToggle, onHapus }: PropsDaftarHabit) {
    if (daftarHabit.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                Belum ada habit yang dilacak. Yuk tambah!
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1 pb-6">
            {daftarHabit.map((habit) => (
                <KartuHabit
                    key={habit.id}
                    habit={habit}
                    tanggalAktif={tanggalAktif}
                    onToggle={onToggle}
                    onHapus={onHapus}
                />
            ))}
        </div>
    );
}