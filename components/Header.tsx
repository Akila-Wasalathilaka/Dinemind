'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  FaHome,
  FaSearch,
  FaBook,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaHeart,
} from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

interface NavLink {
  href: string;
  icon: React.ReactNode;
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
  

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    const html = document.documentElement;
  
    if (isOpen) {
      html.classList.add('overflow-hidden');
    } else {
      html.classList.remove('overflow-hidden');
    }
  
    return () => {
      html.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center bg-red-600 text-white p-4 fixed top-0 left-0 right-0 z-40 shadow-lg">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Dine<span className="text-yellow-300">Mind</span>
        </Link>

        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-[200px] bg-gradient-to-b from-red-600 to-red-700 text-white flex-col items-center py-8 h-screen fixed top-0 left-0 shadow-xl z-40">
        <Link href="/" className="text-3xl font-bold mb-16 tracking-tight">
          Dine<span className="text-yellow-300">Mind</span>
        </Link>

        <nav className="flex flex-col space-y-8 text-lg w-full px-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
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

        
        </div>
      </aside>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 bg-red-700 text-white z-30 md:hidden shadow-lg"
          >
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center space-x-3 hover:bg-red-600 px-4 py-3 transition-colors border-b border-red-600">
                    {link.icon}
                    <span>{link.label}</span>
                  </div>
                </Link>
              ))}

              <div className="flex justify-between items-center px-4 py-3 border-b border-red-600">
                <span>Theme</span>
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for mobile header */}
      <div className="md:hidden h-16"></div>
    </>
  );
}
