import { AdminLiveChat } from "@/components/admin/admin-live-chat"

export default function AdminMessagesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Live Chat</h1>
      <p className="text-purple-300 mb-6">Manage user conversations and support tickets</p>

      <AdminLiveChat />
    </div>
  )
}

