import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-7 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-lg font-bold">MysticMemoirs</div>
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-4 text-gray-300">
            <Link className="hover:text-white transition-colors" to="/">About</Link>
            <Link className="hover:text-white transition-colors" to="/">Contact</Link>
            <Link className="hover:text-white transition-colors" to="/">Privacy Policy</Link>
          </div>
        </div>
        <div className="mt-4 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} MysticMemoirs. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
