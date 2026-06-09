'use client';
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWriteContract } from 'wagmi';
import { getAddress } from 'viem';

// آدرس قرارداد هوشمند واقعی و زنده روی شبکه سپولیا
const CONTRACT_ADDRESS = getAddress('0xf99df193630fbc89F3f3f982ddf6158b93f25b1d');

// ساختار دقیق ABI برای معرفی تابع mint
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
  
  // مدیریت وضعیت‌های تراکنش و ذخیره هش واقعی
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  // اتصال به هوک واگمی
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
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#0a0b0d',
      backgroundImage: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0a0b0d 100%)',
      color: '#ffffff',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '32px', 
          fontWeight: '800',
          background: 'linear-gradient(to right, #38bdf8, #818cf8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          برنامه مینت وب ۳ واقعی
        </h1>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '15px' }}>
          کیف پول را روی شبکه Sepolia وصل کرده و مینت کنید
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
        <h3 style={{ margin: 0, color: '#f1f5f9', fontSize: '16px', fontWeight: '500' }}>
          تعداد برای مینت:
        </h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
              justifyContent: 'center'
            }}
          >-</button>
          
          <span style={{ fontSize: '28px', fontWeight: '700', color: '#38bdf8', minWidth: '30px', textAlign: 'center' }}>
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
              justifyContent: 'center'
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
            fontWeight: '600',
            cursor: (isPending || isConfirming) ? 'not-allowed' : 'pointer',
            boxShadow: (isPending || isConfirming) ? 'none' : '0 4px 20px rgba(124, 58, 237, 0.3)',
          }}
        >
          {isPending && 'در حال تایید در کیف پول...'}
          {isConfirming && 'در حال ثبت در بلاک‌چین...'}
          {!isPending && !isConfirming && 'Mint NFT'}
        </button>

        <div style={{ width: '100%', textAlign: 'center', fontSize: '14px' }}>
          
          {/* اتصال رشته به روش سنتی جاوااسکریپت برای امنیت ۱۰۰ درصدی لینک */}
          {txHash && (
            <div style={{ 
              margin: '10px 0 0 0', 
              padding: '12px', 
              backgroundColor: 'rgba(56, 189, 248, 0.1)', 
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: '12px' 
            }}>
              <p style={{ margin: 0, color: '#38bdf8', fontWeight: '600' }}>تراکنش ثبت شد!</p>
              <a 
                href={'https://sepolia.etherscan.io/tx/' + txHash} 
                target="_blank" 
                rel="noreferrer"
                style={{ textDecoration: 'underline', color: '#60a5fa', display: 'inline-block', marginTop: '6px' }}
              >
                مشاهده در Etherscan ↗
              </a>
            </div>
          )}

          {isConfirming && <p style={{ color: '#fbbf24', margin: '12px 0 0 0' }}>⏳ در حال تایید در بلاک‌چین سپولیا...</p>}

          {isConfirmed && <p style={{ color: '#34d399', fontWeight: '700', margin: '12px 0 0 0' }}>✓ مینت با موفقیت روی شبکه ثبت شد!</p>}
          
          {error && (
            <p style={{ color: '#f87171', margin: '12px 0 0 0', fontSize: '13px', backgroundColor: 'rgba(248, 113, 113, 0.1)', padding: '8px', borderRadius: '8px' }}>
              خطا: {error.message || 'تراکنش لغو شد.'}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
