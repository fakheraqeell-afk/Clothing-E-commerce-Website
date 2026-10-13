import React, { useState } from "react";
import { Link } from "react-router-dom";

const Slider = ({allProducts}) => {
  

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex < allProducts.length - 4) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  

  return (
    <section className="w-full bg-white px-6 py-12 sm:px-8 md:px-12 lg:px-16">

      {/* ================= HEADER ================= */}
      <div className="mb-8 flex items-end justify-between">

        {/* Title */}
        <div className="flex items-start">
          <h2 className="text-5xl font-black uppercase leading-[0.8] tracking-[-3px] text-black sm:text-6xl md:text-7xl">
            All
            <br />
            Products
          </h2>

         
        </div>

        {/* See All */}
        <a
          href="/shop"
          className="hidden items-center gap-4 text-sm text-gray-600 transition hover:text-black sm:flex"
        >
          <span>See All</span>

          <span className="text-2xl font-light">
            →
          </span>
        </a>

      </div>

      {/* ================= PRODUCTS ================= */}

      <div className="overflow-hidden">

        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 "
        >
          {allProducts
            .slice(startIndex, startIndex + 4)
            .map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="group min-w-0 border px-10  shadow-lg border-white p-4"
              >

                {/* Image */}
                <div className="relative aspect-square overflow-hidden border border-gray-200 bg-gray-50">

                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                </div>

                {/* Product Information */}
                <div className="mt-3">

                  {/* Category + Extra */}
                  <div className="flex items-center gap-2">

                    <span className="text-xs text-gray-500">
                      {product.category}
                    </span>

                    {product.extra && (
                      <span className="bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">
                        {product.extra}
                      </span>
                    )}

                  </div>

                  {/* Name + Price */}
                  <div className="mt-1 flex items-start justify-between gap-3">

                    <h3 className="text-sm font-medium leading-5 text-black sm:text-base">
                      {product.title}
                    </h3>

                    <span className="shrink-0 text-sm font-medium text-black sm:text-base">
                      {product.price}
                    </span>

                  </div>

                </div>

              </Link>
            ))}
        </div>

      </div>

      {/* ================= NAVIGATION ================= */}

      <div className="mt-8 flex items-center justify-center gap-3">

        <button
          type="button"
          onClick={handlePrevious}
          disabled={startIndex === 0}
          aria-label="Previous products"
          className="flex h-10 w-10 items-center justify-center border border-gray-300 text-lg text-gray-500 transition hover:border-black hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
        >
          ←
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={startIndex >= allProducts.length - 4}
          aria-label="Next products"
          className="flex h-10 w-10 items-center justify-center border border-gray-300 text-lg text-gray-700 transition hover:border-black hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
        >
          →
        </button>

      </div>

      {/* ================= MOBILE SEE ALL ================= */}

      <div className="mt-8 flex justify-end sm:hidden">

        <a
          href="/shop"
          className="flex items-center gap-3 text-sm text-gray-600"
        >
          <span>See All</span>
          <span className="text-xl">→</span>
        </a>

      </div>

    </section>
  );
};

export default Slider;