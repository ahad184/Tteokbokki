import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

const Pagesdropdown: FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const options = [
    { label: "Login", value: "/login" },
    { label: "Register", value: "/signup" },
    { label: "About Us", value: "/about" },

  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="outline-none cursor-pointer  px-3 py-1 rounded hover:bg-red-100"
      >
        Pages
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

export default Pagesdropdown;
