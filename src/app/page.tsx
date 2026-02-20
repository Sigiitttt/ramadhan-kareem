// app/page.tsx
'use client';

import { useGamification } from '@/features/gamification/hooks/useGamification';
import { useStatistics } from '@/features/statistics/hooks/useStatistics';
import LencanaLevel from '@/features/gamification/components/LevelBadge';
import TampilanStreak from '@/features/gamification/components/StreakDisplay';
import KartuPencapaian from '@/features/gamification/components/AchievementCard';

export default function HalamanBeranda() {
  const { dataGamifikasi, sudahDimuat: gamifikasiDimuat } = useGamification();
  const { dataStatistik, sudahDimuat: statsDimuat } = useStatistics();

  const sudahDimuat = gamifikasiDimuat && statsDimuat;

  if (!sudahDimuat) {
    return (
      <div className="flex flex-col gap-5 animate-pulse">
        <div className="h-[180px] bg-gray-200 dark:bg-zinc-800 rounded-2xl w-full"></div>
        <div className="h-[80px] bg-gray-200 dark:bg-zinc-800 rounded-2xl w-full"></div>
        <div className="h-[250px] bg-gray-200 dark:bg-zinc-800 rounded-2xl w-full"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-6">
      <div className="flex flex-col mb-1">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Assalamu'alaikum,</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Pantau terus ibadahmu hari ini!</p>
      </div>

        <LencanaLevel data={dataGamifikasi} />

      <TampilanStreak
        streakSaatIni={dataStatistik.streakSaatIni}
        streakTerpanjang={dataStatistik.streakTerpanjang}
      />

      <KartuPencapaian daftarLencana={dataGamifikasi.daftarLencana} />
    </div>
  );
}