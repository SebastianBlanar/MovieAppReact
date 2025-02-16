import './App.css'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import { HeaderComponent } from './components/HeaderComponent'
import { Home } from './pages/Home/Home'
import { Details } from './pages/details/Details'
import { Search } from './pages/search/Search'
import { CarouselContainer } from './components/CarouselContainer'
import { WishlistProvider } from './contexts/WishListContext'
import { Wishlist } from './pages/wishlist/wishlist'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <WishlistProvider>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/movies/" element={<CarouselContainer section="movies"/>} />
            <Route path="/series/" element={<CarouselContainer section="series"/>} />
            <Route path="/wishlist/" element={<Wishlist section="wishlist"/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/:type/:id" element={<Details />} />
            <Route path="/search/" element={<Search/>}/>
          </Routes>
        </WishlistProvider>

      </BrowserRouter>
    </>
  )
}

export default App
