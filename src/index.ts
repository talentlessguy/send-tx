import { Transaction as Tx, TxData } from '@ethereumjs/tx'
import { ethers, providers } from 'ethers'

/**
 * Initialize a `sendTx` function with an ethers.js provider
 * @param provider ethers.js provider
 * @returns `sendTx` function
 * @example
 * ```js
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
 */
export const initSignTx = (provider: providers.BaseProvider) => {
  /**
   * @returns transaction receipt
   */
  return async function sendTx({
    from,
    fromPrivateKey,
    gasLimit = ethers.utils.hexlify(21000),
    ...opts
  }: TxData & { from: string; fromPrivateKey: string }) {
    const txCount = await provider.getTransactionCount(from)

    // build the transaction
    const tx = new Tx({
      nonce: ethers.utils.hexlify(txCount),
      gasLimit,
      ...opts
    })

    // sign the transaction
    tx.sign(Buffer.from(fromPrivateKey, 'hex'))

    // send the transaction
    const { hash } = await provider.sendTransaction('0x' + tx.serialize().toString('hex'))
    return await provider.waitForTransaction(hash)
  }
}
