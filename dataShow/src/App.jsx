import { useState } from 'react'

import './App.css'
import CSVToJSON from './components/CsvToJSON/CSVToJSON.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
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
