import { useState } from 'react'

import './App.css'
import CSVToJSON from './components/CsvToJSON/CSVToJSON.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import i18n from './i18n';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
function App() {
 

  return (
   
      <>
    
       <CSVToJSON></CSVToJSON>
      </>
    
  
  )
}

export default App
