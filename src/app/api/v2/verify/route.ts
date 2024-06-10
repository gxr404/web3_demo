import { type NextRequest } from "next/server"
import jwt from 'jsonwebtoken'
import { verifyMessage } from 'viem'
import { RESPONSE_CODE } from "../../constant"

export async function POST(req: NextRequest) {
  const { signature, address, message } = await req.json()
  if (!signature || !address || !message) {
    return Response.json({
      code: RESPONSE_CODE.ERROR,
      msg: 'Missing parameter'
    })
  }

  const valid = await verifyMessage({
    address: address as `0x${string}`,
    message,
    signature: signature as `0x${string}`
  })
  if (valid) {
    const token = jwt.sign({ address }, process.env.AUTH_SECRET, { expiresIn: '1d' })
    const now = new Date()
    now.setTime(now.getTime() + 24 * 60 * 60 * 1000)
    return Response.json({
      code: RESPONSE_CODE.SUCCESS,
      msg: 'user verified success',
      data: { token }
    }, {
        headers: { 'Set-Cookie': `token=${token}; Expires=${now.toUTCString()}; Path=/; Secure;` },
    })
  }
  return Response.json({
    code: RESPONSE_CODE.VERIFY_ERROR,
    msg: 'user verified error'
  })
}
