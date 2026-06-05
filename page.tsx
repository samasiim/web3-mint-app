'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      gap: '20px' 
    }}>
      <h1>خوش آمدید به برنامه مینت وب ۳</h1>
      <p>لطفاً کیف پول خود را متصل کنید:</p>
      
      {/* دکمه جادویی اتصال متامسک و بقیه کیف پول‌ها */}
      <ConnectButton />
      
    </main>
  );
}
