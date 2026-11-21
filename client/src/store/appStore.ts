
import { create } from 'zustand'

interface AppState {
  isChatPanelOpen: boolean
  isSidebarOpen: boolean
  isVoicePanelOpen: boolean
  isMemberListOpen: boolean
  isShareModalOpen: boolean

  toggleChatPanel: () => void
  toggleSidebar: () => void
  setSidebarOpen: (isOpen: boolean) => void
  toggleVoicePanel: () => void
  toggleMemberList: () => void
  toggleShareModal: () => void
}

export const useAppStore = create<AppState>((set) => ({
  // Initial states
  isChatPanelOpen: true,
  isSidebarOpen: false,
  isVoicePanelOpen: false,
  isMemberListOpen: false,
  isShareModalOpen: false,

  // Actions
  toggleChatPanel: () =>
    set((state) => ({ isChatPanelOpen: !state.isChatPanelOpen })),

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  setSidebarOpen: (isOpen) =>
    set({ isSidebarOpen: isOpen }),

  toggleVoicePanel: () =>
    set((state) => ({ isVoicePanelOpen: !state.isVoicePanelOpen })),

  toggleMemberList: () =>
    set((state) => ({ isMemberListOpen: !state.isMemberListOpen })),

  toggleShareModal: () =>
    set((state) => ({ isShareModalOpen: !state.isShareModalOpen })),
}))
