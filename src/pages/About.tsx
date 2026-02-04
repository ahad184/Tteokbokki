import React from "react";


const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-slate-800">
      {/* Top contact bar */}
      <div className="w-full border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <button
              aria-label="Menu"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white lg:hidden"
            >
              <span className="block h-[1px] w-3 bg-slate-600" />
            </button>
            <p className="hidden text-[11px] uppercase tracking-[0.18em] text-rose-500 sm:block">
              A Treasure of Tastes
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="hidden sm:block">
              Need help?{" "}
              <span className="font-semibold text-slate-700">
                +123 (456) (7890)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Main header / nav */}
      <header className="w-full border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-4 lg:px-0">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 ring-2 ring-amber-300">
              <span className="text-xl">🥕</span>
            </div>
            <div className="leading-tight">
              <p className="text-lg font-semibold text-slate-900">Foodzy</p>
              <p className="text-[11px] text-slate-500">A Treasure of Tastes</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="order-3 mt-2 flex w-full items-center justify-center sm:order-none sm:mt-0 sm:flex-1">
            <div className="flex w-full max-w-lg items-stretch overflow-hidden rounded-full border border-slate-200 bg-slate-50 text-xs shadow-sm">
              <input
                type="text"
                placeholder="Search for items..."
                className="flex-1 bg-slate-50 px-4 py-2.5 text-xs text-slate-700 outline-none placeholder:text-slate-400"
              />
              <select className="hidden border-l border-slate-200 bg-white px-3 text-xs text-slate-600 outline-none sm:block">
                <option>All Categories</option>
                <option>Fruits &amp; Vegetables</option>
                <option>Dairy &amp; Bakery</option>
                <option>Meat &amp; Seafood</option>
              </select>
              <button className="bg-[#ff4c3b] px-4 text-xs font-semibold text-white hover:bg-[#e63f2f]">
                <span className="hidden sm:inline">Search</span>
                <span className="sm:hidden">Go</span>
              </button>
            </div>
          </div>

          {/* Nav links + icons */}
          <div className="ml-auto flex items-center gap-6">
            <nav className="hidden items-center gap-4 text-[13px] font-medium text-slate-600 lg:flex">
              <a href="#" className="hover:text-[#ff4c3b]">
                Home
              </a>
              <a href="#" className="hover:text-[#ff4c3b]">
                Category
              </a>
              <a href="#" className="hover:text-[#ff4c3b]">
                Products
              </a>
              <a href="#" className="hover:text-[#ff4c3b]">
                Pages
              </a>
              <a href="#" className="hover:text-[#ff4c3b]">
                Blog
              </a>
              <a href="#" className="hover:text-[#ff4c3b]">
                Elements
              </a>
            </nav>
            <div className="flex items-center gap-3 text-slate-500">
              {/* Account */}
              <button className="flex items-center gap-1 text-xs hover:text-[#ff4c3b]">
                <span className="hidden sm:inline">Account</span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 20c0-2.76 3.134-5 7-5s7 2.24 7 5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              {/* Wishlist */}
              <button className="flex items-center gap-1 text-xs hover:text-[#ff4c3b]">
                <span className="hidden sm:inline">Wishlist</span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    d="M19 4.75a4.5 4.5 0 0 0-6.364 0L12 5.386l-.636-.636A4.5 4.5 0 0 0 5 11.114l.636.636L12 18.114l6.364-6.364.636-.636A4.5 4.5 0 0 0 19 4.75Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {/* Cart */}
              <button className="flex items-center gap-1 text-xs hover:text-[#ff4c3b]">
                <span className="hidden sm:inline">Cart</span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    d="M5 5h2l1 10h10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 15h9l1.2-6H7.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="10" cy="19" r="1.2" />
                  <circle cx="18" cy="19" r="1.2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Red banner / breadcrumb */}
      <div className="w-full bg-[#ff4c3b] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm lg:px-0">
          <span>About Us</span>
          <span className="text-xs opacity-90">
            Home <span className="mx-1">–</span> About Us
          </span>
        </div>
      </div>

      {/* About content */}
      <main className="flex-1">
        <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 lg:flex-row lg:items-start lg:px-0 lg:py-14">
          {/* Text */}
          <div className="flex-1">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              About The Carrot
            </h1>

            <div className="mt-5 space-y-4 text-[13px] leading-relaxed text-slate-600">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ratione, recusandae necessitatibus quasi molestiae alias
                adipisci pariatur enim iure labore assumenda rerum quod.
                Temporibus magni autem a voluptatibus neque.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                vitae rerum cum accusamus magni consequuntur architecto, ipsum
                deleniti expedita doloribus suscipit voluptatum nisi perferendis
                amet.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium, maxime omnis architecto est exercitationem optio ea
                maiores corporis, beatae doloribus dolorum libero nesciunt velit
                illum? Voluptates deserunt adipisci voluptate magni sed
                blanditiis quasi optio!
              </p>
            </div>

            {/* Stats card */}
            <div className="mt-5 block bg-gray-100 px-2 py-7 shadow-md shadow-slate-100">
              <div className="grid grid-cols-3 gap-6 ">
                <div className="flex flex-col items-center">
                  <p className="text-6xl font-semibold text-[#ff4c3b]">
                    0.1<span className="text-3xl text-[#7A7A7A]">k</span>
                  </p>
                  <p className="mt-1 text-[15px] font-bold  text-black ">
                    Vendors
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-6xl font-semibold text-[#ff4c3b]">
                    23<span className="text-3xl text-[#7A7A7A]">k</span>
                  </p>
                  <p className="mt-1 text-[15px] font-bold text-black">
                    Customers
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-6xl font-semibold text-[#ff4c3b]">
                    2<span className="text-3xl text-[#7A7A7A]">k</span>
                  </p>
                  <p className="mt-1 text-[15px] font-bold text-black">
                    Products
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="w-full max-w-md">
            <img
              src="/assets/ui/about_pic.png"
              alt="Fresh vegetables on a wooden table"
              className="h-full w-full  object-cover"
            />
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 pb-14 lg:px-0">
          <div className="grid gap-5 md:grid-cols-4">
            {[
              {
                title: "Product Packing",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
              },
              {
                title: "24X7 Support",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
              },
              {
                title: "Delivery in 5 Days",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
              },
              {
                title: "Payment Secure",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-2  bg-gray-100 px-5 py-6 text-[13px] shadow-sm shadow-slate-100"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {item.title}
                </p>
                <p className="text-[12px] leading-relaxed text-slate-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>


    </div>
  );
};

export default AboutUs;
