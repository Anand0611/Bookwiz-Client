import axios from "axios";
import { useState } from "react";
import * as AiIcons from "react-icons/ai";

import Swal from "sweetalert2";

const SideNav = ({ activeItemFromMain }: { activeItemFromMain: string }) => {
  const [activeItem, setActiveItem] = useState<string>(activeItemFromMain);
  const handlelogout = async () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.get("http://localhost:8000/api/v1/logout");
        window.location.href = "/login";
      }
    });
 
  };
  const handleclick = (item: string) => {
    setActiveItem(item);
  };
  return (
    <nav className="bg-gray-800 text-white px-4 py-5 w-64 md:block hidden h-screen">
      <span className="text-2xl font-bold bg-gray-800 font-['Montserrat'] uppercase pt-[10px] pb-[39px] shadow-xl border-b-2 border-gray-600 text-white flex flex-col items-center justify-center mb-5 ">
        SNGIST Library <div className="text-sm font-medium text-orange-400">Admin Portal</div>
      </span>

      <ul className="space-y-4">
        <li className="group">
          <a
            href="/adminDashboard"
            className={`flex items-center p-4 hover:border-l-2 hover:border-white hover:bg-violet-700 cursor-pointer transition duration-300 ease-in-out ${
              activeItem === "Home"
                ? " scale-105 bg-violet-600 border-[#0077B6]"
                : ""
            }`}
            onClick={() => handleclick("Home")}
          >
            <AiIcons.AiFillHome
              className={`text-xl mr-2 text-gray-600 group-hover:text-white ${
                activeItem === "Home" ? "text-green-100" : ""
              }`}
            />
            <span className="transition duration-300 ease-in-out group-hover:text-white font-['Montserrat'] text-[18px] ">
              Home
            </span>
          </a>
        </li>
        <li className="group">
          <a
            href="#"
            className={`flex items-center p-4 hover:border-l-2 hover:border-white hover:bg-violet-700 cursor-pointer transition duration-300 ease-in-out ${
              activeItem === "Book Management" ? " scale-105 bg-violet-600 border-[#0077B6]" : ""
            }`}
            onClick={() => handleclick("Book Management")}
          >
            <AiIcons.AiOutlineBook
              className={`text-xl mr-2 text-gray-600 group-hover:text-white ${
                activeItem === "Book Management" ? "text-green-100" : ""
              }`}
            />
            <span className="transition duration-300 ease-in-out group-hover:text-white font-['Montserrat'] text-[18px]">
              Book Management
            </span>
          </a>
          <ul className={`ml-10 space-y-3 transition-all duration-300 ease-in-out ${activeItem === "Book Management" ? "block" : "hidden"}`}>
            <li className="group">
              <a
                href="/createBook"
                className="flex items-center p-4 pl-10 hover:bg-gray-700 cursor-pointer transition duration-300 ease-in-out"
              >
                Create New Book
              </a>
            </li>
            <li className="group">
              <a
                href="/manageBooks"
                className="flex items-center p-4 pl-10 hover:bg-gray-700 cursor-pointer transition duration-300 ease-in-out"
              >
                Manage Existing Books
              </a>
            </li>
          </ul>
        </li>
        <li className="group">
          <a
            href="#"
            className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition duration-300 ease-in-out"
          >
            <AiIcons.AiOutlineBook className="text-xl mr-2 text-gray-600 group-hover:text-white" />
            <span className="transition duration-300 ease-in-out group-hover:text-white font-['Montserrat'] text-[18px]">
              Borrow Management
            </span>
          </a>
        </li>
        <li className="group">
          <a
            href="#"
            className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition duration-300 ease-in-out"
          >
            <AiIcons.AiOutlineSearch className="text-xl mr-2 text-gray-600 group-hover:text-white" />
            <span className="transition duration-300 ease-in-out group-hover:text-white font-['Montserrat'] text-[18px]">
              User Management
            </span>
          </a>
        </li>
        <li className="group">
          <a
            href="#"
            className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition duration-300 ease-in-out"
          >
            <AiIcons.AiOutlineSearch className="text-xl mr-2 text-gray-600 group-hover:text-white" />
            <span className="transition duration-300 ease-in-out group-hover:text-white font-['Montserrat'] text-[18px]">
              Search Book
            </span>
          </a>
        </li>
        <li className="group">
          <a
            href="#"
            onClick={() => handlelogout()}
            className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition duration-300 ease-in-out"
          >
            <AiIcons.AiOutlineLogout className="text-xl mr-2 text-gray-600 group-hover:text-white" />
            <span className="transition duration-300 ease-in-out group-hover:text-white font-['Montserrat'] text-[18px]">
              Logout
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
