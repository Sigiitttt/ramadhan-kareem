"use client"

import { useEffect, useState } from "react"
import {calculateQiblaDirection} from "../utils/qiblaCalculator"

/**
 * Hook untuk:
 * - Hitung arah kiblat berdasarkan koordinat kota
 * - Baca sensor device
 */
export function useQibla(latitude?: number, longitude?: number) {
  const [heading, setHeading] = useState(0)
  const [qiblaDirection, setQiblaDirection] = useState(0)

  // Hitung arah kiblat dari kota
  useEffect(() => {
    if (latitude && longitude) {
      const direction = calculateQiblaDirection(latitude, longitude)
      setQiblaDirection(direction)
    }
  }, [latitude, longitude])

  // Ambil sensor kompas device
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setHeading(event.alpha)
      }
    }

    window.addEventListener("deviceorientation", handleOrientation)

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
    }
  }, [])

  const rotation = qiblaDirection - heading

  return {
    rotation,
    heading,
    qiblaDirection
  }
}
