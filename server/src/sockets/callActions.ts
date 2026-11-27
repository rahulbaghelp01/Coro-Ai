
import type { Server } from 'socket.io'

import {
  getParticipants,
  leaveCall,
} from '../services/callStore'

// Notify everyone in the chat about the current call
export function broadcastCallUpdate(
  io: Server,
  chatId: string,
) {
  io.to(chatId).emit('call:updated', {
    chatId,
    participants: getParticipants(chatId),
  })
}

// Remove a participant and notify the others
export function leaveCallAndNotify(
  io: Server,
  chatId: string,
  userId: string,
) {
  const removed = leaveCall(chatId, userId)

  if (!removed) return

  // Notify people inside the call
  io.to(`call:${chatId}`).emit('call:user-left', {
    chatId,
    userId,
  })

  // Update Start / Join call button in the chat
  broadcastCallUpdate(io, chatId)
}
