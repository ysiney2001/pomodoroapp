import React from 'react';
import { motion } from 'framer-motion';
import { formatTime } from '../../utils/timeUtils';

const CircularProgress = ({ progress, timeLeft, mode }) => {
  const modeColors = {
    pomodoro: 'bg-gray-800',
    shortBreak: 'bg-green-500',
    longBreak: 'bg-blue-500'
  };

  const modeTextColors = {
    pomodoro: 'text-white', // Changed from 'text-gray-700 dark:text-gray-300'
    shortBreak: 'text-white',
    longBreak: 'text-white'
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Main Timer Container - Simple transparent design */}
      <motion.div 
        className="relative p-8 bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm rounded-3xl"
        animate={{ scale: [1, 1.01, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Timer Display */}
        <div className="text-center mb-6">
          <motion.div 
            className="text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-tight leading-none"
            style={{
              fontFamily: '"Inter", "SF Pro Display", "Segoe UI", system-ui, -apple-system, sans-serif',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              letterSpacing: '-0.02em'
            }}
            key={timeLeft}
            initial={{ scale: 1.05, opacity: 0.9 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {formatTime(timeLeft)}
          </motion.div>
          <motion.div 
            className={`text-lg ${modeTextColors[mode]} mt-2 font-medium tracking-wide`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {mode === 'shortBreak' ? 'Short Break' : mode === 'longBreak' ? 'Long Break' : 'Focus Time'}
          </motion.div>
        </div>

        {/* Progress Bar - Minimal design */}
        <div className="w-full">
          <div className="flex justify-between text-sm text-white mb-3">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-2 overflow-hidden">
            <motion.div 
              className={`h-full ${modeColors[mode]} rounded-full shadow-sm`}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CircularProgress;