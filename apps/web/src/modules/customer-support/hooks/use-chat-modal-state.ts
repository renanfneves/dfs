import { create } from 'zustand'

type ChatModalState = {
  open: boolean
  toggleModal: (open: boolean, callback?: () => void) => void
}

export const useChatModalState = create<ChatModalState>((set) => ({
  open: false,
  toggleModal: (open: boolean, callback?: () => void) => {
    set({ open })
    callback?.()
  },
}))
