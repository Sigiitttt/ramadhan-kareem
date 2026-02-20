// features/reminder/components/ReminderToggle.tsx
// features/reminder/components/ReminderToggle.tsx

interface PropsSaklar {
    aktif: boolean;
    onUbah: () => void;
    disabled?: boolean;
}

export default function SaklarToggle({ aktif, onUbah, disabled = false }: PropsSaklar) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={aktif}
            disabled={disabled}
            onClick={onUbah}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                } ${aktif ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-zinc-700'}`}
        >
            <span className="sr-only">Ganti setelan</span>
            <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${aktif ? 'translate-x-5' : 'translate-x-0'
                    }`}
            />
        </button>
    );
}