

import { cookies } from 'next/headers'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { RESPONSE_CODE } from '../../constant'

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) {
    return Response.json({
      code: RESPONSE_CODE.ERROR,
      msg: 'token not found'
    })
  }
  try {
    const userData = jwt.verify(token.value, process.env.AUTH_SECRET) as JwtPayload
    return Response.json({
      code: RESPONSE_CODE.SUCCESS,
      data: userData,
      msg: 'success'
    })
  } catch(err) {
    return Response.json({
      code: RESPONSE_CODE.ERROR,
      msg: 'verify error'
    })
  }

}
