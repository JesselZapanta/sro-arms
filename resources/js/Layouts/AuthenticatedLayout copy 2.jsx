import React, { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800">
            {/* Logo */}
            <div className="text-white font-bold text-xl">Logo</div>

            {/* Menu for large screens */}
            <div className="hidden md:flex space-x-6">
                <a href="#" className="text-white hover:text-gray-400">
                    Link 1
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                    Link 2
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                    Link 3
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                    Link 4
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                    Link 5
                </a>
            </div>

            {/* Hamburger Icon */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu (pops from the right) */}
            <div
                className={`md:hidden fixed top-0 right-0 w-2/3 h-full bg-gray-800 text-white p-6 transform ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out`}
            >
                <div className="flex justify-end">
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="text-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    <a
                        href="#"
                        className="block text-white hover:text-gray-400"
                    >
                        Link 1
                    </a>
                    <a
                        href="#"
                        className="block text-white hover:text-gray-400"
                    >
                        Link 2
                    </a>
                    <a
                        href="#"
                        className="block text-white hover:text-gray-400"
                    >
                        Link 3
                    </a>
                    <a
                        href="#"
                        className="block text-white hover:text-gray-400"
                    >
                        Link 4
                    </a>
                    <a
                        href="#"
                        className="block text-white hover:text-gray-400"
                    >
                        Link 5
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
