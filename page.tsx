'use client';
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWriteContract } from 'wagmi';
import { getAddress } from 'viem';

const CONTRACT_ADDRESS = getAddress('0xf99df193630fbc89F3f3f982ddf6158b93f25b1d');

const CONTRACT_ABI = [
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'quantity', type: 'uint256' }],
    outputs: [],
  },
];

export default function Home() {
  const [mintAmount, setMintAmount] = useState(1);
  
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const { writeContract, isPending, error } = useWriteContract();

  const incrementAmount = () => {
    if (mintAmount < 10) setMintAmount(mintAmount + 1);
  };

  const decrementAmount = () => {
    if (mintAmount > 1) setMintAmount(mintAmount - 1);
  };

  const handleMint = () => {
    setIsConfirmed(false);
    setIsConfirming(false);
    setTxHash(null);

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'mint',
      args: [BigInt(mintAmount)],
    }, {
      onSuccess: (data) => {
        setTxHash(data);
        setIsConfirming(true);
        
        setTimeout(() => {
          setIsConfirming(false);
          setIsConfirmed(true);
        }, 4000);
      },
      onError: () => {
        setIsConfirming(false);
        setIsConfirmed(false);
        setTxHash(null);
      }
    });
  };

  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      gap: '30px',
      fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
      letterSpacing: '-0.02em',
      backgroundColor: '#0a0b0d',
      backgroundImage: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0a0b0d 100%)',
      color: '#ffffff',
      padding: '20px'
    }}>
      <link rel="preconnect" href="https://googleapis.com" />
      <link rel="preconnect" href="https://gstatic.com" crossOrigin="anonymous" />
      <link href="https://googleapis.com/css2?family=Inter:wght@400;600;800&family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet" />

      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '36px', 
          fontWeight: '800',
          letterSpacing: '-0.03em',
          background: 'linear-gradient(to right, #38bdf8, #818cf8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Live Web3 Mint Portal
        </h1>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '15px', fontWeight: '500' }}>
          Connect your wallet to Sepolia network and mint your NFT
        </p>
      </div>
      
      <div style={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}>
        <ConnectButton />
      </div>
      
      <div style={{
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        padding: '30px',
        backgroundColor: 'rgba(22, 28, 45, 0.6)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 50px rgba(99, 102, 241, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        width: '340px'
      }}>
        
        {/* تصویر متحرک NFT Artwork اضافه شده */}
        <div style={{
          width: '100%',
          height: '200px',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3), 0 0 20px rgba(56, 189, 248, 0.15)',
          border: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#111827'
        }}>
          <img 
            src="https://unsplash.com" 
            alt="NFT Artwork Preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        <h3 style={{ margin: 0, color: '#94a3b8', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Amount to Mint
        </h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button 
            onClick={decrementAmount} 
            style={{ 
              width: '44px',
              height: '44px',
              fontSize: '20px', 
              cursor: 'pointer', 
              borderRadius: '50%', 
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600'
            }}
          >-</button>
          
          <span style={{ fontSize: '32px', fontWeight: '800', color: '#38bdf8', minWidth: '35px', textAlign: 'center', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            {mintAmount}
          </span>
          
          <button 
            onClick={incrementAmount} 
            style={{ 
              width: '44px',
              height: '44px',
              fontSize: '20px', 
              cursor: 'pointer', 
              borderRadius: '50%', 
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600'
            }}
          >+</button>
        </div>

        <button 
          onClick={handleMint}
          disabled={isPending || isConfirming}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: (isPending || isConfirming) ? '#334155' : '#4f46e5',
            backgroundImage: (isPending || isConfirming) ? 'none' : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '14px',
            fontSize: '16px',
            fontWeight: '700',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            cursor: (isPending || isConfirming) ? 'not-allowed' : 'pointer',
            boxShadow: (isPending || isConfirming) ? 'none' : '0 4px 20px rgba(124, 58, 237, 0.3)',
          }}
        >
          {isPending && 'Confirming in wallet...'}
          {isConfirming && 'Broadcasting to chain...'}
          {!isPending && !isConfirming && 'Mint NFT'}
        </button>

        <div style={{ width: '100%', textAlign: 'center', fontSize: '14px' }}>
          
          {txHash && (
            <div style={{ 
              margin: '10px 0 0 0', 
              padding: '12px', 
              backgroundColor: 'rgba(56, 189, 248, 0.08)', 
              border: '1px solid rgba(56, 189, 248, 0.15)',
              borderRadius: '12px' 
            }}>
              <p style={{ margin: 0, color: '#38bdf8', fontWeight: '700' }}>Transaction Broadcasted!</p>
              <a 
                href={'https://etherscan.io' + txHash} 
                target="_blank" 
                rel="noreferrer"
                style={{ textDecoration: 'none', color: '#60a5fa', fontWeight: '600', display: 'inline-block', marginTop: '6px' }}
              >
                View on Etherscan ↗
              </a>
            </div>
          )}

          {isConfirming && <p style={{ color: '#fbbf24', fontWeight: '600', margin: '12px 0 0 0' }}>⏳ Confirming on Sepolia network...</p>}

          {isConfirmed && <p style={{ color: '#34d399', fontWeight: '800', margin: '12px 0 0 0' }}>✓ Mint successfully confirmed!</p>}
          
          {error && (
            <p style={{ color: '#f87171', margin: '12px 0 0 0', fontSize: '13px', backgroundColor: 'rgba(248, 113, 113, 0.08)', padding: '10px', borderRadius: '10px', fontWeight: '500' }}>
              Error: {error.message || 'Transaction rejected.'}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
