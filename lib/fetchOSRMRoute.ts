export const fetchOSRMRoute = async (
  points: [number, number][],
): Promise<[number, number][]> => {
  if (points.length < 2) return [];

  // OSRM expects lng,lat not lat,lng
  const coords = points.map(([lat, lng]) => `${lng},${lat}`).join(";");
  const url = `${process.env.NEXT_PUBLIC_OSRM_URI}/route/v1/foot/${coords}?overview=full&geometries=geojson`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.routes?.length) return [];

  return data.routes[0].geometry.coordinates.map(
    (c: number[]) => [c[1], c[0]] as [number, number],
  );
};
