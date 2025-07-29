import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout, Analytics, Loading } from './shared/components'
import { ThemeProvider, EthereumWalletProvider, EthereumWalletTokensProvider, AOSTETHStakingProvider, AODAIStakingProvider, AOUSDSStakingProvider, BazarProvider, DelegationProvider, ArweaveAOWalletProvider, GameTokenProvider } from './shared/contexts'
import { GameFLPProvider } from './shared/contexts/GameFLP'
import { createRoute } from './utils/routing'
import Home from './pages/Home/Home'

// Create routes with automatic eager loading
const Mint = createRoute(() => import('./pages/Mint/Mint'))
const Earn = createRoute(() => import('./pages/Earn/Earn'))
const Ai = createRoute(() => import('./pages/Ai/Ai'))

function App() {
  return (
    <ThemeProvider>
      <ArweaveAOWalletProvider>
        <EthereumWalletProvider>
          <EthereumWalletTokensProvider>
            <AOSTETHStakingProvider>
              <AODAIStakingProvider>
                <AOUSDSStakingProvider>
                  <BazarProvider>
                    <GameFLPProvider>
                      <GameTokenProvider>
                        <DelegationProvider>
                          <BrowserRouter>
                            <Analytics>
                              <Layout>
                                <Suspense fallback={<Loading />}>
                                  <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/mint" element={<Mint />} />
                                    <Route path="/earn" element={<Earn />} />
                                    <Route path="/ai" element={<Ai />} />
                                  </Routes>
                                </Suspense>
                              </Layout>
                            </Analytics>
                          </BrowserRouter>
                        </DelegationProvider>
                      </GameTokenProvider>
                    </GameFLPProvider>
                  </BazarProvider>
                </AOUSDSStakingProvider>
              </AODAIStakingProvider>
            </AOSTETHStakingProvider>
          </EthereumWalletTokensProvider>
        </EthereumWalletProvider>
      </ArweaveAOWalletProvider>
    </ThemeProvider>
  )
}

export default App
