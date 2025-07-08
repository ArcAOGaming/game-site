import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout, Analytics, Loading } from './shared/components'
import { ThemeProvider } from './shared/contexts/ThemeContext'
import { createRoute } from './utils/routing'
import Home from './pages/Home/Home'

// Create route with automatic eager loading
const About = createRoute(() => import('./pages/About/About'))

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Analytics>
          <Layout>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Suspense>
          </Layout>
        </Analytics>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
