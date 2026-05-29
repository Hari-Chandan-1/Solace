import { Stack, router } from "expo-router";
import { useEffect } from "react";

import * as Notifications from "expo-notifications";


import { loadSounds } from "./soundHelper";
import { setupNotifications } from "./notificationHelper";

export default function Layout() {
  useEffect(() => {
    // TEMPORARY
    // Run ONCE to clear your test data

    setupNotifications();

    loadSounds();

    const subscription =
      Notifications.addNotificationResponseReceivedListener(
        (response) => {
          const screen =
            response.notification.request.content.data?.screen;

          if (screen === "journal") {
            router.push("/(tabs)/journal");
          }
        }
      );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}