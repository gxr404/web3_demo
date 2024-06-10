import { type NextRequest } from "next/server"
import jwt from 'jsonwebtoken'
import { RESPONSE_CODE } from "../../constant"
import { getSignMessage } from "../../common"


export async function GET(req: NextRequest) {
  const nonce = new Date().getTime()
  const searchParams = req.nextUrl.searchParams
  const address = searchParams.get('address')
  if (!address) {
    return Response.json({
      code: RESPONSE_CODE.SUCCESS,
      data: { nonce }
    })
  }
  const tempToken = jwt.sign({ nonce, address }, process.env.AUTH_SECRET, {
    expiresIn: '120s',
  })
  const message = getSignMessage(address, nonce)
  return Response.json({
    code: RESPONSE_CODE.SUCCESS,
    data: { tempToken, message, address, nonce }
  })
}
