import { useQuery } from '@tanstack/react-query'

export const queryKey = ['auth']

interface ISecret {
  code: number,
  data?: {
    address: string
  }
}
export const useSecretQuery = () => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const res = await fetch('/api/v2/secret')
        const data = await res.json()
        return data as ISecret
      } catch (e) {
        return { code: -1 }
      }
    }
  })
}