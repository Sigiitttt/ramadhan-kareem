"use client"

import { Card } from "@/components/ui/card"
import { useQibla } from "../hooks/useQibla"

interface Props {
  latitude: number
  longitude: number
}

/**
 * Kompas kiblat berdasarkan kota yang dipilih
 */
export function QiblaCompass({ latitude, longitude }: Props) {
  const { rotation, heading, qiblaDirection } = useQibla(
    latitude,
    longitude
  )

  return (
    <Card className="flex flex-col items-center p-6 gap-6">
      <h2 className="text-xl font-bold">Arah Kiblat</h2>

      <div className="relative w-64 h-64 rounded-full border-4 border-muted flex items-center justify-center">

        {/* Jarum kiblat */}
        <div
          className="absolute w-1 h-28 bg-green-500 origin-bottom transition-transform duration-200"
          style={{
            transform: `rotate(${rotation}deg)`
          }}
        />

        {/* Tengah */}
        <div className="w-4 h-4 bg-black rounded-full" />
      </div>

      <div className="text-sm text-muted-foreground text-center">
        <p>Arah Device: {Math.round(heading)}°</p>
        <p>Arah Kiblat: {Math.round(qiblaDirection)}°</p>
      </div>
    </Card>
  )
}
