import { FC, useState } from "react";
import { CiPhone } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import ProductsDropdown from "../dropDown/Productdropdown";
import PagesDropdown from "../dropDown/Pagesdropdown";

const Topbar: FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo (Desktop Only - Normal) */}
          <div className="hidden md:block border p-1 rounded">
            <img src="/assets/ui/Icon.png" alt="Icon" />
          </div>

          {/* Logo as Mobile Menu Button */}
          <button
            className="md:hidden border p-1 rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img src="/assets/ui/Icon.png" alt="Menu Icon" />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/" className="hover:text-red-500">
              Home
            </Link>

            <ProductsDropdown/>

            <PagesDropdown />

            <Link to="/blog" className="hover:text-red-500">
              Blog
            </Link>

            <Link to="/about" className="hover:text-red-500">
              Elements
            </Link>
          </div>

          {/* Phone (Desktop Only) */}
          <div className="hidden md:flex items-center gap-1">
            <CiPhone size={16} />
            +123 (456) 7890
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 pb-4 border-t pt-4">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>

            <select
              onChange={(e) => {
                navigate(e.target.value);
                setIsOpen(false);
              }}
              defaultValue=""
            >
              <option value="">Products</option>
              <option value="/products">All Products</option>
            </select>

            <select
              onChange={(e) => {
                navigate(e.target.value);
                setIsOpen(false);
              }}
              defaultValue=""
            >
              <option value="">Pages</option>
              <option value="/login">Login</option>
              <option value="/signup">Register</option>
            </select>

            <Link to="/blog" onClick={() => setIsOpen(false)}>
              Blog
            </Link>

            <Link to="/about" onClick={() => setIsOpen(false)}>
              Elements
            </Link>

            <span className="flex items-center gap-1 pt-2 border-t">
              <CiPhone size={16} />
              +123 (456) 7890
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
