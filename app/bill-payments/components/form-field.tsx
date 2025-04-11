import type { ReactNode } from "react"

interface FormFieldProps {
  label: string
  children: ReactNode
}

export function FormField({ label, children }: FormFieldProps) {
  return (
    <div>
      <label className="block text-white mb-2">{label}</label>
      {children}
    </div>
  )
}

