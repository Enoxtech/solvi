import { cn } from "@/lib/utils"
import { Button as ShadcnButton } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"
import { forwardRef } from "react"

interface AdminButtonProps extends ButtonProps {
  gradient?: boolean
}

export const AdminButton = forwardRef<HTMLButtonElement, AdminButtonProps>(
  ({ className, gradient = false, variant = "default", ...props }, ref) => {
    return (
      <ShadcnButton
        className={cn(
          gradient &&
            variant === "default" &&
            "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
          className,
        )}
        variant={variant}
        ref={ref}
        {...props}
      />
    )
  },
)

AdminButton.displayName = "AdminButton"

