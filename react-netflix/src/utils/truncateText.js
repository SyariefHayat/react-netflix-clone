export const truncateText = (text, charLimit) => {
  if (typeof text !== "string") {
    return "";
  }
  return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
};
