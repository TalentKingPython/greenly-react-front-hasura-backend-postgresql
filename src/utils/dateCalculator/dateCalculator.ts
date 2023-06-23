export const ONE_MINUTE = 60 * 1000;
export const ONE_HOUR = 60 * ONE_MINUTE;
export const ONE_DAY = 24 * ONE_HOUR;
export const ONE_MONTH = 30 * ONE_DAY;
export const ONE_YEAR = 365 * ONE_DAY;

export default function dateCalculator(createdAt: string): string {
  const currentDate = new Date();
  const submissionDate = new Date(createdAt);
  const timeDifference = currentDate.getTime() - submissionDate.getTime();

  if (timeDifference < ONE_HOUR) {
    return 'Just now';
  } else if (timeDifference < ONE_DAY) {
    const hours = Math.floor(timeDifference / ONE_HOUR);
    return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
  } else if (timeDifference < ONE_MONTH) {
    const days = Math.floor(timeDifference / ONE_DAY);
    return `${days} ${days > 1 ? 'days' : 'day'} ago`;
  } else if (timeDifference < 365 * ONE_DAY) {
    const months = Math.floor(timeDifference / ONE_MONTH);
    return `${months} ${months > 1 ? 'months' : 'month'} ago`;
  } else {
    const years = Math.floor(timeDifference / (365 * ONE_DAY));
    // remaining months
    const remainingMonths = Math.floor(
      (timeDifference - years * 365 * ONE_DAY) / ONE_MONTH
    );

    const remainingMonthsText =
      remainingMonths > 0
        ? ` ${remainingMonths} ${remainingMonths > 1 ? 'months' : 'month'}`
        : '';

    return `${years} ${years > 1 ? 'years' : 'year'}${remainingMonthsText} ago`;
  }
}
