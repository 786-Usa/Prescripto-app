import React from 'react'
import { assets } from '../assets/assets_frontend/assets.js'

const Footer = () => {
    return (
        <footer className=" text-gray-700 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Left Section - Logo & Description */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                            <img src={assets.logo} alt="Prescripto" className="h-8" />
                            <span className="text-white font-bold text-xl">Prescripto</span>
                        </div>
                        <p className="text-sm  leading-relaxed">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a gallery of type and scrambled it to make a specimen book.
                        </p>
                    </div>

                    {/* Middle Section - Company Links */}
                    <div>
                        <h3 className=" font-semibold mb-4 uppercase text-sm">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-500 transition">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-500 transition">
                                    About us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-500 transition">
                                    Contact us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-yellow-500 transition">
                                    Privacy policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Right Section - Contact Info */}
                    <div>
                        <h3 className=" font-semibold mb-4 uppercase text-sm">Get In Touch</h3>
                        <ul className="space-y-3">
                            <li className="text-gray-700">+1-212-456-7890</li>
                            <li className="text-gray-700">prescripto@gmail.com</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section - Copyright */}
                <div className="border-t border-gray-700 pt-8">
                    <p className="text-center text-sm text-gray-400">
                        Copyright © {new Date().getFullYear()} Prescripto - All Right Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer