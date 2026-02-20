// features/reminder/services/notificationService.ts
// features/reminder/services/notificationService.ts

// Cek apakah browser mendukung notifikasi
export const cekDukunganNotifikasi = (): boolean => {
    return typeof window !== 'undefined' && 'Notification' in window;
};

// Meminta izin ke user (akan memunculkan pop-up browser "Allow Notifications")
export const mintaIzinNotifikasi = async (): Promise<boolean> => {
    if (!cekDukunganNotifikasi()) return false;

    if (Notification.permission === 'granted') return true;

    const izin = await Notification.requestPermission();
    return izin === 'granted';
};

// Mengeksekusi kemunculan notifikasi
export const kirimNotifikasi = (judul: string, pesan: string) => {
    if (cekDukunganNotifikasi() && Notification.permission === 'granted') {
        // Memunculkan notifikasi sistem
        new Notification(judul, {
            body: pesan,
            icon: '/favicon.ico', // Pastikan kamu punya favicon di folder public
            badge: '/favicon.ico',
            vibrate: [200, 100, 200] // Getar di HP Android
        });
    }
};