import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState("Home");

  const handleclick = (item: string) => {
    setActiveItem(item);
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  // function to handle hover

  return (
    <div className="w-screen h-[50px] justify-center items-center">
      {/* Routes for Signup and Login pages */}

      <div className="max-w-screen flex flex-wrap mx-auto  justify-between items-center">
        {/* Text Logo */}
        <span className=" ml-[80px] mt-[40px] font-[museomoderno] text-[30px] font-bold text-white ">
          BookWiz
        </span>

        {/* Responsive menu toggle */}

        {/* NavBar Items */}
        <div className="hidden md:flex items-center col-auto translate-x-[70px] translate-y-[20px] text-white">
          <ul className="flex gap-[60px] items-center font-[montserrat] font-semibold text-[15px]">
            <a
              href="/home"
              className={` hover:border-b-[5px] hover:border-[#0077B6] transition-border-left duration-100 ease-in-out ${
                activeItem === "Home" ? "border-b-[5px] border-[#0077B6]" : ""
              }`}
              onClick={() => handleclick("Home")}
            >
              <li>Home</li>
            </a>
            <a
              href="/#"
              className={` hover:border-b-[5px] hover:border-[#0077B6] transition-border-left duration-100 ease-in-out ${
                activeItem === "About" ? "border-b-[5px] border-[#0077B6]" : ""
              }`}
              onClick={() => handleclick("About")}
            >
              <li>About</li>
            </a>
            <a
              href="/#"
              className={` hover:border-b-[5px] hover:border-[#0077B6] transition-border-left duration-100 ease-in-out ${
                activeItem === "Features"
                  ? "border-b-[5px] border-[#0077B6]"
                  : ""
              }`}
              onClick={() => handleclick("Features")}
            >
              <li>Features</li>
            </a>
            <a
              href="/#"
              className={` hover:border-b-[5px] hover:border-[#0077B6] transition-border-left duration-100 ease-in-out ${
                activeItem === "FAQ" ? "border-b-[5px] border-[#0077B6]" : ""
              }`}
              onClick={() => handleclick("FAQ")}
            >
              <li>FAQ</li>
            </a>
            <a
              href="/#"
              className={` hover:border-b-[5px] hover:border-[#0077B6] transition-border-left duration-100 ease-in-out ${
                activeItem === "Contacts"
                  ? "border-b-[5px] border-[#0077B6]"
                  : ""
              }`}
              onClick={() => handleclick("Contacts")}
            >
              <li>Contacts</li>
            </a>
          </ul>
        </div>

        {/* Login and Signup Buttons */}
        <div className="ml-[127px] mt-[54px] pr-[80px] ">
          <button onClick={handleLogin} className=" font-[montserrat] font-semibold text-[15px] text-white  py-2 px-4 rounded-full hover:text-slate-400">
            Login
          </button>

          <button
            onClick={handleSignup}
            className="bg-[#0077B6] text-white font-[montserrat] font-semibold text-[15px] py-2 px-8 rounded-md hover:bg-[#005580]"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
