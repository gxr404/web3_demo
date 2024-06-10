import { create } from 'zustand'

export type AuthStatus = 'unauthenticated' | 'authenticated'

interface AuthStore {
  address: string
  isAuth: boolean
  status: AuthStatus
  setAuthStatus: (status: AuthStatus) => void
}
export const useAuthStore = create<AuthStore>((set) => ({
  address: '',
  isAuth: false,
  status: 'unauthenticated',
  setAuthStatus(newStatus) {
    set(() => {
      return {
        status: newStatus,
        isAuth: newStatus === 'authenticated'
      }
    })
  }
}))