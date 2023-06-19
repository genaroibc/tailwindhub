// 💡 CREDITS: https://github.com/midudev/aprendiendo-react/blob/master/projects/14-hacker-news-prueba-tecnica/src/utils/getRelativeTime.ts

const DATE_UNITS: Record<string, number> = {
  year: 31536000,
  month: 2629800,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
} as const;

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export const getRelativeTime = (miliseconds: number) => {
  const started = new Date(miliseconds).getTime();
  const now = new Date().getTime();

  const elapsed = (started - now) / 1000;

  for (const unit in DATE_UNITS) {
    const absoluteElapsed = Math.abs(elapsed);

    if (absoluteElapsed > DATE_UNITS[unit] || unit === "second") {
      return rtf.format(
        Math.round(elapsed / DATE_UNITS[unit]),
        unit as Intl.RelativeTimeFormatUnit
      );
    }
  }

  return "";
};
