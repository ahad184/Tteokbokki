import { FC } from "react";
import { CiPhone } from "react-icons/ci";
import { Link } from "react-router-dom";

const Topbar: FC = () => {
  return (
    <div className="border-b border-slate-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between  py-2">
        <div className="border p-1 rounded">
          <img src="/assets/ui/Icon.png" alt="Icon" />
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-200">
            Home
          </Link>
          <Link to="/" className="hover:text-blue-200">
            <select className="outline-none">
              <option>Category</option>
            </select>
          </Link>
          <Link to="/products" className="hover:text-blue-200">
            <select className="outline-none">
              <option>Products</option>
            </select>
          </Link>
          <Link to="/products" className="hover:text-blue-200">
            <select className="outline-none">
              <option>Pages</option>
            </select>
          </Link>
          <Link to="/blog" className="hover:text-blue-200">
            <select className="outline-none">
              <option>Blog</option>
            </select>
          </Link>
          <Link to="/about" className="hover:text-blue-200">
            <select className="outline-none">
              <option>Elements</option>
            </select>
          </Link>
        </div>
        <div>
          <span className="flex items-center gap-1">
            <CiPhone size={16} />
            +123 (456) 7890
          </span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
