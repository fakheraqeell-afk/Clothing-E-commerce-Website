import axios from 'axios'
import { useState } from 'react'
import { baseUrl } from '../../baseUrl'

const AddProduct = () => {
    const [formData, setFormData] = useState({
        "title" : '',
        "price" : '',
        "description" : '',
        "category": '',
        "image" : ''
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
           setLoading(true) 
           const res = await axios.post(`${baseUrl}/products`,formData)
           console.log(res);
           
        } catch (error) {
            setError(error.message)
            console.log(error.message);
            
            
        }finally{
            setLoading(false) 
        }
    }
    
  return (
   <section className="min-h-screen bg-[#f7f7f7] px-5 py-12 sm:px-8 md:px-10 lg:px-12">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
            Dashboard / Products
          </p>

          <h1 className="text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl">
            Add Product
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="border border-gray-300 bg-[#f7f7f7] p-5 sm:p-8 md:p-10"
        >
          <div className="space-y-6">

            {/* Product Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-xs font-bold uppercase tracking-widest"
              >
                Product Title
              </label>

              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                className="h-14 w-full border border-gray-300 bg-transparent px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-black"
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-xs font-bold uppercase tracking-widest"
              >
                Price
              </label>

              <div className="flex h-14 border border-gray-300 focus-within:border-black">
                <span className="flex items-center px-4 text-sm text-gray-500">
                  $
                </span>

                <input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="199.00"
                  className="w-full bg-transparent pr-4 text-sm outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-xs font-bold uppercase tracking-widest"
              >
                Description
              </label>

              <input
                type='text'
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                className="w-full resize-none border border-gray-300 bg-transparent p-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-black"
              />
            </div>

            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-xs font-bold uppercase tracking-widest"
              >
                Product Image
              </label>

              <label
                htmlFor="image"
                className="flex h-32 cursor-pointer flex-col items-center justify-center border border-dashed border-gray-300 transition hover:border-black"
              >
                <span className="text-2xl font-light">
                  +
                </span>

                <span className="mt-2 text-xs uppercase tracking-widest text-gray-500">
                  {formData.image
                    ? formData.image.name
                    : "Choose an image"}
                </span>

                <input
        
                  name="image"
                  type="file"
                  accept="image/*"
                  value={formData.image}
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-xs font-bold uppercase tracking-widest"
              >
                Category
              </label>

              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="h-14 w-full appearance-none border border-gray-300 bg-transparent px-4 pr-10 text-sm outline-none transition focus:border-black"
                >
                  <option value="" hidden>
                  Category
                  </option>

                  <option value="men clothing">
                    Men clothing
                  </option>

                  <option value="jewelry">
                    Jewelry
                  </option>

                  <option value="women clothing">
                    Women clothing
                  </option>

                  <option value="electronics">
                    Electronics
                  </option>

                </select>

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg">
                  ↓
                </span>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="my-8 border-t border-gray-300" />

          {/* Submit */}
          <button
            type="submit"
            className="h-14 w-full bg-black text-xs font-medium uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-gray-800"
          >
            Add Product
          </button>

        </form>
      </div>
    </section>
  );
  
}

export default AddProduct