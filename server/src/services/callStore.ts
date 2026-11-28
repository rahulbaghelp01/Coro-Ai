
export const MAX_PARTICIPANTS = 8

interface CallParticipant {
  userId: string
  socketId: string
  name: string
  micOn: boolean
  cameraOn: boolean
}

export type PublicParticipant = Omit<CallParticipant, 'socketId'>

interface JoinCallResult {
  ok: boolean
  error?: string
  participants?: PublicParticipant[]
}

const calls = new Map<string, Map<string, CallParticipant>>()

// Join a call
export function joinCall(
  chatId: string,
  userId: string,
  socketId: string,
  name: string,
  micOn: boolean,
  cameraOn: boolean,
): JoinCallResult {
  let call = calls.get(chatId)

  if (!call) {
    call = new Map()
    calls.set(chatId, call)
  }

  // Prevent the same user joining from another tab
  if (call.has(userId)) {
    return {
      ok: false,
      error: 'Already in this call',
    }
  }

  // Maximum 8 participants
  if (call.size >= MAX_PARTICIPANTS) {
    return {
      ok: false,
      error: 'Call is full',
    }
  }

  // Add the new participant
  call.set(userId, {
    userId,
    socketId,
    name,
    micOn,
    cameraOn,
  })

  // Get updated participants, including the new user
  const participants = getParticipants(chatId)

  return {
    ok: true,
    participants,
  }
}

// Leave a call
export function leaveCall(
  chatId: string,
  userId: string,
): boolean {
  const call = calls.get(chatId)

  if (!call) return false

  const removed = call.delete(userId)

  // Delete the call if nobody is left
  if (call.size === 0) {
    calls.delete(chatId)
  }

  return removed
}

// Find every call associated with a socket
export function leaveAllBySocket(
  socketId: string,
): { chatId: string; userId: string }[] {
  const memberships: { chatId: string; userId: string }[] = []

  for (const [chatId, call] of calls) {
    for (const [userId, participant] of call) {
      if (participant.socketId === socketId) {
        memberships.push({ chatId, userId })
      }
    }
  }

  return memberships
}

// Get participants without exposing socket IDs
export function getParticipants(
  chatId: string,
): PublicParticipant[] {
  const call = calls.get(chatId)

  if (!call) return []

  return Array.from(call.values()).map(
    ({ userId, name, micOn, cameraOn }) => ({
      userId,
      name,
      micOn,
      cameraOn,
    }),
  )
}

// Check whether a user is in a call
export function isInCall(
  chatId: string,
  userId: string,
): boolean {
  return calls.get(chatId)?.has(userId) ?? false
}

// Get a participant's socket ID
export function getSocketId(
  chatId: string,
  userId: string,
): string | undefined {
  return calls.get(chatId)?.get(userId)?.socketId
}

// Update microphone and camera state
export function setMediaState(
  chatId: string,
  userId: string,
  micOn: boolean,
  cameraOn: boolean,
): boolean {
  const participant = calls.get(chatId)?.get(userId)

  if (!participant) return false

  participant.micOn = micOn
  participant.cameraOn = cameraOn

  return true
}
