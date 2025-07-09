import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { FaGlobe } from 'react-icons/fa';
import { NavLink } from 'react-router';
import DeshGo from '../DeshGo/DeshGo';

const Footer = () => {
  const activeStyle = 'font-semibold underline text-black dark:text-white';

  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white shadow-inner rounded-t-3xl py-10 px-8 transition-all duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & About */}
        <DeshGo />

        {/* Navigation & Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Legal & Contact</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <NavLink
                to="/terms-and-conditions"
                className={({ isActive }) =>
                  `hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300 ${
                    isActive ? activeStyle : ''
                  }`
                }
              >
                Terms & Conditions
              </NavLink>
            </li>
            <li className="flex items-center space-x-3">
              <FaGlobe className="w-5 h-5 text-black dark:text-white" />
              <span>Phone: +880 1234 567890</span>
            </li>
            <li className="flex items-center space-x-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/124/124012.png"
                alt="WhatsApp"
                className="w-5 h-5"
              />
              <span>WhatsApp: +880 1987 654321</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="font-semibold">Help Desk:</span>
              <span>+880 8000 123456</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="font-semibold">Support Line:</span>
              <span>+880 8000 654321</span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com/deshgo"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="btn btn-sm btn-circle bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://instagram.com/deshgo"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="btn btn-sm btn-circle bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://twitter.com/deshgo"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="btn btn-sm btn-circle bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://linkedin.com/company/deshgo"
              target="_blank"
              rel="noreferrer"
              aria-label="Linkedin"
              className="btn btn-sm btn-circle bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-6 text-center text-sm">
        <p>© {new Date().getFullYear()} DeshGo. All rights reserved.</p>
        <div className="flex justify-center items-center gap-2 mt-1">
          <FaGlobe className="text-black dark:text-white" />
          <a
            href="https://www.deshgo.com"
            target="_blank"
            rel="noreferrer"
            className="hover:underline font-medium text-black dark:text-white"
          >
            www.deshgo.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
