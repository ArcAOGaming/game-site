import { ReactNode } from 'react'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-container">
      <main className="layout-main">
        {children}
      </main>
    </div>
  )
}
