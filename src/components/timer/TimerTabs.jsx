import React from 'react';
import { motion } from 'framer-motion';

const TimerTabs = ({ currentMode, onModeChange, disabled }) => {
  const tabs = [
    { id: 'pomodoro', label: 'Pomodoro', color: 'red' },
    { id: 'shortBreak', label: 'Short Break', color: 'green' },
    { id: 'longBreak', label: 'Long Break', color: 'blue' }
  ];

  return (
    <div className="flex bg-gray-100 dark:bg-gray-800 rounded-2xl p-1 mb-8 max-w-md mx-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => !disabled && onModeChange(tab.id)}
          disabled={disabled}
          className={`relative flex-1 py-3 px-4 text-sm font-medium rounded-xl transition-all duration-200 ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/50 dark:hover:bg-gray-700/50'
          }`}
        >
          {currentMode === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white dark:bg-gray-700 rounded-xl shadow-sm"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className={`relative z-10 ${
            currentMode === tab.id 
              ? 'text-gray-900 dark:text-gray-100' 
              : 'text-gray-600 dark:text-gray-400'
          }`}>
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TimerTabs;