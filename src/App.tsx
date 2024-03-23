import { useState } from 'react'
import { HashRouter } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="background">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <HashRouter>
      </HashRouter>
      </div>
    </>
  )
}

export default App
