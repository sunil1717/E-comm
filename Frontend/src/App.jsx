import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'

import About from './Pages/About'
import Collection from './Pages/Collection'
import Contact from './Pages/Contact'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Placeorder from './Pages/Placeorder'
import Order from './Pages/Order'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Searchbar from './Components/Searchbar'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
        
        <ToastContainer />
        <Navbar/>
        <Searchbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productid" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<Placeorder />} />
        <Route path="/order" element={<Order />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App