import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import { HeaderComponent } from './components/HeaderComponent'
import { Home } from './pages/Home/Home'
import { BannerComponent } from './components/BannerComponent'
import { Details } from './pages/details/Details'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/movie/:movieId" element={<Details/>}/>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
