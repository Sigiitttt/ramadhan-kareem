// features/statistics/utils/statsAggregator.ts
// features/statistics/utils/statsAggregator.ts

// Helper untuk dapat array X hari terakhir
export const dapatkanXHariTerakhir = (jumlahHari: number): string[] => {
    const hasil: string[] = [];
    const hariIni = new Date();

    for (let i = 0; i < jumlahHari; i++) {
        const tanggal = new Date(hariIni);
        tanggal.setDate(hariIni.getDate() - i);
        const offset = tanggal.getTimezoneOffset() * 60000;
        const tanggalLokal = new Date(tanggal.getTime() - offset);
        hasil.push(tanggalLokal.toISOString().split('T')[0]);
    }
    return hasil;
};

// Hitung streak (berturut-turut) dari sebuah array tanggal
export const hitungStreak = (riwayat: string[], tanggalHariIni: string): number => {
    if (riwayat.length === 0) return 0;

    const riwayatUrut = [...riwayat].sort().reverse(); // Urutkan dari yang terbaru
    let streak = 0;
    let tanggalCek = new Date(tanggalHariIni);

    // Jika hari ini belum dicentang, kita beri toleransi cek dari kemarin
    // (karena user mungkin belum centang untuk hari ini, streak tidak boleh langsung 0)
    if (!riwayatUrut.includes(tanggalHariIni)) {
        tanggalCek.setDate(tanggalCek.getDate() - 1);
    }

    while (true) {
        const offset = tanggalCek.getTimezoneOffset() * 60000;
        const formatCek = new Date(tanggalCek.getTime() - offset).toISOString().split('T')[0];

        if (riwayatUrut.includes(formatCek)) {
            streak++;
            tanggalCek.setDate(tanggalCek.getDate() - 1); // Mundur 1 hari ke belakang
        } else {
            break; // Streak terputus
        }
    }

    return streak;
};