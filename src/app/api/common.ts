import crypto  from 'node:crypto'
import querystring from 'node:querystring'

export const getSignMessage = (address: string, nonce: number) => {
  return `Please sign this message for address ${address}:\n\n${nonce}`
}

type Method = 'GET' | 'POST'

function preHash(timestamp: string, method: Method, requestPath: string, params: {[key: string]: any}) {
  // 根据字符串和参数创建预签名
  let query_string = '';
  if (method === 'GET' && params) {
    query_string = '?' + querystring.stringify(params);
  }
  if (method === 'POST' && params) {
    query_string = JSON.stringify(params);
  }
  return timestamp + method + requestPath + query_string;
}

function sign(message: string, secretKey: string) {
  // 使用 HMAC-SHA256 对预签名字符串进行签名
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(message);
  return hmac.digest('base64');
}

//
/**
 * 生成okx 的 wass 请求头
 * @param requestPath 请求路径不带域名 @example '/api/v5/mktplace/nft/markets/create-listing'
 * @param method
 * @param params
 * @returns
 */
export function genOkxReqHeader(requestPath: string, method: 'GET' | 'POST', params: any) {
  // 获取 ISO 8601 格式时间戳
  const timestamp = new Date().toISOString().slice(0, -5) + 'Z';
  const header = {
    'OK-ACCESS-KEY': process.env.OKX_WASS_API_KEY,
    'OK-ACCESS-PASSPHRASE': process.env.OKX_WASS_PASSPHRASE,
    'OK-ACCESS-TIMESTAMP': timestamp,
    'OK-ACCESS-SIGN': '',
    'OK-ACCESS-PROJECT': process.env.OKX_WASS_PROJECT,
  }
  // 生成签名
  const message = preHash(timestamp, method, requestPath, params)
  const signature = sign(message, process.env.OKX_WASS_SECRET_KEY);
  header['OK-ACCESS-SIGN'] = signature
  // 'OK-ACCESS-TIMESTAMP': '',
  // 'OK-ACCESS-SIGN': '',
  return header
}
