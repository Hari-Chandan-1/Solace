import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";

import * as Notifications from "expo-notifications";

import { setupNotifications } from "./notificationHelper";
import { loadSounds } from "./soundHelper";

export default function Layout() {
  const [loggedIn] =
    useState(false);

  useEffect(() => {
    setupNotifications();

    loadSounds();

    if (!loggedIn) {
      router.replace("/login");
    }

    const subscription =
      Notifications.addNotificationResponseReceivedListener(
        (response) => {
          const screen =
            response.notification.request.content.data?.screen;

          if (screen === "journal") {
            router.push(
              "/(tabs)/journal"
            );
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