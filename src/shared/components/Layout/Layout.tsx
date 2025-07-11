import { ReactNode } from 'react'
import { TopBar } from '../TopBar'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-container">
      <TopBar />
      <main className="layout-main">
        {children}
      </main>
    </div>
  )
}
