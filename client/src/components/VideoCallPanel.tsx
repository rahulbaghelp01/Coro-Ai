type VideoPanelProps = {
  chatId: string | null
}

export default function VideoPanel({ chatId }: VideoPanelProps) {
  return (
    <div className="flex h-full items-center justify-center rounded-xl bg-gray-950 text-gray-400">
      Video Call Panel
    </div>
  )
}