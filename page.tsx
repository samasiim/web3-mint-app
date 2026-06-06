'use client';
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  // تعریف یک وضعیت (State) برای نگه داشتن تعداد NFTها
  const [mintAmount, setMintAmount] = useState(1);

  // تابع افزایش تعداد
  const incrementAmount = () => {
    if (mintAmount < 10) setMintAmount(mintAmount + 1);
  };

  // تابع کاهش تعداد
  const decrementAmount = () => {
    if (mintAmount > 1) setMintAmount(mintAmount - 1);
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
      
      {/* دکمه اتصال کیف پول رینبوکیت */}
      <ConnectButton />
      
      {/* باکس فرم مینت */}
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
        width: '300px'
      }}>
        <h3 style={{ margin: 0 }}>تعداد برای مینت:</h3>
        
        {/* دکمه‌های کم و زیاد کردن تعداد */}
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

        {/* دکمه اصلی عملیات مینت */}
        <button style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#3b82f6',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
        onClick={() => alert(`درخواست مینت برای ${mintAmount} NFT ثبت شد!`)}
        >
          Mint NFT
        </button>
      </div>
    </main>
  );
}
