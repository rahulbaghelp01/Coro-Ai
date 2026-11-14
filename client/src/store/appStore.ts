
import { create } from 'zustand'

interface AppState {
  isChatPanelOpen: boolean
  isSidebarOpen: boolean
  isVoicePanelOpen: boolean
  isMemberListOpen: boolean

  toggleChatPanel: () => void
  toggleSidebar: () => void
  toggleVoicePanel: () => void
  toggleMemberList: () => void
}

export const useAppStore = create<AppState>((set) => ({
  // Initial states
  isChatPanelOpen: true,
  isSidebarOpen: true,
  isVoicePanelOpen: false,
  isMemberListOpen: false,

  // Actions
  toggleChatPanel: () =>
    set((state) => ({ isChatPanelOpen: !state.isChatPanelOpen })),

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  toggleVoicePanel: () =>
    set((state) => ({ isVoicePanelOpen: !state.isVoicePanelOpen })),

  toggleMemberList: () =>
    set((state) => ({ isMemberListOpen: !state.isMemberListOpen })),
}))
