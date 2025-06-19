import React from 'react'
import Home from "./components/Home"
import ExampleChart from "./components/ExampleChart";

import {Routes, Route} from "react-router-dom"
const App = () => {
  return (
    <Routes>
      <Route path='/*' element={<Home/>} />
      <Route path="/analytics/:symbol" element={<ExampleChart />} />
    </Routes>
  )
}

export default App