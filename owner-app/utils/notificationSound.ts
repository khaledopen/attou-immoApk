import { Platform } from 'react-native';

// Safely load Audio without throwing if native module ExponentAV is missing in Expo Go
let Audio: any = null;
try {
  const expoAv = require('expo-av');
  Audio = expoAv?.Audio || null;
} catch (e) {
  // ExponentAV native module not found
}

// Actifs sonores
let MESSAGE_SOUND: any = null;
let NOTIFICATION_SOUND: any = null;

try {
  MESSAGE_SOUND = require('../assets/sounds/message.mp3');
  NOTIFICATION_SOUND = require('../assets/sounds/notification.mp3');
} catch (e) {}

let messageSoundObject: any = null;
let notificationSoundObject: any = null;

/**
 * Configure audio mode for background/silent mode compatibility
 */
const configureAudio = async () => {
  if (!Audio?.setAudioModeAsync) return;
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false,
      shouldDuckAndroid: true,
    });
  } catch (error) {
    console.log('[NotificationSound] Audio config error:', error);
  }
};

/**
 * Play the message received sound
 */
export const playMessageSound = async () => {
  if (!Audio?.Sound || !MESSAGE_SOUND) return;
  try {
    await configureAudio();

    // Décharger l'instance précédente si elle existe
    if (messageSoundObject) {
      try {
        await messageSoundObject.unloadAsync();
      } catch {}
      messageSoundObject = null;
    }

    const { sound } = await Audio.Sound.createAsync(MESSAGE_SOUND, {
      shouldPlay: true,
      volume: 0.8,
    });
    messageSoundObject = sound;

    // Nettoyage automatique après lecture
    sound.setOnPlaybackStatusUpdate((status: any) => {
      if (status?.isLoaded && status?.didJustFinish) {
        sound.unloadAsync().catch(() => {});
        messageSoundObject = null;
      }
    });
  } catch (error) {
    console.log('[NotificationSound] Error playing message sound:', error);
  }
};

/**
 * Play the notification/announcement sound
 */
export const playNotificationSound = async () => {
  if (!Audio?.Sound || !NOTIFICATION_SOUND) return;
  try {
    await configureAudio();

    // Décharger l'instance précédente si elle existe
    if (notificationSoundObject) {
      try {
        await notificationSoundObject.unloadAsync();
      } catch {}
      notificationSoundObject = null;
    }

    const { sound } = await Audio.Sound.createAsync(NOTIFICATION_SOUND, {
      shouldPlay: true,
      volume: 1.0,
    });
    notificationSoundObject = sound;

    // Nettoyage automatique après lecture
    sound.setOnPlaybackStatusUpdate((status: any) => {
      if (status?.isLoaded && status?.didJustFinish) {
        sound.unloadAsync().catch(() => {});
        notificationSoundObject = null;
      }
    });
  } catch (error) {
    console.log('[NotificationSound] Error playing notification sound:', error);
  }
};

/**
 * Cleanup all loaded sounds (call on unmount)
 */
export const unloadSounds = async () => {
  if (!Audio) return;
  try {
    if (messageSoundObject) {
      await messageSoundObject.unloadAsync();
      messageSoundObject = null;
    }
    if (notificationSoundObject) {
      await notificationSoundObject.unloadAsync();
      notificationSoundObject = null;
    }
  } catch (error) {
    console.log('[NotificationSound] Error unloading sounds:', error);
  }
};
