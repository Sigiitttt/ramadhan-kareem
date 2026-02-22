/**
 * Menghitung arah kiblat dari latitude & longitude kota
 */
export function calculateQiblaDirection(
  lat: number,
  lon: number
) {
  const kaabaLat = 21.4225 * (Math.PI / 180);
  const kaabaLon = 39.8262 * (Math.PI / 180);

  const userLat = lat * (Math.PI / 180);
  const userLon = lon * (Math.PI / 180);

  const deltaLon = kaabaLon - userLon;

  const y = Math.sin(deltaLon);
  const x =
    Math.cos(userLat) * Math.tan(kaabaLat) -
    Math.sin(userLat) * Math.cos(deltaLon);

  let bearing = Math.atan2(y, x) * (180 / Math.PI);

  return (bearing + 360) % 360;
}
