import { router } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";

import { Calendar } from "react-native-calendars";

import { BlurView } from "expo-blur";

import { LinearGradient } from "expo-linear-gradient";

import {
  useCalendarState,
} from "../calendarStore";

export default function CalendarScreen() {
  const calendar =
    useCalendarState();

  const [selectedDate, setSelectedDate] =
  useState(
    new Date()
      .toISOString()
      .split("T")[0]
  );

  const selectedData =
    calendar[selectedDate] || {};

  return (
    <>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={require("../../assets/backgrounds/CalendarBackground.jpg")}
        resizeMode="cover"
        style={{
          flex: 1,
        }}
      >
        <LinearGradient
          colors={[
            "rgba(0,0,0,0.20)",
            "rgba(0,0,0,0.92)",
          ]}
          style={{
            flex: 1,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={{
              paddingTop: 90,
              paddingHorizontal: 24,
              paddingBottom: 180,
            }}
          >
            {/* TITLE */}

            <Text
              style={{
                color:
                  "rgba(255,255,255,0.45)",

                fontSize: 15,

                letterSpacing: 2,

                marginBottom: 10,
              }}
            >
              MEMORY TIMELINE
            </Text>

            <Text
              style={{
                color: "white",

                fontSize: 56,

                fontWeight: "200",

                marginBottom: 32,
              }}
            >
              Calendar
            </Text>

            {/* CALENDAR */}

            <BlurView
              intensity={45}
              tint="dark"
              style={{
                borderRadius: 36,

                overflow: "hidden",

                marginBottom: 28,
              }}
            >
              <View
                style={{
                  padding: 18,

                  backgroundColor:
                    "rgba(255,255,255,0.05)",
                }}
              >
                <Calendar
                  onDayPress={(day) => {
                    setSelectedDate(
                      day.dateString
                    );
                  }}
                  theme={{
                    backgroundColor:
                      "transparent",

                    calendarBackground:
                      "transparent",

                    dayTextColor:
                      "white",

                    monthTextColor:
                      "white",

                    arrowColor:
                      "white",

                    textDisabledColor:
                      "rgba(255,255,255,0.25)",

                    todayTextColor:
                      "#ffffff",

                    selectedDayBackgroundColor:
                      "rgba(255,255,255,0.18)",

                    selectedDayTextColor:
                      "white",
                  }}
                  markedDates={{
  ...Object.keys(calendar).reduce(
    (acc: any, date) => {
      acc[date] = {
        marked: true,

        dotColor: "white",
      };

      return acc;
    },
    {}
  ),

  ...(selectedDate && {
    [selectedDate]: {
      selected: true,

      marked: true,

      dotColor: "white",

      selectedColor:
        "rgba(255,255,255,0.18)",
    },
  }),
}}
                />
              </View>
            </BlurView>

            {/* DETAILS */}

            <BlurView
  intensity={45}
  tint="dark"
  style={{
    borderRadius: 36,

    overflow: "hidden",
  }}
>
  
              <View
                style={{
                  padding: 30,

                  backgroundColor:
                    "rgba(255,255,255,0.05)",
                }}
              >
                <Text
                  style={{
                    color:
                      "rgba(255,255,255,0.45)",

                    letterSpacing: 2,

                    marginBottom: 20,

                    fontSize: 13,
                  }}
                >
                  DAY MEMORY
                </Text>

                <Text
                  style={{
                    color: "white",

                    fontSize: 20,

                    marginBottom: 20,
                  }}
                >
                  {selectedDate ||
                    "Select a day"}
                </Text>

                <Text
                  style={{
                    color:
                      "rgba(255,255,255,0.7)",

                    lineHeight: 30,

                    fontSize: 17,
                  }}
                >
                  Mood:{" "}
                  {selectedData.mood ||
                    "-"}

                  {"\n\n"}

                  Progress:{" "}
                  {selectedData.progress ||
                    0}
                  %

                  {"\n\n"}

                  Journal:
                  {"\n"}

                  <TouchableOpacity
  activeOpacity={0.85}
  onPress={() => {
    if (selectedData.journal) {
      router.push({
        pathname:
          "/screens/JournalMemoryScreen",

        params: {
          date: selectedDate,
        },
      });
    }
  }}
  style={{
    marginTop: 14,

    alignSelf: "flex-start",
  }}
>
  <LinearGradient
    colors={[
      "rgba(255,255,255,0.22)",
      "rgba(255,255,255,0.08)",
    ]}
    start={{
      x: 0,
      y: 0,
    }}
    end={{
      x: 1,
      y: 1,
    }}
    style={{
      paddingVertical: 18,

      paddingHorizontal: 28,

      borderRadius: 999,

      overflow: "hidden",
    }}
  >
    <Text
      style={{
        color: "white",

        fontSize: 16,

        letterSpacing: 1,

        fontWeight: "300",
      }}
    >
      Open Memory
    </Text>
  </LinearGradient>
</TouchableOpacity>
                </Text>
              </View>
            </BlurView>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </>
  );
}