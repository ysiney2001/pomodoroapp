import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import Button from '../ui/Button';
import CircularProgress from './CircularProgress';
import TimerTabs from './TimerTabs';
import { formatTime } from '../../utils/timeUtils';
import { playNotificationSound, requestNotificationPermission, showNotification } from '../../utils/notificationUtils';
import toast from 'react-hot-toast';

const Timer = () => {
  const { state, dispatch, saveUserData } = useApp();
  const { timerState, settings } = state;
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (timerState.isRunning && !timerState.isPaused) {
      intervalRef.current = setInterval(() => {
        dispatch({ 
          type: 'UPDATE_TIMER', 
          payload: { timeLeft: Math.max(0, timerState.timeLeft - 1) }
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [timerState.isRunning, timerState.isPaused, timerState.timeLeft, dispatch]);

  useEffect(() => {
    if (timerState.timeLeft === 0 && timerState.isRunning) {
      handleTimerComplete();
    }
  }, [timerState.timeLeft, timerState.isRunning]);

  const handleTimerComplete = async () => {
    // Stop timer
    dispatch({ 
      type: 'UPDATE_TIMER', 
      payload: { isRunning: false, isPaused: false }
    });

    // Play sound
    if (settings.soundEnabled) {
      playNotificationSound(settings.selectedSound, settings.soundVolume, settings.soundRepeatCount);
    }

    // Show notification
    if (settings.notificationsEnabled) {
      const message = timerState.mode === 'pomodoro' 
        ? 'Great job! Time for a break.' 
        : 'Break time is over. Ready to focus?';
      showNotification('Pomodoro Timer', message);
    }

    // Update stats
    if (timerState.mode === 'pomodoro') {
      const newSessionCount = timerState.sessionCount + 1;
      dispatch({ 
        type: 'UPDATE_TIMER', 
        payload: { sessionCount: newSessionCount }
      });
      
      // Update stats
      const today = new Date().toISOString().split('T')[0];
      dispatch({
        type: 'UPDATE_STATS',
        payload: {
          totalSessions: state.stats.totalSessions + 1,
          totalFocusTime: state.stats.totalFocusTime + settings.pomodoroDuration,
          dailyStats: {
            ...state.stats.dailyStats,
            [today]: {
              sessions: (state.stats.dailyStats[today]?.sessions || 0) + 1,
              focusTime: (state.stats.dailyStats[today]?.focusTime || 0) + settings.pomodoroDuration
            }
          }
        }
      });
    }

    // Auto-switch modes
    if (timerState.mode === 'pomodoro') {
      const nextMode = timerState.sessionCount % 4 === 3 ? 'longBreak' : 'shortBreak';
      switchMode(nextMode);
      
      if (settings.autoStartBreaks) {
        setTimeout(() => startTimer(), 1000);
      }
    } else {
      switchMode('pomodoro');
      
      if (settings.autoStartPomodoros) {
        setTimeout(() => startTimer(), 1000);
      }
    }

    // Save data
    await saveUserData();
    
    toast.success(
      timerState.mode === 'pomodoro' 
        ? 'Pomodoro completed! 🍅' 
        : 'Break finished! Ready to focus? 💪'
    );
  };

  const startTimer = () => {
    if (timerState.timeLeft === 0) {
      resetTimer();
    }
    dispatch({ 
      type: 'UPDATE_TIMER', 
      payload: { isRunning: true, isPaused: false }
    });
  };

  const pauseTimer = () => {
    dispatch({ 
      type: 'UPDATE_TIMER', 
      payload: { isRunning: false, isPaused: true }
    });
  };

  const resetTimer = () => {
    const duration = getDurationForMode(timerState.mode);
    dispatch({ 
      type: 'UPDATE_TIMER', 
      payload: { 
        timeLeft: duration * 60, 
        isRunning: false, 
        isPaused: false 
      }
    });
  };

  const skipTimer = () => {
    dispatch({ 
      type: 'UPDATE_TIMER', 
      payload: { timeLeft: 0 }
    });
  };

  const switchMode = (mode) => {
    const duration = getDurationForMode(mode);
    dispatch({ 
      type: 'UPDATE_TIMER', 
      payload: { 
        mode, 
        timeLeft: duration * 60, 
        isRunning: false, 
        isPaused: false 
      }
    });
  };

  const getDurationForMode = (mode) => {
    switch (mode) {
      case 'pomodoro': return settings.pomodoroDuration;
      case 'shortBreak': return settings.shortBreakDuration;
      case 'longBreak': return settings.longBreakDuration;
      default: return 25;
    }
  };

  const progress = (() => {
    const totalDuration = getDurationForMode(timerState.mode) * 60;
    return ((totalDuration - timerState.timeLeft) / totalDuration) * 100;
  })();

  // Add this useEffect after the existing useEffect hooks (around line 35)
  useEffect(() => {
    // When settings change, update the timer duration if the timer is not running
    if (!timerState.isRunning) {
      const newDuration = getDurationForMode(timerState.mode) * 60;
      if (timerState.timeLeft !== newDuration) {
        dispatch({ 
          type: 'UPDATE_TIMER', 
          payload: { timeLeft: newDuration }
        });
      }
    }
  }, [settings.pomodoroDuration, settings.shortBreakDuration, settings.longBreakDuration, timerState.mode, timerState.isRunning, timerState.timeLeft, dispatch]);

  return (
    <div className="text-center">
      <TimerTabs 
        currentMode={timerState.mode} 
        onModeChange={switchMode}
        disabled={timerState.isRunning}
      />
      
      <motion.div 
        className="my-12"
        animate={timerState.isRunning ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <CircularProgress 
          progress={progress}
          timeLeft={timerState.timeLeft}
          mode={timerState.mode}
        />
      </motion.div>

      <div className="flex items-center justify-center space-x-4">
        <AnimatePresence mode="wait">
          {!timerState.isRunning ? (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={startTimer}
                className="px-8"
              >
                <Play className="w-5 h-5 mr-2" />
                {timerState.isPaused ? 'Resume' : 'Start'}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="pause"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Button
                variant="secondary"
                size="lg"
                onClick={pauseTimer}
                className="px-8"
              >
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="ghost"
          size="lg"
          onClick={resetTimer}
          disabled={timerState.timeLeft === getDurationForMode(timerState.mode) * 60}
          className="text-white hover:text-black"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="lg"
          onClick={skipTimer}
          disabled={!timerState.isRunning && !timerState.isPaused}
          className="text-white hover:text-black"
        >
          <SkipForward className="w-5 h-5" />
        </Button>
      </div>

      {timerState.sessionCount > 0 && (
        <motion.div 
          className="mt-6 text-sm text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Sessions completed: {timerState.sessionCount}
        </motion.div>
      )}
    </div>
  );
};

export default Timer;