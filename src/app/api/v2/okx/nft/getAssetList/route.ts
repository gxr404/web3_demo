

import querystring from 'node:querystring'
import { RESPONSE_CODE } from '@/app/api/constant'
import { NextRequest } from 'next/server'
import { genOkxReqHeader } from '@/app/api/common'

export async function GET(req: NextRequest) {

  const searchParams = req.nextUrl.searchParams
  const chain = searchParams.get('chain')
  const ownerAddress = searchParams.get('address')
  if (!ownerAddress || !chain) {
    return Response.json({
      code: RESPONSE_CODE.ERROR,
      msg: 'Missing parameter'
    })
  }
  const params = {
    chain,
    ownerAddress
  }

  const reqPath = '/api/v5/mktplace/nft/owner/asset-list'
  const domain = 'https://www.okx.com'
  const method = 'GET'
  const headers = genOkxReqHeader(reqPath, method, params)
  console.log(`${domain}${reqPath}?${querystring.stringify(params)}`)
  const res = await fetch(`${domain}${reqPath}?${querystring.stringify(params)}`, {
    headers,
    method
  }).catch(e => {
    return Response.json({
      code: RESPONSE_CODE.VERIFY_ERROR,
      msg: e?.message || 'UNKNOWN ERROR'
    })
  })
  const {code, data, msg} = await res.json()
  if (code !== 0)
    return Response.json({
      code: RESPONSE_CODE.VERIFY_ERROR,
      msg: msg || 'okx request ERROR'
    })
  return Response.json({
    code: RESPONSE_CODE.SUCCESS,
    msg: 'success',
    data
  })
}
