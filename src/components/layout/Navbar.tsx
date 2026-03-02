import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { FiShoppingCart } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Navbar: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  return (
    <nav className="bg-white text-black shadow-lg">
      <div className="border-b-2 border-red-500">
        <div className="mx-auto flex max-w-6xl items-center justify-between  py-4">
          {/* <div className="mx-auto max-w-8xl px-8">
        <div className="flex items-center justify-between gap-6 py-3"> */}
          <Link to="/" className="">
            <img src="/assets/ui/navbar_logo.png" alt="navbar_logo" />
          </Link>

          <div className="flex flex-1 justify-center">
            <div className="flex w-full max-w-2xl items-stretch overflow-hidden rounded border border-slate-300 bg-white">
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
                <CiSearch className="font-bold" />
              </button>
            </div>
          </div>
            <div className="flex items-center space-x-6 mr-4">
              <Link to="/blog" className="text-sm font-medium hover:text-red-500 transition-colors">
                Blog
              </Link>
              <SignedOut>
                <Link to="/login" className="hover:text-red-500">
                  <div className="flex items-center gap-1">
                    <IoPersonOutline />
                    <p className="text-sm font-medium">Account</p>
                  </div>
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            <Link to="/wishlist" className="hover:text-red-500 ">
              <div className="flex items-center gap-1 text-sm ">
                <div className="relative">
                  <CiHeart />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </div>
                <p>Wishlist</p>
              </div>
            </Link>
            <Link to="/cart" className="hover:text-red-500 ">
              <div className="flex items-center gap-1 text-sm">
                <div className="relative">
                  <FiShoppingCart />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </div>
                <p>Cart</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
