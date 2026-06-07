'use client';
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

// آدرس قرارداد هوشمند تست روی شبکه سپولیا
const CONTRACT_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';

// ساختار ساده ABI برای معرفی تابع mint
const CONTRACT_ABI = [
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: 'quantity', type: 'uint256' }],
    outputs: [],
  },
];

export default function Home() {
  const [mintAmount, setMintAmount] = useState(1);
  
  // ۱. ارسال تراکنش به متامسک و گرفتن هش تراکنش (data)
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  // ۲. انتظار برای تایید نهایی تراکنش روی شبکه بلاک‌چین
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const incrementAmount = () => {
    if (mintAmount < 10) setMintAmount(mintAmount + 1);
  };

  const decrementAmount = () => {
    if (mintAmount > 1) setMintAmount(mintAmount - 1);
  };

  const handleMint = () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'mint',
      args: [BigInt(mintAmount)],
    });
  };

  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      gap: '25px',
      fontFamily: 'sans-serif',
      backgroundColor: '#f5f5f5',
      color: '#333'
    }}>
      <h1 style={{ margin: 0 }}>برنامه مینت وب ۳</h1>
      <p style={{ margin: 0, color: '#666' }}>ابتدا کیف پول خود را وصل کرده و سپس تعداد را مشخص کنید</p>
      
      <ConnectButton />
      
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '12px',
        padding: '24px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        width: '320px'
      }}>
        <h3 style={{ margin: 0 }}>تعداد برای مینت:</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button 
            onClick={decrementAmount} 
            style={{ padding: '8px 16px', fontSize: '18px', cursor: 'pointer', borderRadius: '6px', border: '1px solid #ccc' }}
          >-</button>
          
          <span style={{ fontSize: '22px', fontWeight: 'bold' }}>{mintAmount}</span>
          
          <button 
            onClick={incrementAmount} 
            style={{ padding: '8px 16px', fontSize: '18px', cursor: 'pointer', borderRadius: '6px', border: '1px solid #ccc' }}
          >+</button>
        </div>

        {/* دکمه اصلی با مدیریت وضعیت‌های مختلف شبکه */}
        <button 
          onClick={handleMint}
          disabled={isPending || isConfirming}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: (isPending || isConfirming) ? '#94a3b8' : '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: (isPending || isConfirming) ? 'not-allowed' : 'pointer',
          }}
        >
          {isPending && 'در حال تایید در کیف پول...'}
          {isConfirming && 'در حال ثبت در بلاک‌چین...'}
          {!isPending && !isConfirming && 'Mint NFT'}
        </button>

        {/* بخش نمایش پیام‌ها و لینک اتر‌اسکن */}
        <div style={{ width: '100%', textAlign: 'center', fontSize: '14px' }}>
          {hash && (
            <p style={{ margin: '5px 0', color: '#2563eb' }}>
              <a 
                href={`https://etherscan.io{hash}`} 
                target="_blank" 
                rel="noreferrer"
                style={{ textDecoration: 'underline', color: 'inherit' }}
              >
                مشاهده تراکنش در Etherscan ↗
              </a>
            </p>
          )}
          {isConfirmed && <p style={{ color: 'green', fontWeight: 'bold', margin: '5px 0' }}>✓ مینت با موفقیت انجام شد!</p>}
          {error && <p style={{ color: 'red', margin: '5px 0', fontSize: '12px' }}>خطا: عملیات لغو شد یا موجودی کافی نیست.</p>}
        </div>
      </div>
    </main>
  );
}
