// sell-rmb/send is no longer needed — sell flow is entry → confirm → inline success
// This page redirects to the confirm step
import { redirect } from 'next/navigation'

export default function SellSendPage() {
  redirect('/currency-exchange/sell-rmb/confirm-details')
}
