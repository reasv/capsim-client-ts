import { HashRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"

import './index.css'
import { Layout } from './views/layout'
import { PortfolioForm } from './views/portfolioForm'
import { AuthCheck } from './views/authCheck'

function App() {
  return (
    <HashRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <PortfolioForm />
              </Layout>
            }
          />
          <Route
            path="/admin"
            element={
              <Layout>
                <AuthCheck/>
              </Layout>
            }
          />
        </Routes>
      </ThemeProvider>
    </HashRouter>
  )
}

export default App
