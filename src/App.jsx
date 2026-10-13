import './App.css'
import Footer from './Components/Footer'
import Header from './Components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import New from './Pages/New'
import Login from './Pages/Login'
import Products from './Pages/Products'
import ProductDetail from './Pages/ProductDetail'
import AddProduct from './Pages/AddProduct'
import User from './Pages/User'

import Cart from './Pages/Cart'


function App() {
  return (
    <>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/new' element={<New />} />
            <Route path='/products' element={<Products />} />
            <Route path='/login' element={<Login />} />
            <Route path='/product/:id' element={<ProductDetail /> } />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/user' element={<User />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        
    </>
  )
}

export default App
