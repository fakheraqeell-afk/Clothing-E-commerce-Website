import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../baseUrl";
import {ClipLoader} from 'react-spinners'
import { useCart } from "../Context/CartContext";

const Products = () => {
  const { addToCart } = useCart();
  const [productss, setProductss] = useState([])
  const [loading, setLoading] = useState(false)
  const [filterdProducts, setFilteredProducts] = useState([])
  const [category, setCategory] = useState([])
  const [searchCategory, setSearchCategory] = useState('')
  const [priceRange, setPriceRange] = useState([0,100])
  const [minRating, setMinRating] = useState('')
   const [cartItems, setCartItems] = useState([]);
   const [mobileMenu, setMobileMenu] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
        try{
            setLoading(true)
            const res  = await axios.get(`${baseUrl}/products`)
            setProductss(res.data)
            setFilteredProducts(res.data)

            let categories=[]
            res.data.map((item) => {
                if(categories.indexOf(item.category) === -1){
                    categories.push(item.category)
                }
            })

            setCategory(categories)
        }catch{
            console.log('failed to fetch data');
            
        }finally{
            setLoading(false)
        }
    }
    fetchData()
  },[])

  //----------------------FILTER

  useEffect(() => {
    let data = [...productss]

    //--------CATEGORY FILTER
    if(searchCategory){
      data = data.filter((item) => item.category == searchCategory)
    }

    //--------PRICE FILTER
    data = data.filter((item) => item.price >= priceRange[0] && item.price <= priceRange[1])

    //--------RATING FILTER
    data = data.filter((item) => item.rating.rate >= minRating)

    setFilteredProducts(data)
  },[productss, searchCategory, priceRange, minRating])



  return (
    <main className="min-h-screen bg-[#f7f7f7] text-[#111]">

      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 md:px-10 lg:px-12">

        <button 
        onClick={() => setMobileMenu(!mobileMenu)}
        className="md:hidden cursor-pointer my-2  text-lg bg-black text-white px-4 rounded-full" >Filters</button>
        {mobileMenu && (
         <div className="md:hidden">

              <h3>Category</h3>
              <select
              value={searchCategory}
              onChange={(e)=> setSearchCategory(e.target.value)}
              className="mt-2 block w-full px-4 py-2 pr-8 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer">
                <option value="All">All</option>
                {category.map((item) => {
                    return <option value={item}>{item}</option>
                })}
                
              </select>

              <br />
              <label htmlFor="">Price Range</label>
              <input 
              value={priceRange[0]}
              onChange={(e)=> setPriceRange([Number(e.target.value), priceRange[1]])}
              type="number" name="" id="" placeholder="Min" 
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]" />


              <input 
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              type="number" name="" id="" placeholder="Max" className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]" />

              <br />
              
              <label htmlFor="">Minimum Rating</label>
              <input 
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              type="number" step='0.1' min='0' max='5' name="" id="" 
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]" />

            </div>
        )}

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[240px_1fr] lg:grid-cols-[250px_1fr] xl:grid-cols-[260px_1fr]">

          <aside className="hidden md:block">

            {/* Filters title */}
            <h2 className="mb-7 text-lg font-bold tracking-wide">
              Filters
            </h2>

            <div>

              <h3>Category</h3>
              <select
              value={searchCategory}
              onChange={(e)=> setSearchCategory(e.target.value)}
              className="mt-2 block w-full px-4 py-2 pr-8 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer">
                <option value="All">All</option>
                {category.map((item) => {
                    return <option value={item}>{item}</option>
                })}
                
              </select>

              <br />
              <label htmlFor="">Price Range</label>
              <input 
              value={priceRange[0]}
              onChange={(e)=> setPriceRange([Number(e.target.value), priceRange[1]])}
              type="number" name="" id="" placeholder="Min" 
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]" />


              <input 
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              type="number" name="" id="" placeholder="Max" className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]" />

              <br />
              
              <label htmlFor="">Minimum Rating</label>
              <input 
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              type="number" step='0.1' min='0' max='5' name="" id="" 
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]" />

            </div>

          </aside>

          <section className="min-w-0">


            <div className="mb-7">

              {/* Breadcrumb */}

              <div className="mb-3 text-xs text-gray-500">
                <span>Home</span>
                <span className="mx-1">/</span>
                <span className="font-medium text-gray-800">
                  Products
                </span>
              </div>


              {/* Title */}

              <h1 className="mb-3 text-2xl font-bold tracking-tight">
                PRODUCTS
              </h1>

            </div>

            {loading ? (
                <div className='my-12 text-center '><ClipLoader /></div>
            ) : (
                 <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">

              {filterdProducts.map((product) => (
                <article
                  key={product.id}
                  className="group min-w-0 border border-white shadow-xl px-15 py-7"
                >

                  {/* Product image */}

                  <div className="relative aspect-[4/5] overflow-hidden border border-gray-200 bg-gray-100">

                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>


                  {/* Product details */}

                  <div className="mt-3">

                    {/* Name */}

                    <div className="flex items-center gap-2">

                      <span className="text-xs text-gray-500">
                        
                        {product.title}
                      </span>

                      {product.extra && (
                        <span className="bg-gray-200 px-1.5 py-0.5 text-[9px] text-gray-600">
                          {product.extra}
                        </span>
                      )}

                    </div>


                    {/* category + price */}

                    <div className="mt-1   items-start justify-between gap-3">

                      <h3 className="text-sm font-medium leading-5">
                        {product.category}
                      </h3>

                      <span className="shrink-0 text-sm font-medium">
                        ${product.price}
                      </span>

                      <span className="text-yellow-500 shrink-0 text-sm font-medium block">
                      ⭐{product.rating.rate} /5
                      </span>

                    </div>

                    <button
                        type="button"
                      onClick={() => addToCart(product)}
                      className="mt-5 w-full border border-black bg-black px-5 py-3 text-xs font-medium uppercase tracking-widest text-white transition duration-300 hover:bg-transparent hover:text-black cursor-pointer"
                    >
                      Add To Cart
                    </button>

                  </div>

                </article>
              ))}

            </div>
            )}

           

          </section>

        </div>

      </div>


      {/* =====================================
          MOBILE FILTER DRAWER
      ====================================== */}

      
    </main>
  );
};

export default Products;