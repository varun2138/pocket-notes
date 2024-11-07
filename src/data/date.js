// formatting date and time for desired output
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

// first letters extraction from  a string
export const GroupName = ({ group }) => {
  return group.name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2);
};

// truncate the input if words more than three for group component
export const truncateGroupName = (groupName) => {
  const words = groupName.trim().split(" ");
  if (words.length > 3) {
    return words.slice(0, 3).join(" ") + "...";
  }
  return groupName;
};
