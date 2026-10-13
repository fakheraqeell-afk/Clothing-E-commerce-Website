import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { baseUrl } from '../../baseUrl'
import axios from 'axios'
import {ClipLoader} from 'react-spinners'
import { useCart } from "../Context/CartContext";

const ProductDetail = () => {
    const { addToCart } = useCart();
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({})
    const [counter, setCounter] = useState(1)
    const [isOpen, setIsOpen] = useState(false);
    const [showEdit, setShowEdit] = useState(false)
    const [formData, setFormData] = useState({
      'title': '',
      'price': '',
      'description': '',
      'image': ''
    })
    const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', zIndex: 1000
  },
  modal: {
    background: 'white', padding: '20px', borderRadius: '8px',
    textAlign: 'center', boxShadow: '0px 4px 10px rgba(0,0,0,0.25)'
  },
  actions: { marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' },
  cancelBtn: { padding: '8px 16px', cursor: 'pointer' },
  confirmBtn: { padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

    function increase() {
        counter == 5 ? counter=5 : setCounter(counter + 1)
    }

    function decrease() {
        counter == 0 ? counter = 0 : setCounter(counter - 1) 
 
    }
    

    useEffect(() => {
        const fetchProduct = async () => {
            try{
                setLoading(true)
                const res = await axios.get(`${baseUrl}/products/${id}`)
                setProduct(res.data)
                
            }catch(err){
                console.log(err);
                
            }finally{
                setLoading(false)
            }
        }
        fetchProduct()
    },[id])

     const triggerAction = () => {
    setIsOpen(true); // Show confirmation dialog
  };

   const handleConfirm = async () => {
    
     try {
          await axios.delete(`${baseUrl}/products/${id}`)
          window.location = '/'
        } catch (error) {
          console.log(error);
        } finally{
          setLoading(false)
        }
    setIsOpen(false); // Close dialog
  };

   const handleCancel = () => {
    console.log("Action Canceled.");
    setIsOpen(false); // Close dialog
  };

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name] : e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      setLoading(true)
      const res =await axios.put(`${baseUrl}/products/${id}`, formData)
      setProduct(res.data)
      setShowEdit(false)
    }catch(error){
      alert('error in edit')
      console.log(error);
      
    }finally{
      setLoading(false)
    }
  }
    

    {if(loading)
        return <div className='my-12 text-center'><ClipLoader /></div>
    }
    {if(!product)
        return <div className='my-12 text-center text-red-500 text-lg'>Product Not found</div>
    }
  return (
     <section className="w-full bg-[#f7f7f7] px-5 py-12 sm:px-8 md:px-10 lg:px-12">
      <div className="mx-auto max-w-5xl">

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">

          {/* Product Image */}
          <div className="mx-auto group relative  overflow-hidden border border-gray-200 bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="h-140 w-120 transition duration-500 group-hover:scale-105"
            />

            {/* Plus Button */}
            <button
              type="button"
              aria-label="Quick view"
              className="absolute bottom-0 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center bg-white text-xl font-light text-gray-700 transition duration-300 hover:bg-black hover:text-white"
            >
              +
            </button>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">

            {/* Category */}
            <p className="text-xs uppercase tracking-wider text-gray-500">
              {product.category}
            </p>

            {/* Product Name */}
            <div className="mt-2 flex items-start justify-between gap-6">
              <h1 className="text-3xl font-bold uppercase leading-tight tracking-tight text-black sm:text-4xl">
                {product.title}
              </h1>

              <span className="shrink-0 text-lg font-medium text-black">
                ${product.price}
              </span>
            </div>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-3">

              <div className="flex items-center gap-1 text-sm">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span className="text-gray-300">★</span>
              </div>

              <span className="text-xs text-gray-500">
                
              </span>

            </div>

            {/* Divider */}
            <div className="my-7 border-t border-gray-300" />

            {/* Description */}
            <div>
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest">
                Description
              </h2>

              <p className="max-w-lg text-sm leading-6 text-gray-500">
                {product.description}
              </p>
            </div>

            

           {localStorage.getItem('token') ? (
            <div>
            {/* Quantity */}
            <div className="mt-8">

              <p className="mb-3 text-xs font-bold uppercase tracking-widest">
                Quantity
              </p>

              <div className="flex h-11 w-32 items-center justify-between border border-gray-300 bg-white">

                <button
                 
                  onClick={decrease}
                  type="button"
                  className="flex h-full w-10 items-center justify-center text-lg text-gray-500 transition hover:text-black"
                >
                  −
                </button>

                <span className="text-sm">
                  {counter}
                </span>

                <button
                  type="button"
                  onClick={increase}
                  className="flex h-full w-10 items-center justify-center text-lg text-gray-500 transition hover:text-black"
                >
                  +
                </button>

              </div>

            </div>
            {/* Add To Cart */}
              <button
               type="button"
               onClick={() => addToCart(product)}
              className="mt-6 flex h-14 w-full items-center justify-center bg-black text-xs font-medium uppercase tracking-[0.2em] text-white transition duration-300 cursor-pointer hover:bg-gray-800"
            >
              Add To Cart
            </button>

            {/* Update & Delete product */}
           <div className='flex'>
            <button
              type="button"
              onClick={() => setShowEdit(true)}
              className="mt-3 flex h-14 w-full items-center justify-center border border-black bg-transparent text-xs font-medium uppercase tracking-[0.2em] text-black transition duration-300 hover:bg-black cursor-pointer hover:text-white"
            >
              Update
            </button>
            <button
              type="button"
              onClick={triggerAction}
              className="mt-3 flex h-14 w-full items-center justify-center border border-black bg-transparent text-xs font-medium uppercase tracking-[0.2em] text-black transition duration-300 hover:bg-black cursor-pointer hover:text-white"
            >
              Delete
            </button>
           </div>
            </div>
           ) : (
            <p className='py-4 text-2xl font-bold'>Login to show more details</p>
           )}

            
            
            

           <div style={{ padding: '20px' }}>
      {/* Trigger Button */}
      {/* Conditional Dialog Rendering */}
      {isOpen && (
        <div  style={styles.overlay}>
          <div style={styles.modal}>
            <h3>Confirm Action</h3>
            <p>Are you absolutely sure you want to proceed?</p>
            <div style={styles.actions}>
              <button onClick={handleCancel} style={styles.cancelBtn}>Cancel</button>
              <button onClick={handleConfirm} style={styles.confirmBtn}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {showEdit && (
        <div  style={styles.overlay}>
          <div style={styles.modal}>
            <h3>Edit Product</h3>
            <form 
            className=' rounded border-black m-2 p-4' 
            onSubmit={handleSubmit}>
              <input 
              placeholder='Title' 
              className='border-b w-full my-2 p-2 rounded shadow-md focus:outline-none' 
              type="text" 
              name="title" 
              value={formData.title} 
              required 
              onChange={handleChange} />


              <input 
              placeholder='Price' 
              className='border-b w-full my-2 p-2 rounded shadow-md focus:outline-none' 
              type="number" 
              name="price" 
              value={formData.price} 
              required 
              onChange={handleChange} />


              <input 
              placeholder='Description' 
              className='border-b w-full my-2 p-2 rounded shadow-md focus:outline-none' 
              type="text" 
              name="description" 
              value={formData.description} 
              required 
              onChange={handleChange} />


              <input 
              placeholder='Description' 
              className='border-b w-full my-2 p-2 rounded shadow-md focus:outline-none' 
              type="file" 
              name="image" 
              value={formData.image} 
              required 
              onChange={handleChange} />


              <div>
                <button className=' p-4' onClick={() => setShowEdit(false)}>Cancel</button>
                <button type='submit' className='bg-blue-500 text-white rounded  py-2 px-4.5 '>Edit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default ProductDetail