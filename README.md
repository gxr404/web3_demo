# web3 demo

## 功能

- login
- transaction
- nft list(基于OKX接口)

## env

```bash
# jwt secret 自定义
AUTH_SECRET=xxx

# okx wass 相关配置<https://www.okx.com/zh-hans/web3/build/docs/waas/rest-authentication>
OKX_WASS_API_KEY=xxxx
OKX_WASS_SECRET_KEY=xxxx
OKX_WASS_PASSPHRASE=xxxx
OKX_WASS_PROJECT=xxx

# NEXT_PUBLIC_PROJECT_ID <https://cloud.walletconnect.com> 申请
NEXT_PUBLIC_PROJECT_ID=<YOUR_PROJECT_ID>
```

## 使用的库

- [viem](https://viem.sh/)
- [wagmi](https://wagmi.sh/): wagmi 依赖viem
- [rainbowkit](https://www.rainbowkit.com/)
- [chakra](https://v2.chakra-ui.com/)
