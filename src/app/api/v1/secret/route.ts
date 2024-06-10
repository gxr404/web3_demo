import { headers } from 'next/headers'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { jwtSecret, RESPONSE_CODE } from '../../constant'

export async function GET() {
  const headersList = headers()
  const authHeader = headersList.get('authorization')
  const tempToken = authHeader && authHeader.split(' ')[1]
  if (!tempToken) {
    return new Response('No authorized', {
      status: 401
    })
  }
  try {
    // const userData =
    jwt.verify(tempToken, jwtSecret) as JwtPayload
    // req.authData = authData
    return Response.json({
      code: RESPONSE_CODE.SUCCESS,
      msg: 'This is a secret message for authenticated users'
    })
  } catch(err) {
    return new Response('No authorized', {
      status: 401
    })
  }

}
