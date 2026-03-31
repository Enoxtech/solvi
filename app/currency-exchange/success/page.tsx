// Shared success page — redirects to currency exchange home
import { redirect } from 'next/navigation'

export default function SuccessPage() {
  redirect('/currency-exchange')
}
