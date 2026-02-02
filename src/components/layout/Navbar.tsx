import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logout } from '../../feature/auth/authSlice';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            E-Shop
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200">
              Home
            </Link>
            <Link to="/products" className="hover:text-blue-200">
              Products
            </Link>
            <Link to="/blog" className="hover:text-blue-200">
              Blog
            </Link>
            <Link to="/about" className="hover:text-blue-200">
              About
            </Link>
            <Link to="/faq" className="hover:text-blue-200">
              FAQ
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="hover:text-blue-200 relative">
              ❤️
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="hover:text-blue-200 relative">
              🛒
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <>
                <span className="text-sm">Hello, {user?.name}</span>
                <button onClick={handleLogout} className="hover:text-blue-200">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-blue-200">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
