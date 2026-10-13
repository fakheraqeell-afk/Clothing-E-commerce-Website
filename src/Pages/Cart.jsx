import React from "react";
import { useCart } from "../Context/CartContext";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  return (
    <section className="min-h-screen bg-[#f7f7f7] px-5 py-10 sm:px-8 md:px-10 lg:px-12">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10">

          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
            Home / Cart
          </p>

          <div className="flex items-end justify-between">

            <h1 className="text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl md:text-6xl">
              Your Cart
            </h1>

            <span className="hidden text-xs uppercase tracking-widest text-gray-500 sm:block">
              {cart.length} Items
            </span>

          </div>

        </div>


        {/* Empty Cart */}
        {cart.length === 0 ? (
          <div className="border border-gray-300 py-20 text-center">

            <h2 className="text-xl font-bold uppercase">
              Your cart is empty
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Add some products to your cart.
            </p>

            <a
              href="/products"
              className="mt-7 inline-flex bg-black px-8 py-4 text-xs font-medium uppercase tracking-widest text-white transition hover:bg-gray-800"
            >
              Continue Shopping
            </a>

          </div>
        ) : (

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">

            {/* =========================
                CART PRODUCTS
            ========================== */}

            <div className="space-y-4">

              {cart.map((product) => (

                <div
                  key={product.id}
                  className="border border-gray-300 bg-[#f7f7f7] p-4 sm:p-5"
                >

                  <div className="flex gap-4 sm:gap-6">

                    {/* Image */}

                    <div className="h-32 w-24 shrink-0 overflow-hidden bg-gray-100 sm:h-40 sm:w-32">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />

                    </div>


                    {/* Details */}

                    <div className="flex min-w-0 flex-1 flex-col">

                      <p className="text-[10px] uppercase tracking-widest text-gray-500">
                        {product.category}
                      </p>

                      <h2 className="mt-1 text-base font-semibold uppercase tracking-tight sm:text-lg">
                        {product.name}
                      </h2>

                      <p className="mt-2 text-sm font-medium">
                        ${product.price}
                      </p>


                      {/* Bottom */}

                      <div className="mt-auto flex flex-col gap-4 pt-4 sm:flex-row sm:items-end sm:justify-between">

                        {/* Quantity */}

                        <div className="flex h-9 w-28 items-center justify-between border border-gray-300">

                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(product.id)
                            }
                            className="flex h-full w-9 items-center justify-center text-gray-500 hover:text-black"
                          >
                            −
                          </button>

                          <span className="text-xs">
                            {product.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(product.id)
                            }
                            className="flex h-full w-9 items-center justify-center text-gray-500 hover:text-black"
                          >
                            +
                          </button>

                        </div>


                        {/* Remove */}

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(product.id)
                          }
                          className="text-left text-[10px] font-medium uppercase tracking-widest text-gray-500 transition hover:text-black sm:text-right"
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>


            {/* =========================
                SUMMARY
            ========================== */}

            <div className="h-fit border border-gray-300 p-6">

              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-gray-500">
                Order Summary
              </p>

              <h2 className="text-2xl font-bold uppercase tracking-tight">
                Total
              </h2>

              <div className="my-6 border-t border-gray-300" />

              <div className="flex items-center justify-between">

                <span className="text-sm text-gray-500">
                  Subtotal
                </span>

                <span className="text-sm font-medium">
                  ${totalPrice.toFixed(2)}
                </span>

              </div>

              <div className="mt-3 flex items-center justify-between">

                <span className="text-sm text-gray-500">
                  Shipping
                </span>

                <span className="text-sm">
                  Free
                </span>

              </div>

              <div className="my-6 border-t border-gray-300" />

              <div className="flex items-center justify-between">

                <span className="text-sm font-bold uppercase">
                  Total
                </span>

                <span className="text-lg font-bold">
                  ${totalPrice.toFixed(2)}
                </span>

              </div>

              <button
                type="button"
                className="mt-7 h-14 w-full bg-black text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-gray-800"
              >
                Checkout
              </button>

            </div>

          </div>

        )}

      </div>

    </section>
  );
};

export default Cart;