const fs = require("fs");
const path = require("path");

const base = "src";

const files = [
    // APP
    "app/layout.tsx",
    "app/globals.css",
    "app/page.tsx",
    "app/dashboard/page.tsx",
    "app/dashboard/loading.tsx",
    "app/habits/page.tsx",
    "app/habits/loading.tsx",
    "app/prayer/page.tsx",
    "app/quran/page.tsx",
    "app/tasbih/page.tsx",
    "app/statistics/page.tsx",
    "app/settings/page.tsx",

    // COMPONENTS
    "components/layout/Navbar.tsx",
    "components/layout/Sidebar.tsx",
    "components/layout/Footer.tsx",
    "components/layout/AppShell.tsx",

    "components/shared/PageHeader.tsx",
    "components/shared/EmptyState.tsx",
    "components/shared/ProgressCard.tsx",
    "components/shared/BadgeDisplay.tsx",
    "components/shared/ConfirmDialog.tsx",

    // PRAYER FEATURE
    "features/prayer/components/PrayerCard.tsx",
    "features/prayer/components/PrayerCountdown.tsx",
    "features/prayer/components/QiblaCompass.tsx",
    "features/prayer/hooks/usePrayerTimes.ts",
    "features/prayer/hooks/useQibla.ts",
    "features/prayer/services/prayerApi.ts",
    "features/prayer/utils/prayerFormatter.ts",
    "features/prayer/types.ts",

    // HABITS FEATURE
    "features/habits/components/HabitCard.tsx",
    "features/habits/components/HabitList.tsx",
    "features/habits/components/AddHabitDialog.tsx",
    "features/habits/components/HabitCalendarView.tsx",
    "features/habits/hooks/useHabits.ts",
    "features/habits/hooks/useHabitStatistics.ts",
    "features/habits/services/habitStorage.ts",
    "features/habits/utils/habitCalculator.ts",
    "features/habits/types.ts",

    // QURAN FEATURE
    "features/quran/components/QuranProgressCard.tsx",
    "features/quran/components/QuranTargetForm.tsx",
    "features/quran/components/JuzInput.tsx",
    "features/quran/hooks/useQuranTracker.ts",
    "features/quran/services/quranStorage.ts",
    "features/quran/utils/quranCalculator.ts",
    "features/quran/types.ts",

    // TASBIH FEATURE
    "features/tasbih/components/TasbihCounter.tsx",
    "features/tasbih/components/TasbihHistory.tsx",
    "features/tasbih/hooks/useTasbih.ts",
    "features/tasbih/utils/tasbihLogic.ts",
    "features/tasbih/types.ts",

    // GAMIFICATION
    "features/gamification/components/LevelBadge.tsx",
    "features/gamification/components/StreakDisplay.tsx",
    "features/gamification/components/AchievementCard.tsx",
    "features/gamification/hooks/useGamification.ts",
    "features/gamification/services/levelEngine.ts",
    "features/gamification/utils/streakCalculator.ts",
    "features/gamification/types.ts",

    // STATISTICS
    "features/statistics/components/StatsOverview.tsx",
    "features/statistics/components/CompletionChart.tsx",
    "features/statistics/hooks/useStatistics.ts",
    "features/statistics/utils/statsAggregator.ts",
    "features/statistics/types.ts",

    // REMINDER
    "features/reminder/components/ReminderToggle.tsx",
    "features/reminder/components/ReminderSettings.tsx",
    "features/reminder/hooks/useReminder.ts",
    "features/reminder/services/notificationService.ts",
    "features/reminder/utils/reminderScheduler.ts",
    "features/reminder/types.ts",

    // GLOBAL
    "hooks/useLocalStorage.ts",
    "hooks/useGeolocation.ts",
    "hooks/useDarkMode.ts",

    "lib/apiClient.ts",
    "lib/config.ts",

    "utils/date.ts",
    "utils/format.ts",
    "utils/calculation.ts",
    "utils/validation.ts",

    "context/AppContext.tsx",
    "context/ThemeContext.tsx",
    "context/GamificationContext.tsx",

    "types/global.ts",
    "types/api.ts",

    "constants/levels.ts",
    "constants/prayerNames.ts",
    "constants/appConfig.ts",
];

files.forEach((file) => {
    const fullPath = path.join(base, file);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, `// ${file}\n`);
    }
});

console.log("✅ Structure created successfully!");