// features/statistics/components/CompletionChart.tsx
// features/statistics/components/CompletionChart.tsx
import { DataHabit } from '@/features/habits/types';
import { dapatkanTujuhHariTerakhir, formatHariSingkat } from '@/utils/tanggal';

interface PropsChart {
    daftarHabit: DataHabit[];
}

export default function GrafikPenyelesaian({ daftarHabit }: PropsChart) {
    const tujuhHariTerakhir = dapatkanTujuhHariTerakhir().reverse(); // Urutkan dari yang terlama ke hari ini
    const totalHabit = daftarHabit.length || 1; // Hindari pembagian dengan 0

    // Hitung persentase penyelesaian untuk tiap harinya
    const dataGrafik = tujuhHariTerakhir.map((tanggal) => {
        let habitSelesai = 0;
        daftarHabit.forEach(habit => {
            if (habit.riwayatSelesai.includes(tanggal)) habitSelesai++;
        });
        const persentase = Math.round((habitSelesai / totalHabit) * 100);

        return {
            tanggal,
            hari: formatHariSingkat(tanggal),
            persentase
        };
    });

    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-6">Aktivitas 7 Hari Terakhir</h3>

            <div className="flex justify-between items-end h-32 gap-2">
                {dataGrafik.map((item, index) => {
                    const isHariIni = index === dataGrafik.length - 1;

                    return (
                        <div key={item.tanggal} className="flex flex-col items-center flex-1 gap-2">
                            {/* Tooltip Persentase */}
                            <span className="text-[10px] font-medium text-gray-400 opacity-0 hover:opacity-100 transition-opacity">
                                {item.persentase}%
                            </span>

                            {/* Batang Grafik */}
                            <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-t-md relative flex justify-end flex-col h-full">
                                <div
                                    className={`w-full rounded-t-md transition-all duration-700 ease-out ${isHariIni ? 'bg-emerald-500' : 'bg-emerald-400/60 dark:bg-emerald-600/60'
                                        }`}
                                    style={{ height: `${item.persentase}%` }}
                                />
                            </div>

                            {/* Label Hari */}
                            <span className={`text-xs ${isHariIni ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'text-gray-500'}`}>
                                {item.hari}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}