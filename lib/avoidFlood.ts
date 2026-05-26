// calculate a point offset perpendicular to the flooded segment
const getPerpendicularOffset = (
  start: [number, number],
  end: [number, number],
  offsetMeters: number = 50, // how far to detour in meters
): [number, number] => {
  const [lat1, lng1] = start;
  const [lat2, lng2] = end;

  // midpoint of the flooded segment
  const midLat = (lat1 + lat2) / 2;
  const midLng = (lng1 + lng2) / 2;

  // perpendicular direction
  const dLat = lat2 - lat1;
  const dLng = lng2 - lng1;
  const length = Math.sqrt(dLat * dLat + dLng * dLng);

  // normalize and rotate 90 degrees
  const perpLat = -dLng / length;
  const perpLng = dLat / length;

  // offset in degrees (roughly 111,000m per degree)
  const offsetDeg = offsetMeters / 111000;

  return [midLat + perpLat * offsetDeg, midLng + perpLng * offsetDeg];
};

export const getDetourWaypoints = (
  origin: [number, number],
  destination: [number, number],
  floodedSegments: { points: [number, number][] }[],
): [number, number][] => {
  const waypoints: [number, number][] = [origin];

  floodedSegments.forEach((segment) => {
    if (segment.points.length < 2) return;

    const start = segment.points[0];
    const end = segment.points[segment.points.length - 1];

    // check if this flooded segment is roughly between origin and destination
    const segMidLat = (start[0] + end[0]) / 2;
    const segMidLng = (start[1] + end[1]) / 2;

    const isOnPath =
      Math.min(origin[0], destination[0]) - 0.002 <= segMidLat &&
      segMidLat <= Math.max(origin[0], destination[0]) + 0.002 &&
      Math.min(origin[1], destination[1]) - 0.002 <= segMidLng &&
      segMidLng <= Math.max(origin[1], destination[1]) + 0.002;

    if (isOnPath) {
      const detour = getPerpendicularOffset(start, end, 100);
      waypoints.push(detour);
    }
  });

  waypoints.push(destination);
  return waypoints;
};
