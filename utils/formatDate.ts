export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date"
  }

  // Format: "Nov 15, 2023 • 10:30 AM"
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date)
  const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(date)

  return `${formattedDate} • ${formattedTime}`
}

