import { executeTransaction } from '@cardinal/common'
import { rewardsCenterProgram } from '@sensei-labs/rewards-center'
import { BN } from '@coral-xyz/anchor'
import { useWallet } from '@solana/wallet-adapter-react'
import type { PublicKey } from '@solana/web3.js'
import { Transaction } from '@solana/web3.js'
import { notify } from 'common/Notification'
import { asWallet } from 'common/Wallets'
import { useMutation } from 'react-query'

import { isStakePoolV2, useStakePoolData } from '../hooks/useStakePoolData'
import { useEnvironmentCtx } from '../providers/EnvironmentProvider'

export const useHandleMultiplierStakeSecondsIncrement = () => {
  const wallet = asWallet(useWallet())
  const { connection } = useEnvironmentCtx()
  const stakePool = useStakePoolData()
  return useMutation(
    async ({
      stakeEntryId,
      multiplierStakeSeconds,
    }: {
      stakeEntryId: PublicKey
      multiplierStakeSeconds: number
    }): Promise<string> => {
      if (!wallet.publicKey) throw 'Wallet is not connected'
      if (!stakePool.data || !stakePool.data.parsed || !stakePool.data.pubkey) {
        throw 'No stake pool found'
      }
      if (!isStakePoolV2(stakePool.data.parsed)) {
        throw 'Upgrade stake pool version'
      }
      const stakePoolId = stakePool.data.pubkey
      const tx = new Transaction()
      const ix = await rewardsCenterProgram(connection, wallet)
        .methods.incrementStakeEntryMultiplierStakeSeconds(
          new BN(multiplierStakeSeconds)
        )
        .accountsStrict({
          stakeEntry: stakeEntryId,
          stakePool: stakePoolId,
          authority: wallet.publicKey,
        })
        .instruction()
      tx.add(ix)
      return executeTransaction(connection, tx, wallet)
    },
    {
      onSuccess: (txid) => {
        notify({
          txid,
          message: 'Succesful transaction',
          description: `Stake entry has been incremented succesfully`,
        })
      },
      onError: (e) => {
        notify({
          message: 'Failed to generate transactions',
          description: `${e}`,
        })
      },
    }
  )
}
