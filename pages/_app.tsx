import './styles.css'
import '@cardinal/namespaces-components/dist/esm/styles.css'
import 'tailwindcss/tailwind.css'

import { WalletIdentityProvider } from '@cardinal/namespaces-components'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'common/Notification'
import type { AppProps } from 'next/app'
import {
  EnvironmentProvider,
  getInitialProps,
} from 'providers/EnvironmentProvider'
import { ModalProvider } from 'providers/ModalProvider'
import { StakePoolMetadataProvider } from 'providers/StakePoolMetadataProvider'
import { UTCNowProvider } from 'providers/UTCNowProvider'
import { useMemo } from 'react'

require('@solana/wallet-adapter-react-ui/styles.css')

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
})

const App = ({
  Component,
  pageProps,
  cluster,
  hostname,
}: AppProps & {
  cluster: string
  hostname: string
}) => {
  const network = useMemo(() => {
    switch (cluster) {
      case 'mainnet':
        return WalletAdapterNetwork.Mainnet
      case 'devnet':
        return WalletAdapterNetwork.Devnet
      case 'testnet':
        return WalletAdapterNetwork.Testnet
      default:
        return WalletAdapterNetwork.Mainnet
    }
  }, [cluster])

  const wallets = useMemo(() => [], [network])

  return (
    <EnvironmentProvider defaultCluster={cluster}>
      <QueryClientProvider client={queryClient}>
        <StakePoolMetadataProvider hostname={hostname}>
          <UTCNowProvider>
            <WalletProvider autoConnect wallets={wallets}>
              <WalletIdentityProvider>
                <WalletModalProvider>
                  <ModalProvider>
                    <>
                      <ToastContainer />
                      <div
                        style={{
                          maxWidth: '1440px',
                          margin: '0 auto',
                        }}
                      >
                        <Component {...pageProps} />

                        <style jsx global>
                          {`
                            .bg-glow {
                              background-color: rgb(187 146 206) !important;
                            }
                          `}
                        </style>
                      </div>
                      <ReactQueryDevtools initialIsOpen={false} />
                    </>
                  </ModalProvider>
                </WalletModalProvider>
              </WalletIdentityProvider>
            </WalletProvider>
          </UTCNowProvider>
        </StakePoolMetadataProvider>
      </QueryClientProvider>
    </EnvironmentProvider>
  )
}

App.getInitialProps = getInitialProps

export default App
