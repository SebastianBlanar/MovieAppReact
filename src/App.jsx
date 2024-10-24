import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import { HeaderComponent } from './components/HeaderComponent'
import { Home } from './pages/Home/Home'
import { BannerComponent } from './components/BannerComponent'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />

        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
