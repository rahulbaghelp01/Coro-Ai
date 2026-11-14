
import { useState } from 'react'
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MonitorUp,
  Users,
} from 'lucide-react'

type VideoPanelProps = {
  chatId: string | null
}

export default function VideoPanel({ chatId }: VideoPanelProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isInCall, setIsInCall] = useState(false)

  if (!chatId) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="rounded-full bg-gray-100 p-5">
          <Video size={32} className="text-gray-500" />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Video Call</h2>
          <p className="mt-1 text-sm text-gray-500">
            Create or select a chat to start a video call.
          </p>
        </div>

        <button
          disabled
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm text-white opacity-50"
        >
          Start Call
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-gray-950 text-white">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <div>
          <h2 className="font-semibold">Video Call</h2>
          <p className="text-xs text-gray-400">
            {isInCall ? 'Call in progress' : 'Ready to connect'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Users size={16} />
          <span>1 participant</span>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex flex-1 min-h-0 items-center justify-center p-4">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-gray-800">

          {isVideoOff || !isInCall ? (
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-semibold">
                Y
              </div>

              <p className="text-sm text-gray-300">
                {isInCall ? 'Camera off' : 'You are not in a call'}
              </p>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              Camera preview will appear here
            </div>
          )}

          {/* Local participant label */}
          <div className="absolute bottom-3 left-3 rounded-md bg-black/50 px-3 py-1 text-xs">
            You
          </div>
        </div>
      </div>

      {/* Call Controls */}
      <div className="flex items-center justify-center gap-4 border-t border-white/10 p-5">

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="rounded-full bg-gray-800 p-3 transition hover:bg-gray-700"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        <button
          onClick={() => setIsVideoOff(!isVideoOff)}
          className="rounded-full bg-gray-800 p-3 transition hover:bg-gray-700"
          title={isVideoOff ? 'Turn camera on' : 'Turn camera off'}
        >
          {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
        </button>

        <button
          className="rounded-full bg-gray-800 p-3 transition hover:bg-gray-700"
          title="Share screen"
        >
          <MonitorUp size={20} />
        </button>

        {!isInCall ? (
          <button
            onClick={() => setIsInCall(true)}
            className="rounded-full bg-green-600 p-3 transition hover:bg-green-700"
            title="Start call"
          >
            <Video size={20} />
          </button>
        ) : (
          <button
            onClick={() => setIsInCall(false)}
            className="rounded-full bg-red-600 p-3 transition hover:bg-red-700"
            title="End call"
          >
            <PhoneOff size={20} />
          </button>
        )}
      </div>
    </div>
  )
}
