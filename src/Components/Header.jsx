import React, { useEffect, useState } from 'react'
import { FaBars, FaHeart, FaShoppingBag, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
 

    useEffect(() => {
        if(localStorage.getItem('token')){
            setIsLoggedIn(true)
        } else{
            setIsLoggedIn(false)
        }
    },[])

    function logOut(){
        localStorage.removeItem('token')
        localStorage.removeItem('users')
        localStorage.removeItem('cart')
       
        window.location = '/login'
    }
    
  return (
        <nav className='w-full flex justify-between bg-white items-center shadow-md px-10 py-2 h-[70px] relative'>
        <div>
            <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className=' md:hidden text-2xl'>
            <FaBars/>
            </button>

            <ul className='hidden md:flex space-x-2 font-medium '>
                <Link to='/'  className="relative text-black px-2 py-3 rounded after:absolute after:bottom-2 after:left-1 hover:after:h-1 hover:after:w-[90%] after:bg-gray-300 after:rounded-full transition hover:after:duration-300">Home</Link>
                <Link to='/products'  className='relative text-black px-2 py-3 rounded after:absolute after:bottom-2 after:left-1 hover:after:h-1 hover:after:w-[90%] after:bg-gray-300 after:rounded-full transition hover:after:duration-300'>Products</Link>
                {isLoggedIn && (
                    <Link to='add' className='relative text-black px-2 py-3 rounded after:absolute after:bottom-2 after:left-1 hover:after:h-1 hover:after:w-full after:bg-gray-300 after:rounded-full transition hover:after:duration-300 '>Add product</Link>
                )}
            </ul>
        </div>
            
            <div className='hidden md:flex '>
                <img src='../src/images/img1.png' draggable='false' alt="" className='w-10 h-10' />
            </div>
            

            {isLoggedIn ? (
                <div className='flex items-center space-x-2 md:space-x-4'>
                <Link to='/cart' className='border flex items-center space-x-2 bg-black text-white hover:bg-white hover:text-black px-3 py-2 rounded-full transition duration-300 cursor-pointer hover:border-black'>
                    <span className='text-sm'>Cart</span>
                    <div className='bg-white text-black p-1 rounded-full'>
                    <FaShoppingBag />
                    </div>
                </Link>
                <Link to='/user'><button className='bg-black border text-white hover:bg-white hover:text-black p-2 rounded-full  transition duration-300 cursor-pointer'>
                    <FaUser />
                </button></Link> 
                <button onClick={logOut}  className='border bg-black cursor-pointer hover:bg-white transition duration-300 hover:text-black text-white p-2 rounded-full '>
                    Logout
                </button>
            </div>
            ) : (
                <div className=' '>
                    <Link to='/login'><button className='bg-black text-white p-2 rounded-md cursor-pointer hover:text-black hover:bg-white shadow-xl '>Login</button></Link>
                </div>
                
            ) 
        }
            
            {menuOpen && (
                <ul className='absolute top-full left-0 w-full bg-white shadow-md flex flex-col space-y-4  py-4 px-6 z-10'>
                    <Link to='/' className='cursor-pointer'> Home</Link>
                    <Link to='/products'  className='cursor-pointer'>Products</Link>
                    {isLoggedIn && (
                    <Link to='add' className='cursor-pointer'>Add product</Link>
                )}
                </ul>

            )}
        </nav>
  )
}

export default Header