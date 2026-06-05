const formatRequestedTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return isToday
    ? time
    : `${date.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" })} at ${time}`;
};

export default formatRequestedTime;
