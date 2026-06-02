'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f5f5f5' }}>
      <main style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h1 style={{ marginBottom: '10px', color: '#333' }}>به برنامه وب ۳ ما خوش آمدید</h1>
        <p style={{ marginBottom: '30px', color: '#666' }}>برای دریافت توکن یا NFT، ابتدا کیف پول خود را متصل کنید</p>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ConnectButton />
        </div>
      </main>
    </div>
  );
}
