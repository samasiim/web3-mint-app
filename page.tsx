'use client';
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

// آدرس قرارداد هوشمند واقعی و زنده روی شبکه سپولیا
// آدرس قرارداد هوشمند با حروف کاملاً کوچک
const CONTRACT_ADDRESS = '0xf99df193630fbc89f3f3f982ddf6158b93f25b1d';

// ساختار دقیق ABI برای تابع mint
const CONTRACT_ABI = [
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'nonpayable', // رایگان بدون نیاز به ارسال اتر
    inputs: [{ name: 'quantity', type: 'uint256' }],
    outputs: [],
  },
];

export default function Home() {
  const [mintAmount, setMintAmount] = useState(1);
  
  // اتصال به هوک واقعی واگمی برای ارسال تراکنش
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  // انتظار واقعی برای تایید تراکنش در شبکه سپولیا
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const incrementAmount = () => {
    if (mintAmount < 10) setMintAmount(mintAmount + 1);
  };

  const decrementAmount = () => {
    if (mintAmount > 1) setMintAmount(mintAmount - 1);
  };

  // تابع اصلی ارسال تراکنش واقعی به متامسک
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

        <div style={{ width: '100%', textAlign: 'center', fontSize: '14px' }}>
          {hash && (
            <p style={{ margin: '5px 0', color: '#2563eb' }}>
              <a href={`https://etherscan.io{hash}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>
                مشاهده تراکنش در Etherscan ↗
              </a>
            </p>
          )}
          {isConfirmed && <p style={{ color: 'green', fontWeight: 'bold', margin: '5px 0' }}>✓ مینت واقعی با موفقیت انجام شد!</p>}
          {error && <p style={{ color: 'red', margin: '5px 0', fontSize: '12px' }}>خطا: {error.shortMessage || 'تراکنش لغو شد.'}</p>}
        </div>
      </div>
    </main>
  );
}
