// app/habits/loading.tsx
export default function LoadingHabit() {
    // Kita bikin 4 kerangka kosong buat nampilin efek loading berulang
    const kerangkaKartu = Array(4).fill(0);

    return (
        <div className="flex flex-col gap-5">
            {/* Skeleton untuk Header Progress (Kotak Hijau di atas) */}
            <div className="bg-gray-200 dark:bg-zinc-800 rounded-2xl p-5 h-[120px] w-full animate-pulse"></div>

            {/* Skeleton untuk Judul dan Tombol Tambah */}
            <div className="flex justify-between items-center mt-2">
                <div className="h-6 w-32 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
                <div className="h-8 w-24 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse"></div>
            </div>

            {/* Skeleton untuk Daftar Habit */}
            <div className="flex flex-col gap-3 pb-6">
                {kerangkaKartu.map((_, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm h-[132px] w-full animate-pulse"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex flex-col gap-2">
                                {/* Skeleton Nama Habit */}
                                <div className="h-6 w-40 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
                                {/* Skeleton Kategori */}
                                <div className="h-3 w-16 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
                            </div>

                            {/* Skeleton Tombol Checklist Bulat Besar */}
                            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-zinc-800"></div>
                        </div>

                        {/* Skeleton Kalender 7 Hari */}
                        <div className="flex justify-between pt-3 border-t border-gray-100 dark:border-zinc-800">
                            {Array(7).fill(0).map((_, hariIndex) => (
                                <div key={hariIndex} className="flex flex-col items-center gap-1">
                                    <div className="h-2 w-6 bg-gray-200 dark:bg-zinc-800 rounded-sm"></div>
                                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-zinc-800"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}