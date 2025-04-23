'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  FaHome, 
  FaSearch, 
  FaBook, 
  FaEnvelope, 
  FaSignInAlt, 
  FaBars, 
  FaTimes,
  FaUser, 
  FaHeart, 
} from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

interface NavLink {
  href: string;
  icon: JSX.Element;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/', icon: <FaHome size={20} />, label: 'Home' },
  { href: '/recommendations', icon: <FaSearch size={20} />, label: 'Discover' },
  { href: '/favorites', icon: <FaHeart size={20} />, label: 'Favorites' },
  { href: '/about', icon: <FaBook size={20} />, label: 'About' },
  { href: '/contact', icon: <FaEnvelope size={20} />, label: 'Contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-red-600 text-white p-3 rounded-full shadow-lg"
      >
        <FaBars />
      </button>

      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex w-[200px] bg-gradient-to-b from-red-600 to-red-700 text-white flex-col items-center py-8 h-screen fixed top-0 left-0 shadow-xl z-40">
        <Link href="/">
          <div className="text-3xl font-bold mb-16 tracking-tight">
            Dine<span className="text-yellow-300">Mind</span>
          </div>
        </Link>
        
        <nav className="flex flex-col space-y-8 text-lg w-full px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
            >
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 hover:text-yellow-200 transition-colors py-2"
              >
                {link.icon}
                <span>{link.label}</span>
              </motion.div>
            </Link>
          ))}
        </nav>
        
        <div className="mt-auto w-full px-6 mb-8">
          <ThemeToggle />
          
          <div className="pt-8 border-t border-red-500 mt-8">
            {isLoggedIn ? (
              <Link href="/profile">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 hover:text-yellow-200 transition-colors py-2"
                >
                  <FaUser size={20} />
                  <span>Profile</span>  
                </motion.div>
              </Link>
            ) : (
              <Link href="/login">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 hover:text-yellow-200 transition-colors py-2"
                >
                  <FaSignInAlt size={20} />
                  <span>Login</span>  
                </motion.div>
              </Link>
            )}
          </div>
        </div>
      </aside>
      
      {/* Mobile sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 left-0 h-full w-[280px] bg-gradient-to-b from-red-600 to-red-700 text-white z-50 md:hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-5 border-b border-red-500">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <div className="text-2xl font-bold tracking-tight">
                    Dine<span className="text-yellow-300">Mind</span>
                  </div>
                </Link>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              
              <nav className="flex flex-col p-5 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center space-x-3 hover:bg-red-500 rounded-lg px-4 py-3 transition-colors my-1">
                      {link.icon}
                      <span>{link.label}</span>
                    </div>
                  </Link>
                ))}
              </nav>
              
              <div className="p-5 border-t border-red-500">
                <ThemeToggle />
                
                <Link 
                  href="/login"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-lg px-4 py-3 transition-colors mt-5">
                    <FaSignInAlt size={20} />
                    <span>Login / Sign Up</span>
                  </div>
                </Link>
              </div>
            </motion.aside>
          </>  
        )}
      </AnimatePresence>
    </>
  );
}