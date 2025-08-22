'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useWriteContract } from 'wagmi';
import { useFrame } from '@/components/farcaster-provider';

// Contract configuration
const JOKE_NFT_CONTRACT_ADDRESS = '0x13ad7149af8564b7730e45b7e0a7a9e9132bb463' as const;

// ABI for the safeMint function with proper TypeScript types
const jokeNftAbi = [
  {
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'joke', type: 'string' }
    ],
    name: 'safeMint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

interface MintJokeButtonProps {
  joke: string;
}

export function MintJokeButton({ joke }: MintJokeButtonProps) {
  const { address, isConnected } = useAccount();
  const { actions } = useFrame();
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { writeContractAsync } = useWriteContract({
    mutation: {
      onError: (err) => {
        console.error('Transaction error:', err);
        setError('Error en la transacción. Por favor, revisa la consola para más detalles.');
      },
    },
  });

  const handleMintJoke = async () => {
    if (!isConnected || !address) {
      setError('Por favor, conecta tu billetera primero.');
      return;
    }

    const trimmedJoke = joke.trim();
    if (!trimmedJoke) {
      setError('Por favor, escribe un chiste antes de mintear.');
      return;
    }

    setError(null);
    setIsSuccess(false);
    setIsMinting(true);

    try {
      const txHash = await writeContractAsync({
        address: JOKE_NFT_CONTRACT_ADDRESS,
        abi: jokeNftAbi,
        functionName: 'safeMint',
        args: [address, trimmedJoke],
      });

      console.log('Transaction hash:', txHash);
      setIsSuccess(true);

      if (actions) {
        try {
          await actions.composeCast({
            text: `¡Acabo de mintear mi chiste como NFT! #ChistesNFT #MonadFarcaster\n\n"${trimmedJoke}"`,
          });
        } catch (castError) {
          console.error('Error posting to Farcaster:', castError);
        }
      }
    } catch (error) {
      console.error('Error minting joke:', error);
      setError('Error al mintear el chiste. Por favor, inténtalo de nuevo.');
    } finally {
      setIsMinting(false);
    }
  };

  const isButtonDisabled = isMinting || !joke.trim() || !isConnected;

  return (
    <div className="w-full space-y-2">
      <button
        onClick={handleMintJoke}
        disabled={isButtonDisabled}
        className={`px-4 py-3 w-full font-semibold rounded-md transition-all duration-200 flex items-center justify-center space-x-2
          ${
            isButtonDisabled
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-[1.02] active:scale-95'
          }
          ${isMinting ? 'opacity-75' : ''}`}
      >
        {isMinting ? (
          <>
            <span className="animate-spin">⏳</span>
            <span>Minteando...</span>
          </>
        ) : (
          <>
            <span>💎</span>
            <span>{isConnected ? 'Mintear Chiste como NFT' : 'Conecta tu billetera'}</span>
          </>
        )}
      </button>

      {error && (
        <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {isSuccess && (
        <div className="text-green-600 text-sm text-center p-2 bg-green-50 rounded-md">
          ¡NFT minteado con éxito! Revisa tu billetera.
        </div>
      )}
    </div>
  );
}
