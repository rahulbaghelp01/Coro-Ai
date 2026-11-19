
import { create } from 'zustand'

interface AppState {
  isChatPanelOpen: boolean
  isSidebarOpen: boolean
  isVoicePanelOpen: boolean
  isMemberListOpen: boolean
  isShareModalOpen: boolean  // Add this

  toggleChatPanel: () => void
  toggleSidebar: () => void
  toggleVoicePanel: () => void
  toggleMemberList: () => void
  toggleShareModal: () => void // Add this
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

  toggleVoicePanel: () =>
    set((state) => ({ isVoicePanelOpen: !state.isVoicePanelOpen })),

  toggleMemberList: () =>
    set((state) => ({ isMemberListOpen: !state.isMemberListOpen })),
  toggleShareModal: ()=>
    set((state)=>({isShareModalOpen: !state.isShareModalOpen })),
}))
