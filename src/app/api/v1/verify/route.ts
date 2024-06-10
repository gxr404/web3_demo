import { type NextRequest } from "next/server"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { verifyMessage } from 'viem'
import { headers } from "next/headers"
import { jwtSecret, RESPONSE_CODE } from "../../constant"
import { getSignMessage } from "../../common"

export async function POST(req: NextRequest) {
  const headersList = headers()
  const authHeader = headersList.get('authorization')
  const tempToken = authHeader && authHeader.split(' ')[1]
  if (!tempToken) {
    return new Response( 'Missing authorization header', {
      status: 403
    })
  }
  const userData = jwt.verify(tempToken, jwtSecret) as JwtPayload
  const nonce = userData.nonce
  const address = userData.address
  const message = getSignMessage(address, nonce)
  const searchParams = req.nextUrl.searchParams
  const signature = searchParams.get('signature')
  if (!signature) {
    return Response.json({
      code: RESPONSE_CODE.ERROR,
      message: 'query signature not found'
    })
  }

  const valid = await verifyMessage({
    address,
    message,
    signature: signature as `0x${string}`
  })
  if (valid) {
    const token = jwt.sign({ address }, jwtSecret, { expiresIn: '1d' })
    return Response.json({
      code: RESPONSE_CODE.SUCCESS,
      message: 'user verified success',
      data: { token }
    })
  }
  return Response.json({
    code: RESPONSE_CODE.VERIFY_ERROR,
    message: 'user verified error'
  })
}
