export const ambilJadwalSholatBerdasarkanKota = async (kota: string, tanggal: Date) => {
    try {
        const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${kota}&country=Indonesia&method=20`);
        const dataAPI = await res.json();

        if (dataAPI.code === 200) {
            return {
                timings: dataAPI.data.timings,
                meta: {
                    timezone: dataAPI.data.meta.timezone,
                    latitude: dataAPI.data.meta.latitude,
                    longitude: dataAPI.data.meta.longitude
                }
            }; //74511272
        } else {
            throw new Error('Data tidak ditemukan');
        }
    } catch (error) {
        throw new Error('Gagal mengambil jadwal sholat dari server.');
    }
};