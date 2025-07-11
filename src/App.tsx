import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout, Analytics, Loading } from './shared/components'
import { ThemeProvider } from './shared/contexts/ThemeContext'
import { createRoute } from './utils/routing'
import Home from './pages/Home/Home'

// Create routes with automatic eager loading
const Mint = createRoute(() => import('./pages/Mint/Mint'))
const Earn = createRoute(() => import('./pages/Earn/Earn'))

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Analytics>
          <Layout>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mint" element={<Mint />} />
                <Route path="/earn" element={<Earn />} />
              </Routes>
            </Suspense>
          </Layout>
        </Analytics>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
