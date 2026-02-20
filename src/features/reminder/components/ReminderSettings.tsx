// features/reminder/components/ReminderSettings.tsx
// features/reminder/components/ReminderSettings.tsx
import { Bell, BellOff, Clock } from 'lucide-react';
import SaklarToggle from './ReminderToggle';
import { DataPengingat } from '../types';

interface PropsSetelanPengingat {
    data: DataPengingat;
    onToggleGlobal: () => void;
    onToggleItem: (id: string) => void;
    onChangeWaktu: (id: string, waktuBaru: string) => void;
}

export default function SetelanPengingat({ data, onToggleGlobal, onToggleItem, onChangeWaktu }: PropsSetelanPengingat) {
    return (
        <div className="flex flex-col gap-6">
            {/* Kartu Master Toggle (Saklar Utama) */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-5 text-white shadow-md flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        {data.aktifGlobal ? <Bell size={24} /> : <BellOff size={24} />}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Notifikasi Pintar</h3>
                        <p className="text-emerald-100 text-sm">
                            {data.aktifGlobal ? 'Pengingat ibadah aktif' : 'Pengingat ibadah mati'}
                        </p>
                    </div>
                </div>
                <SaklarToggle aktif={data.aktifGlobal} onUbah={onToggleGlobal} />
            </div>

            {/* Daftar Pengingat Spesifik (Hanya bisa diatur kalau saklar utama nyala) */}
            <div className={`flex flex-col gap-3 transition-opacity duration-300 ${!data.aktifGlobal ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                <h3 className="font-bold text-gray-800 dark:text-gray-100 px-1">Jadwal Pengingat</h3>

                {data.daftar.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-800 dark:text-gray-100">{item.nama}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{item.pesan}</span>
                            </div>
                            <SaklarToggle
                                aktif={item.aktif}
                                onUbah={() => onToggleItem(item.id)}
                                disabled={!data.aktifGlobal}
                            />
                        </div>

                        <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-zinc-800">
                            <Clock size={16} className="text-gray-400" />
                            <input
                                type="time"
                                value={item.waktu}
                                onChange={(e) => onChangeWaktu(item.id, e.target.value)}
                                disabled={!data.aktifGlobal || !item.aktif}
                                className="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block px-2.5 py-1.5 outline-none transition-colors"
                                required
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}