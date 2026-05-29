import { Tabs } from "expo-router";

import {
  House,
  CalendarDays,
  TimerReset,
  BookOpen,
  CalendarRange,
  User,
} from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",

          backgroundColor:
            "rgba(10,10,10,0.82)",

          borderTopWidth: 0,

          height: 86,

          paddingBottom: 14,

          paddingTop: 12,

          marginHorizontal: 18,

          marginBottom: 18,

          borderRadius: 30,
        },

        tabBarActiveTintColor: "white",

        tabBarInactiveTintColor:
          "rgba(255,255,255,0.35)",
      }}
    >
      {/* HOME */}

      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({
            color,
            size,
          }) => (
            <House
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* PLANNER */}

      <Tabs.Screen
        name="planner"
        options={{
          tabBarIcon: ({
            color,
            size,
          }) => (
            <CalendarDays
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* FOCUS */}

      <Tabs.Screen
        name="focus"
        options={{
          tabBarIcon: ({
            color,
            size,
          }) => (
            <TimerReset
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* JOURNAL */}

      <Tabs.Screen
        name="journal"
        options={{
          tabBarIcon: ({
            color,
            size,
          }) => (
            <BookOpen
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
  name="calendar"
  options={{
    tabBarIcon: ({
      color,
      size,
    }) => (
      <CalendarRange
        color={color}
        size={size}
      />
    ),
  }}
/>
      {/* PROFILE */}

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({
            color,
            size,
          }) => (
            <User
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* REMOVE EXPLORE */}

      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}