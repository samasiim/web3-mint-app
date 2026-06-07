'use client';
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  const [mintAmount, setMintAmount] = useState(1);
  
  // وضعیت‌های شبیه‌سازی شده برای تست ظاهر برنامه
  const [isPending, setIsPending] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [hash, setHash] = useState<string | null>(null);

  const incrementAmount = () => {
    if (mintAmount < 10) setMintAmount(mintAmount + 1);
  };

  const decrementAmount = () => {
    if (mintAmount > 1) setMintAmount(mintAmount - 1);
  };

  // تابع شبیه‌سازی مراحل تراکنش
  const handleMintFake = () => {
    // ۱. ابتدا وضعیت تایید در کیف پول
    setIsPending(true);
    setIsConfirmed(false);
    setHash(null);

    setTimeout(() => {
      setIsPending(false);
      setIsConfirming(true);
      // تولید یک هش تراکنش فرضی برای نمایش لینک اتراسکن
      setHash('0x4e3a475143a85404bc032c525f6fa034078be1cf3ee43f2ff110d7ef5b839b23');
    }, 2000); // بعد از ۲ ثانیه فرستاده می‌شود به شبکه

    setTimeout(() => {
      setIsConfirming(false);
      setIsConfirmed(true);
    }, 5000); // بعد از ۵ ثانیه تایید نهایی می‌شود
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
      <p style={{ margin: 0, color: '#666' }}>وضعیت دکمه و لینک تراکنش را تست کنید</p>
      
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
          <button onClick={decrementAmount} style={{ padding: '8px 16px', fontSize: '18px', cursor: 'pointer', borderRadius: '6px', border: '1px solid #ccc' }}>-</button>
          <span style={{ fontSize: '22px', fontWeight: 'bold' }}>{mintAmount}</span>
          <button onClick={incrementAmount} style={{ padding: '8px 16px', fontSize: '18px', cursor: 'pointer', borderRadius: '6px', border: '1px solid #ccc' }}>+</button>
        </div>

        <button 
          onClick={handleMintFake}
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

        <div style={{ width: '100%', textAlign: 'center', fontSize: '14px' }}>
          {hash && (
            <p style={{ margin: '5px 0', color: '#2563eb' }}>
              <a href={`https://etherscan.io{hash}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>
                مشاهده تراکنش در Etherscan ↗
              </a>
            </p>
          )}
          {isConfirmed && <p style={{ color: 'green', fontWeight: 'bold', margin: '5px 0' }}>✓ مینت با موفقیت انجام شد!</p>}
        </div>
      </div>
    </main>
  );
  
}
