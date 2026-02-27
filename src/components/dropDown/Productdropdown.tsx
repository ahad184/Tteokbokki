import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductDropdown: FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const options = [
    { label: "All Products", value: "/products" },
    { label: "New Arrivals", value: "/products/new" },
    { label: "Popular", value: "/products/popular" },
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Products
      </button>

      {open && (
        <div className="absolute mt-1 w-40 bg-white border rounded shadow-lg z-10">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                navigate(opt.value);
                setOpen(false);
              }}
              className="px-3 py-2 hover:bg-red-500 hover:text-white cursor-pointer"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDropdown;
