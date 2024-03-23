import { useState } from 'react'
import { HashRouter } from 'react-router-dom'
import './index.css'
import { Button } from "@/components/ui/button"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <Button onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </Button>
      <HashRouter>
      </HashRouter>
      </div>
    </>
  )
}

export default App
