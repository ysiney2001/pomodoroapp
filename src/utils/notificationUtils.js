export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const showNotification = (title, body, icon = '/vite.svg') => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon,
      badge: icon,
      tag: 'pomodoro-timer',
      requireInteraction: false,
      silent: false
    });
  }
};

export const playNotificationSound = (soundType = 'bell', volume = 0.5, repeatCount = 1) => {
  try {
    let currentRepeat = 0;
    
    const playSound = () => {
      if (currentRepeat < repeatCount) {
        const audio = new Audio(`/sounds/${soundType}.mp3`);
        audio.volume = volume;
        
        audio.addEventListener('ended', () => {
          currentRepeat++;
          if (currentRepeat < repeatCount) {
            // Small delay between repeats (300ms)
            setTimeout(playSound, 300);
          }
        });
        
        audio.play().catch(console.error);
      }
    };
    
    playSound();
  } catch (error) {
    console.error('Error playing notification sound:', error);
  }
};

// Initialize notification permission on app load
export const initializeNotifications = () => {
  requestNotificationPermission();
};