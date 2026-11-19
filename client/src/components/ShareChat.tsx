
import { useState } from "react"
import { X, Copy, Check, Link2 } from "lucide-react"
import { useParams } from "react-router"
import type { Chat } from "../features/types/types"
import { useAppStore } from "../store/appStore"

type ShareModalProps = {
 
  Chats: Chat[] 
}

export default function ShareModal({
 
  Chats 
}: ShareModalProps) {
  
  const isSharedModalOpen = useAppStore((state)=> state.isShareModalOpen)  
  
  const toggleSharedModal = useAppStore((state)=>state.toggleShareModal)

  const {chatId} = useParams()
  const [copied, setCopied] = useState(false)
  
  const chat = Chats.find((chat) => chat.id === chatId)

const inviteLink = chat
  ? `${window.location.origin}/join/${chat.inviteToken}`
  : ""

  if (!isSharedModalOpen) return null

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)

      setTimeout(() => setCopied(false), 2000)
    } catch {
      console.error("Failed to copy link")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#151515] p-6 shadow-2xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Share your chat
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Invite others to join your conversation.
            </p>
          </div>

          <button
            onClick={toggleSharedModal}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Link */}
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#202020] p-3">
          <Link2 className="shrink-0 text-gray-400" size={19} />

          <input
            readOnly
            value={inviteLink}
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-300 outline-none"
          />

          <button
            onClick={handleCopy}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-[#365acb] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#456be0]"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Anyone with this link can use it to join your chat.
        </p>

      </div>
    </div>
  )
}
