'use client';

import { WagmiProvider, cookieToInitialState } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ToastProvider from '@/contexts/toastContext';
import SpinnerProvider from '@/contexts/spinnerContext';
import { config } from '@/lib/config';
import { Web3Provider } from '@/contexts/web3Context';

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
  cookie?: string | null;
};

export default function Providers({ children, cookie }: Props) {
  const initialState = cookieToInitialState(config, cookie);

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#0E76FD',
            accentColorForeground: 'white',
            borderRadius: 'large',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
        >
          <ToastProvider>
            <SpinnerProvider>
              <Web3Provider>{children}</Web3Provider>
            </SpinnerProvider>
          </ToastProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
