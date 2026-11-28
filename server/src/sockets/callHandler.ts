
import type { Server, Socket } from 'socket.io'

import {User} from '../models/user'
import { assertMember } from '../services/chatService'


import {
  getParticipants,
  getSocketId,
  isInCall,
  joinCall,
  leaveAllBySocket,
  setMediaState,
} from '../services/callStore'

import {
  callJoinSchema,
  callSignalSchema,
  mediaStateSchema,
} from '../validators/callSchema'

import {
  broadcastCallUpdate,
  leaveCallAndNotify,
} from './callActions'

type StatusAck = (response: {
  ok: boolean
  active?: boolean
  participants?: ReturnType<typeof getParticipants>
  error?: string
}) => void

type JoinAck = (response: {
  ok: boolean
  participants?: ReturnType<typeof getParticipants>
  error?: string
}) => void

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  return 'Something went wrong'
}

export function registerCallHandlers(
  io: Server,
  socket: Socket,
) {
  const userId = String(socket.data.userId)

  // Get current call status
  socket.on(
    'call:status',
    async (chatId: string, ack?: StatusAck) => {
      try {
        chatId = String(chatId)

        await assertMember(chatId, userId)

        // Ensure this socket receives chat call updates
        await socket.join(chatId)

        const participants = getParticipants(chatId)

        ack?.({
          ok: true,
          active: participants.length > 0,
          participants,
        })
      } catch (error) {
        ack?.({
          ok: false,
          error: getErrorMessage(error),
        })
      }
    },
  )

  // Join or start a call
  socket.on(
    'call:join',
    async (payload: unknown, ack?: JoinAck) => {
      try {
        const parsed = callJoinSchema.safeParse(payload)

        if (!parsed.success) {
          ack?.({
            ok: false,
            error: 'Invalid call data',
          })
          return
        }

        const {
          chatId,
          micOn,
          cameraOn,
        } = parsed.data

        await assertMember(chatId, userId)

        const user = await User.findById(userId)
          .select('name')
          .lean()

        const result = joinCall(
          chatId,
          userId,
          socket.id,
          user?.name ?? 'Participant',
          micOn,
          cameraOn,
        )

        if (!result.ok) {
          ack?.({
            ok: false,
            error: result.error,
          })
          return
        }

        await socket.join(chatId)
        await socket.join(`call:${chatId}`)

        ack?.({
          ok: true,
          participants: result.participants,
        })

        const participant = getParticipants(chatId).find(
          (person) => person.userId === userId,
        )

        if (participant) {
          io.to(`call:${chatId}`).emit(
            'call:user-joined',
            {
              chatId,
              participant,
            },
          )
        }

        broadcastCallUpdate(io, chatId)
      } catch (error) {
        ack?.({
          ok: false,
          error: getErrorMessage(error),
        })
      }
    },
  )

  // Forward WebRTC signaling to another participant
  socket.on(
    'call:signal',
    async (payload: unknown) => {
      try {
        const parsed = callSignalSchema.safeParse(payload)

        if (!parsed.success) return

        const { chatId, to, signal } = parsed.data

        await assertMember(chatId, userId)

        // Both users must be in this call
        if (
          !isInCall(chatId, userId) ||
          !isInCall(chatId, to)
        ) {
          return
        }

        // Prevent excessively large signaling payloads
        const signalSize = Buffer.byteLength(
          JSON.stringify(signal),
          'utf8',
        )

        if (signalSize > 64 * 1024) return

        const targetSocketId = getSocketId(chatId, to)

        if (!targetSocketId) return

        io.to(targetSocketId).emit('call:signal', {
          from: userId,
          signal,
        })
      } catch {
        // Invalid signaling is ignored
      }
    },
  )

  // Update microphone and camera state
  socket.on(
    'call:media-state',
    async (payload: unknown) => {
      try {
        const parsed = mediaStateSchema.safeParse(payload)

        if (!parsed.success) return

        const {
          chatId,
          micOn,
          cameraOn,
        } = parsed.data

        await assertMember(chatId, userId)

        if (!isInCall(chatId, userId)) return

        const updated = setMediaState(
          chatId,
          userId,
          micOn,
          cameraOn,
        )

        if (!updated) return

        io.to(`call:${chatId}`).emit(
          'call:media-state',
          {
            userId,
            micOn,
            cameraOn,
          },
        )
      } catch {
        // Ignore invalid media-state updates
      }
    },
  )

  // Leave a call
  socket.on(
    'call:leave',
    async (chatId: string) => {
      try {
        chatId = String(chatId)

        await assertMember(chatId, userId)

        leaveCallAndNotify(io, chatId, userId)
        

        await socket.leave(`call:${chatId}`)
      } catch {
        // Ignore invalid leave requests
      }
    },
  )

  // Remove call participants when their socket disconnects
  socket.on('disconnect', () => {
    const memberships = leaveAllBySocket(socket.id)

    for (const { chatId, userId } of memberships) {
      leaveCallAndNotify(io, chatId, userId)
    }
  })
}
