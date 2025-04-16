import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CurrencyConvertor from './components/CurrencyConvertor'

function App() {
  const [count, setCount] = useState(0)

  return (

    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <div className='container'>
        <CurrencyConvertor />
      </div>

    </div>



  )
}

export default App
