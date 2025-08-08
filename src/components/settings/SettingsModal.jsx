import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Bell, Palette, Volume2 } from 'lucide-react';
import Modal from '../ui/Modal';
import { playNotificationSound } from '../../utils/notificationUtils';

function SettingsModal() {
  const { state, dispatch } = useApp();

  const handleSettingChange = (key, value) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { [key]: value } });
  };

  const handleSoundChange = (soundType) => {
    handleSettingChange('selectedSound', soundType);
    // Play the sound immediately when selected
    if (state.settings.soundEnabled) {
      playNotificationSound(soundType, state.settings.soundVolume, state.settings.soundRepeatCount);
    }
  };

  const handleColorThemeChange = (themeId) => {
    const currentMode = state.timerState.mode;
    dispatch({ 
      type: 'SET_MODE_COLOR_THEME', 
      payload: { 
        mode: currentMode, 
        colorTheme: themeId 
      } 
    });
  };

  const colorThemes = [
    { id: 'red', name: 'Sunset', colors: 'from-red-500 to-orange-500' },
    { id: 'blue', name: 'Clear Night', colors: 'from-blue-800 to-indigo-900' },
    { id: 'green', name: 'Fir Tree', colors: 'from-emerald-500 to-emerald-900' },
    { id: 'purple', name: 'Royal Purple', colors: 'from-purple-500 to-purple-900' },
    { id: 'yellow', name: 'Amber Yellow', colors: 'from-amber-500 to-amber-600' },
    { id: 'gray', name: 'Darkness', colors: 'from-slate-900 to-slate-700' }
  ];

  return (
    <Modal
      isOpen={state.showSettingsModal}
      onClose={() => dispatch({ type: 'CLOSE_SETTINGS_MODAL' })}
      title="Settings"
      size="lg"
    >
      <div className="space-y-6">
        {/* Timer Settings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Timer Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pomodoro Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={state.settings.pomodoroDuration}
                onChange={(e) => handleSettingChange('pomodoroDuration', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Short Break (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={state.settings.shortBreakDuration}
                onChange={(e) => handleSettingChange('shortBreakDuration', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Long Break (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={state.settings.longBreakDuration}
                onChange={(e) => handleSettingChange('longBreakDuration', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <Palette className="w-5 h-5 mr-2" />
            Background Theme for {state.timerState.mode === 'pomodoro' ? 'Focus Time' : state.timerState.mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {colorThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleColorThemeChange(theme.id)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  state.modeColorThemes?.[state.timerState.mode] === theme.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.colors} mx-auto mb-2`} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {theme.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Auto-start Settings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Auto-start Settings
          </h3>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={state.settings.autoStartBreaks}
                onChange={(e) => handleSettingChange('autoStartBreaks', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Auto-start breaks
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={state.settings.autoStartPomodoros}
                onChange={(e) => handleSettingChange('autoStartPomodoros', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Auto-start pomodoros
              </span>
            </label>
          </div>
        </div>

        {/* Sound Settings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <Volume2 className="w-5 h-5 mr-2" />
            Sound Settings
          </h3>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={state.settings.soundEnabled}
                onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable sounds
              </span>
            </label>
            {state.settings.soundEnabled && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sound Type
                  </label>
                  <select
                    value={state.settings.selectedSound}
                    onChange={(e) => handleSoundChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="bell">Bell</option>
                    <option value="chime">Chime</option>
                    <option value="ping">Ping</option>
                    <option value="alert">Alert</option>
                    <option value="digital">Digital</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Repeat Count: {state.settings.soundRepeatCount} time{state.settings.soundRepeatCount !== 1 ? 's' : ''}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={state.settings.soundRepeatCount}
                    onChange={(e) => handleSettingChange('soundRepeatCount', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Volume: {Math.round(state.settings.soundVolume * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={state.settings.soundVolume}
                    onChange={(e) => handleSettingChange('soundVolume', parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
              </>
            )}
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={state.settings.notificationsEnabled}
                onChange={(e) => handleSettingChange('notificationsEnabled', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable notifications
              </span>
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SettingsModal;