'use client';
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWriteContract } from 'wagmi';

// آدرس قرارداد هوشمند تست روی شبکه سپولیا
const CONTRACT_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';

// ساختار ساده ABI برای معرفی تابع mint به برنامه
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
  
  // استفاده از ابزار واگمی برای ارسال تراکنش به متامسک
  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  const incrementAmount = () => {
    if (mintAmount < 10) setMintAmount(mintAmount + 1);
  };

  const decrementAmount = () => {
    if (mintAmount > 1) setMintAmount(mintAmount - 1);
  };

  // تابع اصلی فرستادن تراکنش به متامسک
  const handleMint = () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'mint',
      args: [BigInt(mintAmount)], // تبدیل تعداد به فرمت عددی بلاک‌چین
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
        width: '300px'
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

        {/* دکمه اصلی مینت با مدیریت وضعیت در حال ارسال */}
        <button 
          onClick={handleMint}
          disabled={isPending}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: isPending ? '#94a3b8' : '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: isPending ? 'not-allowed' : 'pointer',
          }}
        >
          {isPending ? 'در حال ارسال به متامسک...' : 'Mint NFT'}
        </button>

        {/* نمایش وضعیت تراکنش به کاربر */}
        {isSuccess && <p style={{ color: 'green', margin: 0 }}>تراکنش با موفقیت به شبکه ارسال شد!</p>}
        {error && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>خطا: کیف پول وصل نیست یا تراکنش لغو شد.</p>}
      </div>
    </main>
  );
}
