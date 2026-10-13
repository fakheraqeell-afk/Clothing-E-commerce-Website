import React from "react";

const Approach = () => {
  const images = [
    {
      id: 1,
      src: "../public/images/firstimg.jpg",
      alt: "Fashion model wearing modern clothing",
      position: "top",
    },
    {
      id: 2,
      src: "../public/images/secondimg.jpg",
      alt: "Fashion model in urban clothing",
      position: "bottom",
    },
    {
      id: 3,
      src: "../public/images/thirdimg.jpg",
      alt: "Fashion model wearing white clothing",
      position: "top",
    },
    {
      id: 4,
      src: "../public/images/fourthimg.jpg",
      alt: "White fashion clothing",
      position: "bottom",
    },
  ];

  return (
    <section className="w-full overflow-hidden bg-white px-5 py-16 sm:px-8 md:px-10 lg:px-12 lg:py-20">

      <div className="mx-auto max-w-[1400px]">

        {/* =========================
            HEADER
        ========================== */}

        <div className="mx-auto max-w-4xl text-center">

          <h2 className="text-3xl font-light uppercase tracking-tight text-black sm:text-4xl md:text-5xl lg:text-[52px]">
            Our Approach To Fashion Design
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[11px] leading-5 tracking-[0.15em] text-gray-600 sm:text-xs sm:leading-6">
            At elegant vogue, we blend creativity with craftsmanship to create
            fashion that transcends trends and stands the test of time. Each
            design is meticulously crafted, ensuring the highest quality
            exquisite finish.
          </p>

        </div>


        {/* =========================
            IMAGE GALLERY
        ========================== */}
          
        <div className="mt-16 overflow-x-auto pb-5 scrollbar-hide md:overflow-visible">

          <div className="flex min-w-max items-start gap-6 px-1 sm:gap-8 md:grid md:min-w-0 md:grid-cols-4 md:gap-6 lg:gap-7">

            {images.map((image) => (
              <div
                key={image.id}
                className={`
                  w-[220px] shrink-0
                  sm:w-[250px]
                  md:w-auto
                  ${
                    image.position === "bottom"
                      ? "md:mt-12"
                      : "md:mt-0"
                  }
                `}
              >
                <div className="aspect-[3/4] w-full overflow-hidden border border-gray-200 bg-gray-100">

                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />

                </div>
              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default Approach;