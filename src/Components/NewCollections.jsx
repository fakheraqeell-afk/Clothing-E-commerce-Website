import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NewCollection = ({allProducts}) => {
  

  const [startIndex, setStartIndex] = useState(0);
  const [showProducts, setShowProducts] = useState([])

  useEffect(() => {
    setShowProducts(allProducts.sort(() => Math.random() - Math.random()).slice(0,4))
  },[allProducts])


  const handleNext = () => {
    setStartIndex((prev) =>
      prev + 2 < showProducts.length ? prev + 2 : 0
    );
  };

  const handlePrevious = () => {
    setStartIndex((prev) =>
      prev - 2 >= 0 ? prev - 2  : Math.max(showProducts.length - 2 , 0)
    );
  };

  const visibleImages = showProducts.slice(startIndex, startIndex + 2) 

  return (
    <section className="min-h-screen w-full px-6 py-12 sm:px-8 md:px-1 lg:px-12 ">

      <div className="mx-auto max-w-7xl">

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">

          {/* LEFT SIDE */}
          <div className="flex flex-col justify-between lg:min-h-[650px]">

            {/* Title */}
            <div>
              <h1 className="text-5xl font-black uppercase leading-[0.85] tracking-tight text-gray-800 sm:text-6xl md:text-7xl">
                New
                <br />
                Collection
              </h1>

              <p className="mt-6 text-xl leading-tight tracking-wide text-gray-700">
                SUMMER
                <br />
                2026
              </p>
            </div>

            {/* Shop + Arrows */}
            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center lg:mt-0">

              {/* Shop Button */}
              <a
                href="/shop"
                className="group flex h-14 w-full max-w-[280px] items-center justify-between bg-gray-200 px-7 text-sm font-medium text-gray-800 transition duration-300 hover:bg-gray-300"
              >
                <span>Go To Shop</span>

                <span className="text-3xl font-light transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </a>

              {/* Desktop Arrows */}
              <div className="hidden gap-3 sm:flex">

                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex h-12 w-12 items-center justify-center border border-gray-300 text-xl text-gray-400 transition duration-300 hover:border-gray-600 hover:text-black"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="flex h-12 w-12 items-center justify-center border border-gray-300 text-xl text-gray-700 transition duration-300 hover:border-black hover:text-black"
                >
                  →
                </button>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE - IMAGES */}
          <div className="lg:col-span-2 lg:px-16">

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {visibleImages.map((product) => (
                <Link 
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="aspect-[4/5] overflow-hidden bg-white border shadow-2xl  border-white "
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </Link>
              ))}

            </div>

          </div>

        </div>

        {/* MOBILE ARROWS */}
        <div className="mt-6 flex justify-end gap-3 sm:hidden">

          <button
            type="button"
            onClick={handlePrevious}
            className="flex h-11 w-11 items-center justify-center border border-gray-300 text-xl text-gray-400 transition duration-300 hover:border-black hover:text-black"
          >
            ←
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex h-11 w-11 items-center justify-center border border-gray-300 text-xl text-gray-700 transition duration-300 hover:border-black hover:text-black"
          >
            →
          </button>

        </div>

      </div>

    </section>
  );
};

export default NewCollection;