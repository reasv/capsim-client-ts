import { HashRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"

import './index.css'
import { Layout } from './views/layout'
import { AuthCheck } from './views/authCheck'
import { Dashboard } from './views/mainDashboard'

function App() {
  return (
    <HashRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
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
