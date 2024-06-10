import { useQuery } from '@tanstack/react-query'

export const queryKey = ['nftBalance']

interface NftItem {
  address: string,
  tokenId: string,
  name: string,
  imagePreviewUrl: string,
  image: string
  collection: {
    stats: {
      floorPrice: string,
      latestPrice: string,
      ownerCount: string,
      totalCount: string,
      totalVolume: string
    }
  }
}

interface INftBalance {
  code: number,
  data?: NftItem[]
}
interface useNftBalanceQueryParams {
  chain: string,
  address?: string
}
// ?chain=eth&address=0x9c92fd4bf4f09dc3291345729784de07bf02a64d
export const useOkxNftBalance = (params: useNftBalanceQueryParams) => {
  return useQuery<INftBalance>({
    queryKey: [queryKey, params],
    queryFn: async () => {
      try {
        const query = new URLSearchParams(params as any).toString()
        console.log(query)

        const res = await fetch(`/api/v2/okx/nft/getAssetList${query ? `?${query}` : ''}`)
        const data = await res.json()
        return {
          code: data.code,
          data: data?.data?.data as NftItem[]
        }
      } catch (e) {
        return { code: -1 }
      }
    },
    enabled: Boolean(params.address)
  })
}
