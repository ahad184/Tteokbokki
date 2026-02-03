import { FC } from 'react';
import { CiPhone } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const Topbar: FC = () => {
  return (
    <div className="bg-white text-black text-[14px] font-medium drop-shadow-lg ">
      <div className="container mx-auto flex justify-between items-center py-2 px-4">
        <div className="border p-1 rounded">
          <img src="/assets/topbarIcon.png" alt="Icon" />
        </div>
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
