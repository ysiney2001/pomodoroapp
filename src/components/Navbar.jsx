import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Timer, 
  BarChart3, 
  Settings, 
  LogIn, 
  UserPlus, 
  User, 
  LogOut,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import Button from './ui/Button';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { state, dispatch } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    dispatch({ type: 'SET_THEME', payload: newTheme });
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2 sm:space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <Timer className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
              PomodoroFocus
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {state.theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>

            {/* Stats button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: 'TOGGLE_STATS_MODAL' })}
              className="p-2"
            >
              <BarChart3 className="w-4 h-4" />
            </Button>

            {/* Settings button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: 'TOGGLE_SETTINGS_MODAL' })}
              className="p-2"
            >
              <Settings className="w-4 h-4" />
            </Button>

            {/* Auth buttons */}
            {state.user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2"
                >
                  {state.user.photoURL ? (
                    <img 
                      src={state.user.photoURL} 
                      alt="Profile" 
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </Button>
                
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                  >
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {state.user.displayName || state.user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dispatch({ type: 'TOGGLE_AUTH_MODAL', payload: 'signin' })}
                  className="hidden sm:flex"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => dispatch({ type: 'TOGGLE_AUTH_MODAL', payload: 'signup' })}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up Free
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2"
            >
              {showMobileMenu ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
            >
              <div className="flex flex-col space-y-3">
                {/* Mobile Auth Buttons */}
                {!state.user && (
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        dispatch({ type: 'TOGGLE_AUTH_MODAL', payload: 'signin' });
                        setShowMobileMenu(false);
                      }}
                      className="justify-start"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        dispatch({ type: 'TOGGLE_AUTH_MODAL', payload: 'signup' });
                        setShowMobileMenu(false);
                      }}
                      className="justify-start"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Sign Up Free
                    </Button>
                  </div>
                )}

                {/* Mobile Navigation Items */}
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      dispatch({ type: 'TOGGLE_STATS_MODAL' });
                      setShowMobileMenu(false);
                    }}
                    className="justify-start"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Statistics
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      dispatch({ type: 'TOGGLE_SETTINGS_MODAL' });
                      setShowMobileMenu(false);
                    }}
                    className="justify-start"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      toggleTheme();
                      setShowMobileMenu(false);
                    }}
                    className="justify-start"
                  >
                    {state.theme === 'light' ? (
                      <>
                        <Moon className="w-4 h-4 mr-2" />
                        Dark Mode
                      </>
                    ) : (
                      <>
                        <Sun className="w-4 h-4 mr-2" />
                        Light Mode
                      </>
                    )}
                  </Button>
                </div>

                {/* Mobile User Menu */}
                {state.user && (
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="px-2 py-2 mb-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {state.user.displayName || state.user.email}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        handleSignOut();
                        setShowMobileMenu(false);
                      }}
                      className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;