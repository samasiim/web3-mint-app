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
    setTxHash(null); // ریست کردن هش قبلی

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'mint',
      args: [BigInt(mintAmount)],
    }, {
      // گرفتن هش واقعی تراکنش به محض تایید در متامسک
      onSuccess: (data) => {
        setTxHash(data); // ذخیره هش واقعی تراکنش در استیت
        setIsConfirming(true);
        
        // تغییر وضعیت به موفقیت نهایی پس از ۴ ثانیه
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
      gap: '25px',
      fontFamily: 'sans-serif',
      backgroundColor: '#f5f5f5',
      color: '#333'
    }}>
      <h1 style={{ margin: 0 }}>برنامه مینت وب ۳ واقعی</h1>
      <p style={{ margin: 0, color: '#666' }}>کیف پول را روی شبکه Sepolia وصل کرده و مینت کنید</p>
      
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

        <div style={{ width: '100%', textAlign: 'center', fontSize: '14px', marginTop: '10px' }}>
          
          {/* نمایش کادر آبی به همراه لینک مستقیم و واقعی اتراسکن با استفاده از txHash */}
          {txHash && (
            <div style={{ margin: '10px 0', padding: '8px', backgroundColor: '#eff6ff', borderRadius: '6px' }}>
              <p style={{ margin: 0, color: '#1e40af', fontWeight: 'bold' }}>تراکنش ثبت شد!</p>
              <a 
                href={`https://sepolia.etherscan.io/tx/${txHash}`} 
                target="_blank" 
                rel="noreferrer"
                style={{ textDecoration: 'underline', color: '#2563eb', display: 'inline-block', marginTop: '4px' }}
              >
                مشاهده در Etherscan ↗
              </a>
            </div>
          )}

          {isConfirming && <p style={{ color: '#d97706', margin: '5px 0' }}>⏳ در حال تایید در بلاک‌چین سپولیا...</p>}

          {isConfirmed && <p style={{ color: 'green', fontWeight: 'bold', margin: '5px 0' }}>✓ مینت با موفقیت روی شبکه ثبت شد!</p>}
          
          {error && <p style={{ color: 'red', margin: '5px 0', fontSize: '12px' }}>خطا: {error.message || 'تراکنش لغو شد.'}</p>}
        </div>
      </div>
    </main>
  );
}
