export const depthColors: Record<
  string,
  { bg: string; text: string; badge: string }
> = {
  "Ankle-Deep": {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    badge: "bg-yellow-100",
  },
  "Knee-Deep": {
    bg: "bg-orange-50",
    text: "text-orange-700",
    badge: "bg-orange-100",
  },
  "Chest-Deep": {
    bg: "bg-red-50",
    text: "text-red-700",
    badge: "bg-red-100",
  },
  Critical: {
    bg: "bg-red-100",
    text: "text-red-800",
    badge: "bg-red-200",
  },
};

export const statusColors: Record<string, { badge: string; text: string }> = {
  Pending: {
    badge: "bg-yellow-100",
    text: "text-yellow-700",
  },
  Verified: {
    badge: "bg-green-100",
    text: "text-green-700",
  },
  Rejected: {
    badge: "bg-red-100",
    text: "text-red-700",
  },
  Dispatched: {
    badge: "bg-blue-100",
    text: "text-blue-700",
  },
  Responded: {
    badge: "bg-teal-100",
    text: "text-teal-700",
  },
  Resolved: {
    badge: "bg-green-100",
    text: "text-green-700",
  },
  Cancelled: {
    badge: "bg-gray-100",
    text: "text-gray-700",
  },
};

const getColors = <T extends Record<string, unknown>>(
  colorMap: Record<string, T>,
  value: string,
  fallback: T,
): T => {
  const match = Object.keys(colorMap).find(
    (key) => key.toLowerCase() === value.toLowerCase(),
  );
  return colorMap[match ?? ""] ?? fallback;
};

export const getDepthColors = (depth: string) =>
  getColors(depthColors, depth, {
    bg: "bg-gray-100",
    text: "text-gray-700",
    badge: "bg-gray-100",
  });

export const getStatusColors = (status: string) =>
  getColors(statusColors, status, {
    badge: "bg-gray-100",
    text: "text-gray-700",
  });
