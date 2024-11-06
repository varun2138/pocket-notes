export const formatDate = (date) => {
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-GB", options)
    .format(date)
    .replace(/,/g, "");
};
export const formatTime = (time) => {
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(time);
};

export const GroupName = ({ group }) => {
  return group.name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2);
};
