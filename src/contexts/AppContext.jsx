import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const AppContext = createContext();

const initialState = {
  user: null,
  loading: true,
  theme: 'light',
  // Mode-specific color themes
  modeColorThemes: {
    pomodoro: 'red',
    shortBreak: 'green', 
    longBreak: 'blue'
  },
  showAuthModal: false,
  showSettingsModal: false,
  showStatsModal: false,
  timerState: {
    mode: 'pomodoro', // 'pomodoro', 'shortBreak', 'longBreak'
    timeLeft: 25 * 60, // 25 minutes in seconds
    isRunning: false,
    isPaused: false,
    sessionCount: 0,
    currentTask: null,
  },
  settings: {
    pomodoroDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    autoStartBreaks: false,
    autoStartPomodoros: false,
    soundEnabled: true,
    soundVolume: 0.5,
    selectedSound: 'bell',
    soundRepeatCount: 1,
    notificationsEnabled: true,
  },
  tasks: [],
  stats: {
    totalSessions: 0,
    totalFocusTime: 0,
    dailyStats: {},
    weeklyStats: {},
    monthlyStats: {},
  }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_MODE_COLOR_THEME':
      return { 
        ...state, 
        modeColorThemes: { 
          ...state.modeColorThemes, 
          [action.payload.mode]: action.payload.colorTheme 
        } 
      };
    case 'SET_MODE_COLOR_THEMES':
      return { ...state, modeColorThemes: action.payload };
    case 'UPDATE_TIMER':
      return { ...state, timerState: { ...state.timerState, ...action.payload } };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'UPDATE_STATS':
      return { ...state, stats: { ...state.stats, ...action.payload } };
    case 'TOGGLE_AUTH_MODAL':
      return { ...state, showAuthModal: !state.showAuthModal };
    case 'CLOSE_AUTH_MODAL':
      return { ...state, showAuthModal: false };
    case 'TOGGLE_SETTINGS_MODAL':
      return { ...state, showSettingsModal: !state.showSettingsModal };
    case 'CLOSE_SETTINGS_MODAL':
      return { ...state, showSettingsModal: false };
    case 'TOGGLE_STATS_MODAL':
      return { ...state, showStatsModal: !state.showStatsModal };
    case 'CLOSE_STATS_MODAL':
      return { ...state, showStatsModal: false };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch({ type: 'SET_USER', payload: user });
        await loadUserData(user.uid);
      } else {
        dispatch({ type: 'SET_USER', payload: null });
        loadLocalData();
      }
    });

    return () => unsubscribe();
  }, []);

  const loadUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        dispatch({ type: 'UPDATE_SETTINGS', payload: userData.settings || {} });
        dispatch({ type: 'SET_TASKS', payload: userData.tasks || [] });
        dispatch({ type: 'UPDATE_STATS', payload: userData.stats || {} });
        dispatch({ type: 'SET_THEME', payload: userData.theme || 'light' });
        
        // Handle both old colorTheme and new modeColorThemes
        if (userData.modeColorThemes) {
          dispatch({ type: 'SET_MODE_COLOR_THEMES', payload: userData.modeColorThemes });
        } else if (userData.colorTheme) {
          // Migrate old single colorTheme to mode-specific themes
          const migratedThemes = {
            pomodoro: userData.colorTheme,
            shortBreak: 'green',
            longBreak: 'blue'
          };
          dispatch({ type: 'SET_MODE_COLOR_THEMES', payload: migratedThemes });
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Failed to load user data');
    }
  };

  const loadLocalData = () => {
    const localTheme = localStorage.getItem('pomodoro-theme') || 'light';
    const localModeColorThemes = JSON.parse(
      localStorage.getItem('pomodoro-mode-color-themes') || 
      JSON.stringify(initialState.modeColorThemes)
    );
    const localSettings = JSON.parse(localStorage.getItem('pomodoro-settings') || '{}');
    const localTasks = JSON.parse(localStorage.getItem('pomodoro-tasks') || '[]');
    const localStats = JSON.parse(localStorage.getItem('pomodoro-stats') || JSON.stringify(initialState.stats));
    
    dispatch({ type: 'SET_THEME', payload: localTheme });
    dispatch({ type: 'SET_MODE_COLOR_THEMES', payload: localModeColorThemes });
    dispatch({ type: 'UPDATE_SETTINGS', payload: { ...initialState.settings, ...localSettings } });
    dispatch({ type: 'SET_TASKS', payload: localTasks });
    dispatch({ type: 'UPDATE_STATS', payload: { ...initialState.stats, ...localStats } });
  };

  const saveUserData = async () => {
    if (state.user) {
      try {
        await setDoc(doc(db, 'users', state.user.uid), {
          settings: state.settings,
          tasks: state.tasks,
          stats: state.stats,
          theme: state.theme,
          modeColorThemes: state.modeColorThemes,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    } else {
      // Save all data to localStorage for non-logged-in users
      localStorage.setItem('pomodoro-theme', state.theme);
      localStorage.setItem('pomodoro-mode-color-themes', JSON.stringify(state.modeColorThemes));
      localStorage.setItem('pomodoro-settings', JSON.stringify(state.settings));
      localStorage.setItem('pomodoro-tasks', JSON.stringify(state.tasks));
      localStorage.setItem('pomodoro-stats', JSON.stringify(state.stats));
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch, saveUserData }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};