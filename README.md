# send-tx

Sign & send Ethereum transactions with ease.

## Install

```sh
pnpm i sign-tx ethers
```

## Example

### Send ETH

```ts
import { initSignTx } from 'sign-tx'
import { ethers } from 'ethers'

const signer = new ethers.Wallet('PRIVATE_KEY', provider)

const provider = providers.getDefaultProvider(JSONRPC_URL)

const signTx = initSignTx(provider)

const receipt = await signTx({
  from: 'bob.eth',
  to: 'tom.eth',
  value: 0.001
})
```

### Swap

```ts
import { initSignTx } from 'sign-tx'
import { ethers } from 'ethers'

const signer = new ethers.Wallet('PRIVATE_KEY', provider)

const provider = providers.getDefaultProvider(JSONRPC_URL)

const signTx = initSignTx(provider)

contract = new ethers.Contract(ROUTER, CONTRACT_ABI)

const swap = contract.swapExactTokensForTokens(inputAmountHex, amountOutMinHex, path, WALLET, deadlineHex)

const receipt = await signTx({
  from: signer,
  nonce: ethers.BigNumber.from(txCount),
  gasLimit: ethers.BigNumber.from('150000'),
  gasPrice: ethers.BigNumber.from(gasPrice),
  to: ROUTER,
  data: data
})
```
