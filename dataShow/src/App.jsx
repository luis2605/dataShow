import { useState } from 'react'

import './App.css'
import CSVToJSON from './components/CsvToJSON/CSVToJSON.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
       <CSVToJSON></CSVToJSON>
      </div>
    
    </>
  )
}

export default App
