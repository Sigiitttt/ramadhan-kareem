// app/settings/page.tsx
// app/settings/page.tsx
'use client';

import { useReminder } from '@/features/reminder/hooks/useReminder';
import SetelanPengingat from '@/features/reminder/components/ReminderSettings';

export default function HalamanSetelan() {
    const {
        dataPengingat,
        toggleAktifGlobal,
        togglePengingat,
        ubahWaktuPengingat,
        sudahDimuat
    } = useReminder();

    if (!sudahDimuat) return null; // Nanti di-handle oleh loading.tsx

    return (
        <div className="flex flex-col gap-6 pb-6">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Setelan</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Atur preferensi aplikasimu</p>
            </div>

            {/* Bagian Pengingat / Reminder */}
            <SetelanPengingat
                data={dataPengingat}
                onToggleGlobal={toggleAktifGlobal}
                onToggleItem={togglePengingat}
                onChangeWaktu={ubahWaktuPengingat}
            />

            {/* Info Aplikasi */}
            <div className="mt-8 text-center flex flex-col gap-1">
                <p className="text-xs text-gray-400">Ramadhan Tracker MVP v1.0</p>
                <p className="text-[10px] text-gray-400">Dibuat dengan ❤️ untuk ibadah yang lebih baik</p>
            </div>
        </div>
    );
}