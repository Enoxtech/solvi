import Link from "next/link"
import { User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AccountButton() {
  // In a real app, you'd fetch the user's profile picture URL from your auth system
  const userProfilePicture = null // Replace with actual user profile picture URL when available

  return (
    <Link href="/profile" className="block">
      <Avatar className="h-10 w-10 border-2 border-white hover:border-blue-300 transition-colors">
        {userProfilePicture ? (
          <AvatarImage src={userProfilePicture} alt="User profile" />
        ) : (
          <AvatarFallback>
            <User className="h-6 w-6 text-primary" />
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  )
}

