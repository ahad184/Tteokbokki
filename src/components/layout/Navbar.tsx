import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logout } from '../../feature/auth/authSlice';
import { FiShoppingCart } from 'react-icons/fi';
import { CiHeart } from 'react-icons/ci';
import { IoPersonOutline } from 'react-icons/io5';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white text-black shadow-lg">
      <div className="container mx-auto px-1">
        <div className="flex justify-between items-center ">
          <Link to="/" className="">
            <div className="flex items-center">
              {' '}
              <img src="/assets/logo.png" className="" alt="" />
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">Tteokbokki</h1>
                <p>A Treasure of Tastes</p>
              </div>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm">Hello, {user?.name}</span>
                <button onClick={handleLogout} className="hover:text-blue-200">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-blue-200">
                <div className="flex items-center gap-1">
                  <IoPersonOutline />
                  <p className="text-sm font-medium">Account</p>
                </div>
              </Link>
            )}
            <Link to="/wishlist" className="hover:text-blue-200 ">
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
            <Link to="/cart" className="hover:text-blue-200 ">
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
