export const dapatkanTanggalHariIni = (): string => {
  const hariIni = new Date();
  const offset = hariIni.getTimezoneOffset() * 60000;
  const tanggalLokal = new Date(hariIni.getTime() - offset);

  return tanggalLokal.toISOString().split('T')[0];
};

export const dapatkanTujuhHariTerakhir = (): string[] => {
  const hasil: string[] = [];
  const hariIni = new Date();

  for (let i = 6; i >= 0; i--) {
    const tanggal = new Date(hariIni);
    tanggal.setDate(hariIni.getDate() - i);

    const offset = tanggal.getTimezoneOffset() * 60000;
    const tanggalLokal = new Date(tanggal.getTime() - offset);

    hasil.push(tanggalLokal.toISOString().split('T')[0]);
  }
  return hasil;
};

export const formatHariSingkat = (tanggalString: string): string => {
  const tanggal = new Date(tanggalString);
  const namaHari = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  return namaHari[tanggal.getDay()];
};