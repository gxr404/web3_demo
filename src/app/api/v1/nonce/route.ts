import { type NextRequest } from "next/server"
import jwt from 'jsonwebtoken'
import { RESPONSE_CODE, jwtSecret } from "../../constant"
import { getSignMessage } from "../../common"



export async function GET(req: NextRequest) {
  const nonce = new Date().getTime()
  const searchParams = req.nextUrl.searchParams
  const address = searchParams.get('address')
  if (!address) {
    return Response.json({
      code: RESPONSE_CODE.ERROR,
      message: 'query address not found'
    })
  }
  const tempToken = jwt.sign({ nonce, address }, jwtSecret, {
    expiresIn: '120s',
  })
  const message = getSignMessage(address, nonce)
  return Response.json({
    code: RESPONSE_CODE.SUCCESS,
    data: { tempToken, message, address, nonce }
  })
}



// app.get('/nonce', (req, res) => {
//   const nonce = new Date().getTime()
//   const address = req.query.address

//   const tempToken = jwt.sign({ nonce, address }, jwtSecret, {
//     expiresIn: '120s',
//   })
//   const message = getSignMessage(address, nonce)
//   res.json({ tempToken, message })
// })
