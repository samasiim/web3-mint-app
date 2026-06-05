'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

// تنظیمات استاندارد RainbowKit و Wagmi با هم
const config = getDefaultConfig({
  appName: 'Web3 Mint App',
  projectId: 'YOUR_PROJECT_ID_OR_ANY_STRING', // برای تست فعلاً همین متن بماند
  chains: [mainnet, sepolia],
  ssr: true, // چون از نکست‌جی‌اس استفاده می‌کنی
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
