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
  useWaitForTransactionReceipt,
} from 'wagmi'

export function WalletActions() {
  const { isEthProviderAvailable } = useFrame()
  const { isConnected, address, chainId } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: hash, sendTransaction } = useSendTransaction()
  const { switchChain } = useSwitchChain()
  const { connect } = useConnect()

  // --- parámetros de la demo (mismos que ya usabas, solo extraídos para mostrarlos en UI)
  const toAddress = '0x3aA77378079f34f4d756ffa8bB23c713676c298A'
  const amountEth = '0.001'

  // Espera de recibo para feedback visual (no cambia tu lógica de envío)
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: hash ?? undefined,
      chainId: monadTestnet.id,
    })

  async function sendTransactionHandler() {
    sendTransaction({
      to: toAddress,
      value: parseEther(amountEth),
    })
  }

  // URL al explorer cuando haya hash
  const explorerUrl = hash
    ? `https://testnet.monadexplorer.com/tx/${hash}`
    : null

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

                {/* Resumen de la tx para que el usuario sepa qué va a pasar */}
                <div className="text-sm text-left text-zinc-300">
                  <div>
                    To:{' '}
                    <span
                      className="bg-white text-black font-mono rounded-md px-2 py-0.5 inline-block max-w-full sm:max-w-[420px] truncate align-middle"
                      title={toAddress}
                    >
                      {toAddress}
                    </span>
                  </div>
                  <div className="mt-1">
                    Amount:{' '}
                    <span className="bg-white text-black font-mono rounded-md px-2 py-0.5">
                      {amountEth} MON
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <button
                    type="button"
                    className="bg-white text-black rounded-md p-2 text-sm w-full sm:w-auto hover:opacity-90 transition"
                    onClick={sendTransactionHandler}
                  >
                    Send Transaction
                  </button>

                  {hash && (
                    <>
                      <button
                        type="button"
                        className="bg-white text-black rounded-md p-2 text-sm w-full sm:w-auto hover:opacity-90 transition"
                        onClick={() => window.open(explorerUrl!, '_blank')}
                      >
                        View Transaction
                      </button>
                      <button
                        type="button"
                        className="bg-white text-black rounded-md p-2 text-sm w-full sm:w-auto hover:opacity-90 transition"
                        onClick={() => navigator.clipboard.writeText(explorerUrl!)}
                      >
                        Copy link
                      </button>
                    </>
                  )}
                </div>

                {/* Estado en vivo de la transacción */}
                {hash && (
                  <div className="text-sm mt-2 space-y-1" aria-live="polite">
                    <div className="break-all">
                      Hash:{' '}
                      <code title={hash} className="bg-white text-black rounded px-1">
                        {hash}
                      </code>
                    </div>
                    {isConfirming && (
                      <p className="text-zinc-300">Confirming…</p>
                    )}
                    {isConfirmed && (
                      <p className="text-green-500">Tx confirmed ✔</p>
                    )}
                  </div>
                )}
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
        <div className="flex flex-row space-x-4 justify-start items-start w-full">
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
