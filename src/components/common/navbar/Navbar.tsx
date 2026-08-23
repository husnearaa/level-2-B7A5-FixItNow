"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/WebsiteLogo.png";
import { FiArrowRight } from "react-icons/fi";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const handleLoginLogout = () => {
  //   if (isLoggedIn) {
  //     // For now, just log the admin out by toggling the state
  //     setIsLoggedIn(false)
  //   } else {
  //     // Optionally, redirect to login page or handle login logic here
  //     // setIsLoggedIn(true)
  //   }
  // }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/compare", label: "Compare" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
    { href: "/models", label: "Models" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#1b1b1b] text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          {/* <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="AboutAerialLifts Logo"
              width={40}
              height={40}
            />
            <span className="ml-2 text-white font-medium">
              AboutAerialLifts
            </span>
          </Link> */}
          <span className="ml-2 text-white font-medium">
              AboutAerialLifts
            </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                pathname === link.href ? "text-primary" : "text-white"
              } hover:text-primary`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Search Bar and Login Button Container - Hidden on mobile */}

        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/contact">
          <button className="bg-transparent border-2 border-orange-400 text-orange-400 hover:text-white hover:bg-orange-400 px-6 py-2 rounded-md flex items-center space-x-2 transition duration-300 ease-in-out">
            <span >Inquiries</span>
            <FiArrowRight className="h-5 w-5" />
          </button>
          </Link>
          {/* Search Bar */}
          {/* <form className="flex items-center bg-white rounded-lg p-2">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-1 rounded-l-md text-black focus:outline-none"
            />
            <button type="submit" className="bg-primary text-white px-5 py-2 rounded-md hover:bg-primary">
              <FaSearch />
            </button>
          </form> */}

          {/* Login/Logout Button */}
          {/* <Link href={isLoggedIn ? "#" : "/login"} passHref>
            <button
              onClick={handleLoginLogout}
              className="bg-primary text-white px-5 py-3 rounded-md hover:bg-primary"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </Link> */}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-full bg-background z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            {/* <div className="flex items-center">
              <Image
                src={logo}
                alt="FixItNow Logo"
                width={40}
                height={40}
              />
              <span className="ml-2 text-white font-medium">
                FixItNow
              </span>
            </div> */}
               <span className="ml-2 text-white font-medium">
                FixItNow
              </span>
            <button
              onClick={toggleSidebar}
              className="text-white focus:outline-none"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* <div className="mb-6">
            <form className="flex justify-between items-center bg-white rounded-lg p-2">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-1 rounded-l-md text-black focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary text-white px-5 py-2 rounded-md hover:bg-primary"
              >
                <FaSearch />
              </button>
            </form>
          </div> */}

          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  pathname === link.href ? "text-primary" : "text-white"
                } hover:text-primary py-2 border-b border-gray-700`}
                onClick={() => setIsSidebarOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for sidebar */}
      {isSidebarOpen && <div className="fixed" onClick={toggleSidebar}></div>}
    </nav>
  );
}