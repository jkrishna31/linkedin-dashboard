export const formatDatetime = (
  date: Date | string,
  format?: "HH:MM DD/MM/YY",
  locale: Intl.LocalesArgument = "en-GB"
) => {
  const d = new Date(date);

  switch (format) {
    case "HH:MM DD/MM/YY": {
      const time = d.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
      });

      const dateString = d.toLocaleDateString(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });

      const formattedDate = `${time} ${dateString}`;
      return formattedDate;
    }
    default: {
      const formattedDate = d.toLocaleString(locale, {
        month: "numeric",
        day: "numeric",
        year: "numeric"
      });
      return formattedDate;
    }
  }
};