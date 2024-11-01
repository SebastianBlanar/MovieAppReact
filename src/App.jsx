import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import { HeaderComponent } from './components/HeaderComponent'
import { Home } from './pages/Home/Home'
import { BannerComponent } from './components/BannerComponent'
import { Details } from './pages/details/Details'
import { Search } from './pages/search/Search'
import { CarouselContainer } from './components/CarouselContainer'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/movies/" element={<CarouselContainer section="movies"/>} />
          <Route path="/series/" element={<CarouselContainer section="series"/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/:type/:id" element={<Details />} />
          <Route path="/search/" element={<Search/>}/>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
