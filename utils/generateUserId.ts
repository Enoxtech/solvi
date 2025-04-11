import { nanoid } from "nanoid"

export function generateUserId(firstName = "", lastName = ""): string {
  // Get first letter of first name
  const firstInitial = firstName.charAt(0).toUpperCase()

  // Get first 3 letters of last name (or as many as available)
  const lastNamePrefix = lastName.substring(0, 3).toUpperCase()

  // Generate a random 6-character string
  const randomString = nanoid(6)

  // Combine them
  return `${firstInitial}${lastNamePrefix}-${randomString}`
}

