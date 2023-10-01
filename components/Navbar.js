
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/src/echo.png";

const Navbar = () => {
  return (
    <nav className="bg-slate-50 py-3 ">
      <div className="container mx-auto flex justify-between items-center">
       
        <div className="flex-none">
        <Link href="/">
        <Image
          className="logo"
          src={logo}
          width={200}
          height={100}
          alt="echo"
        />
        </Link>
        </div>

        <div className="flex-none space-x-4 ml-auto">
          <button href="#" className="bg-purple-600 hover:bg-purple-500 rounded-lg w-24">
            <p className="text-white p-2 ">
              <Link href="../users/create/">
              Sign Up
              </Link>
              
            </p>
          </button>
          <button href="#" className="bg-purple-600 hover:bg-purple-500 rounded-lg w-24">
           <p className="text-white p-2">Log In</p> 
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
