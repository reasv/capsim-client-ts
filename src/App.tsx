import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"


import './index.css'
import { Dashboard } from './views/dashboard'
function App() {
  return (
    <>
    <HashRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Dashboard />
      </ThemeProvider>
    </HashRouter>
    </>
  )
}

export default App
