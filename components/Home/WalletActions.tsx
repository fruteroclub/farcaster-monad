import { useFrame } from '@/components/farcaster-provider'
import { farcasterMiniApp as miniAppConnector } from '@farcaster/miniapp-wagmi-connector'
import { sdk } from '@farcaster/miniapp-sdk'
import { parseEther } from 'viem'
import { monadTestnet } from 'viem/chains'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSendTransaction,
  useSwitchChain,
} from 'wagmi'

export function WalletActions() {
  const { isEthProviderAvailable } = useFrame()
  const { isConnected, address, chainId } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: hash, sendTransaction } = useSendTransaction()
  const { switchChain } = useSwitchChain()
  const { connect } = useConnect()

  async function sendTransactionHandler() {
    sendTransaction({
      to: '0x3aA77378079f34f4d756ffa8bB23c713676c298A',
      value: parseEther('0.001'),
    })
  }

  if (isConnected) {
    return (
      <div className="space-y-4 border border-[#333] rounded-md p-4">
        <h2 className="text-xl font-bold text-left">sdk.wallet.ethProvider</h2>

        {/* stack en mobile, fila en desktop */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-start items-start">
          <div className="flex flex-col space-y-4 justify-start w-full">
            <p className="text-sm text-left">
              Connected to wallet:{' '}
              <span
                className="bg-white font-mono text-black rounded-md px-2 py-1 inline-block max-w-full sm:max-w-[420px] truncate align-middle"
                title={address}
              >
                {address}
              </span>
            </p>

            <p className="text-sm text-left">
              Chain Id:{' '}
              <span className="bg-white font-mono text-black rounded-md px-2 py-1 inline-block min-w-[56px] text-center">
                {chainId}
              </span>
            </p>

            {chainId === monadTestnet.id ? (
              <div className="flex flex-col space-y-3 border border-[#333] p-4 rounded-md">
                <h2 className="text-lg font-semibold text-left">
                  Send Transaction Example
                </h2>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <button
                    type="button"
                    className="bg-white text-black rounded-md p-2 text-sm w-full sm:w-auto hover:opacity-90 transition"
                    onClick={sendTransactionHandler}
                  >
                    Send Transaction
                  </button>

                  {hash && (
                    <button
                      type="button"
                      className="bg-white text-black rounded-md p-2 text-sm w-full sm:w-auto hover:opacity-90 transition"
                      onClick={() =>
                        window.open(
                          `https://testnet.monadexplorer.com/tx/${hash}`,
                          '_blank',
                        )
                      }
                    >
                      View Transaction
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="bg-white text-black rounded-md p-2 text-sm w-full sm:w-auto hover:opacity-90 transition"
                onClick={() => switchChain({ chainId: monadTestnet.id })}
              >
                Switch to Monad Testnet
              </button>
            )}

            <button
              type="button"
              className="bg-white text-black rounded-md p-2 text-sm w-full sm:w-auto hover:opacity-90 transition"
              onClick={() => disconnect()}
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isEthProviderAvailable) {
    return (
      <div className="space-y-4 border border-[#333] rounded-md p-4">
        <h2 className="text-xl font-bold text-left">sdk.wallet.ethProvider</h2>
        <div className="flex flex-row space-x-4 justify-start items-start">
          <button
            type="button"
            className="bg-white text-black w-full rounded-md p-2 text-sm hover:opacity-90 transition"
            onClick={() => connect({ connector: miniAppConnector() })}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 border border-[#333] rounded-md p-4">
      <h2 className="text-xl font-bold text-left">sdk.wallet.ethProvider</h2>
      <div className="flex flex-row space-x-4 justify-start items-start">
        <p className="text-sm text-left">Wallet connection only via Warpcast</p>
      </div>
    </div>
  )
}
