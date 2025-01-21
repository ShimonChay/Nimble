export const dateToFormattedMonth = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};
