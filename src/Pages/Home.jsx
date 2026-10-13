import React, { useEffect } from 'react'
import { useState } from 'react'
import {baseUrl} from '../../baseUrl'
import axios from 'axios'
import {ClipLoader} from 'react-spinners'
import NewCollection from '../Components/NewCollections'
import Slider from '../Components/Slider'
import OurApproach from '../Components/OurApproach'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getlAllProducts = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${baseUrl}/products`)
      .then((res) => setProducts(res.data))
    } catch (error) {
      console.log('failed to fetch data');
      
    }finally{
      setLoading(false)
    }
  }

  getlAllProducts()
  },[])
  
  if(loading){
    return <div className='my-12 text-center'><ClipLoader /></div>
  }
  return (
    <div className='px-12 py-12'>
      <NewCollection  allProducts = {products}/>
      <Slider  allProducts = {products}/>
      <OurApproach />
    </div>
  )
}

export default Home