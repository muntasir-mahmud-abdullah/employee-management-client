import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gray-800 dark:bg-gray-900 text-gray-200 dark:text-gray-400 py-10">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
      {/* About */}
      <div>
        <h4 className="text-xl font-semibold mb-4 text-white">About Employee Management</h4>
        <p className="text-sm leading-relaxed">
          A robust platform to streamline your team’s workflow, payroll, and HR processes—secure, responsive, and easy to use.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-xl font-semibold mb-4 text-white">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/about-us" className="hover:underline">About Us</a></li>
          <li><a href="/services" className="hover:underline">Services</a></li>
          <li><a href="/contact-us" className="hover:underline">Contact Us</a></li>
          <li><a href="/login" className="hover:underline">Login</a></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h4 className="text-xl font-semibold mb-4 text-white">Contact</h4>
        <p className="text-sm flex items-center">
          <FaEnvelope className="mr-2" /> support@empmgmt.com
        </p>
        <p className="text-sm mt-2">+1 (555) 123‑4567</p>
        <p className="text-sm mt-2">1234 Elm Street, Suite 100<br />Metropolis, USA</p>
      </div>

      {/* Social Media */}
      <div>
        <h4 className="text-xl font-semibold mb-4 text-white">Follow Us</h4>
        <div className="flex space-x-4 text-lg">
          <a href="#" className="hover:text-white"><FaFacebookF /></a>
          <a href="#" className="hover:text-white"><FaTwitter /></a>
          <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
        </div>
      </div>
    </div>

    <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-4">
      <div className="container mx-auto text-center text-sm">
        &copy; {new Date().getFullYear()} Employee Management. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
