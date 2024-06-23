import * as Notifications from 'expo-notifications';

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Schedule notification function
export const scheduleNotification = async (title, body, secondsUntilDose) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: 'default',
      },
      trigger: {
        seconds: secondsUntilDose,
      },
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};
