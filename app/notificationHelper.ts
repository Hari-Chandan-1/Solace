import * as Notifications from "expo-notifications";

import AsyncStorage from "@react-native-async-storage/async-storage";

const JOURNAL_NOTIFICATION_IDS =
  "JOURNAL_NOTIFICATION_IDS";
const JOURNAL_COMPLETED =
  "JOURNAL_COMPLETED";
  export async function markJournalCompleted() {
  await AsyncStorage.setItem(
    JOURNAL_COMPLETED,
    "true"
  );
}
export async function setupNotifications() {
  await Notifications.requestPermissionsAsync();

  await Notifications.setNotificationChannelAsync(
    "daily-reminders",
    {
      name: "Daily Reminders",

      importance:
        Notifications.AndroidImportance.HIGH,

      sound: "default",
    }
  );

  await scheduleJournalNotifications();
}

/* JOURNAL NOTIFICATIONS */

export async function scheduleJournalNotifications() {
  /* CLEAR OLD JOURNAL IDS */
  const completed =
  await AsyncStorage.getItem(
    JOURNAL_COMPLETED
  );

if (completed === "true")
  return;
  const savedIds =
    await AsyncStorage.getItem(
      JOURNAL_NOTIFICATION_IDS
    );

  if (savedIds) {
    const ids =
      JSON.parse(savedIds);

    for (const id of ids) {
      await Notifications.cancelScheduledNotificationAsync(
        id
      );
    }
  }

  let notificationIds =
    [];

  /* FIRST REMINDER */

  const firstId =
    await Notifications.scheduleNotificationAsync(
      {
        content: {
          title:
            "What stayed with you today?",

          body:
            "Your nightly reflection is waiting.",

          sound: "default",

          data: {
            screen:
              "journal",
          },
        },

        trigger: {
          type:
            Notifications.SchedulableTriggerInputTypes.DAILY,

          hour: 21,

          minute: 45,

          channelId:
            "daily-reminders",
        },
      }
    );

  notificationIds.push(firstId);

  /* SECOND REMINDER */

  const secondId =
    await Notifications.scheduleNotificationAsync(
      {
        content: {
          title:
            "Before today fades away...",

          body:
            "Leave a few honest words behind tonight.",

          sound: "default",

          data: {
            screen:
              "journal",
          },
        },

        trigger: {
          type:
            Notifications.SchedulableTriggerInputTypes.DAILY,

          hour: 22,

          minute: 15,

          channelId:
            "daily-reminders",
        },
      }
    );

  notificationIds.push(secondId);

  await AsyncStorage.setItem(
    JOURNAL_NOTIFICATION_IDS,
    JSON.stringify(
      notificationIds
    )
  );
}

/* CANCEL AFTER JOURNAL COMPLETE */

export async function cancelJournalNotifications() {
  const savedIds =
    await AsyncStorage.getItem(
      JOURNAL_NOTIFICATION_IDS
    );

  if (!savedIds) return;

  const ids =
    JSON.parse(savedIds);

  for (const id of ids) {
    await Notifications.cancelScheduledNotificationAsync(
      id
    );
  }

  await AsyncStorage.removeItem(
    JOURNAL_NOTIFICATION_IDS
  );
}