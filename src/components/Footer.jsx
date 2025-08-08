import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white/10 backdrop-blur-sm border-t border-white/20 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-white mb-2">PomodoroFocus</h3>
            <p className="text-white/80 text-sm max-w-md">
              Boost your productivity with the proven Pomodoro Technique. Stay focused, manage time better, and achieve more.
            </p>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-6">
            <Link 
              to="/" 
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/privacy" 
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link 
              to="/contact" 
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/20 mt-6 pt-6 text-center">
          <p className="text-white/60 text-sm">
            © 2024 PomodoroFocus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;