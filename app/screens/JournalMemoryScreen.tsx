import {
  View,
  Text,
  ScrollView,
  StatusBar,
} from "react-native";

import {
  useLocalSearchParams,
} from "expo-router";

import {
  LinearGradient,
} from "expo-linear-gradient";

import {
  BlurView,
} from "expo-blur";

import {
  useCalendarState,
} from "../calendarStore";

export default function JournalMemoryScreen() {
  const { date } =
    useLocalSearchParams();

  const calendar =
    useCalendarState();

  const entry =
    calendar[date as string];

  /* FALLBACK */

  if (!entry) {
    return (
      <View
        style={{
          flex: 1,

          justifyContent:
            "center",

          alignItems: "center",

          backgroundColor:
            "#0f0f0f",
        }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          Memory not found
        </Text>
      </View>
    );
  }

  /* MOOD THEMES */

  function getMoodGradient() {
    const mood =
      (
        entry.mood || ""
      ).toLowerCase();

    if (
      mood.includes(
        "reflective"
      )
    ) {
      return [
        "#1e3c72",
        "#2a5298",
        "#0f172a",
      ];
    }

    if (
      mood.includes("quiet")
    ) {
      return [
        "#134e5e",
        "#71b280",
        "#0f172a",
      ];
    }

    if (
      mood.includes("strong")
    ) {
      return [
        "#f7971e",
        "#ffd200",
        "#7c2d12",
      ];
    }

    return [
      "#232526",
      "#414345",
      "#0f172a",
    ];
  }

  /* SPLIT JOURNAL */

  const journalBlocks =
    entry.journal
      ?.split("\n\n\n")
      ?.filter(Boolean) || [];

  /* QUOTES */

  const quotes = [
    "You survived another difficult day gently.",

    "Consistency quietly changes identity.",

    "Your future is listening to your present habits.",

    "Healing is also progress.",

    "Small peaceful steps still count.",
  ];

  const randomQuote =
    quotes[
      new Date(date as string).getDate() %
        quotes.length
    ];

  return (
    <>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={
          getMoodGradient() as any
        }
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

            paddingBottom: 120,
          }}
        >
          {/* DATE */}

          <Text
            style={{
              color:
                "rgba(255,255,255,0.55)",

              letterSpacing: 2,

              fontSize: 14,

              marginBottom: 12,
            }}
          >
            MEMORY ARCHIVE
          </Text>

          <Text
            style={{
              color: "white",

              fontSize: 46,

              fontWeight: "200",

              marginBottom: 14,
            }}
          >
            {date}
          </Text>

          {/* QUOTE */}

          <Text
            style={{
              color:
                "rgba(255,255,255,0.82)",

              fontSize: 18,

              lineHeight: 34,

              marginBottom: 40,

              fontStyle: "italic",
            }}
          >
            "{randomQuote}"
          </Text>

          {/* MOOD */}

          <BlurView
            intensity={35}
            tint="dark"
            style={{
              borderRadius: 34,

              overflow: "hidden",

              marginBottom: 30,
            }}
          >
            <View
              style={{
                padding: 28,

                backgroundColor:
                  "rgba(255,255,255,0.08)",
              }}
            >
              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.5)",

                  letterSpacing: 2,

                  marginBottom: 14,
                }}
              >
                EMOTIONAL STATE
              </Text>

              <Text
                style={{
                  color: "white",

                  fontSize: 28,

                  fontWeight: "300",
                }}
              >
                {entry.mood}
              </Text>
            </View>
          </BlurView>

          {/* JOURNAL BLOCKS */}

          {journalBlocks.map(
            (
              block: string,
              index: number
            ) => (
              <BlurView
                key={index}
                intensity={30}
                tint="dark"
                style={{
                  borderRadius: 34,

                  overflow: "hidden",

                  marginBottom: 24,
                }}
              >
                <View
                  style={{
                    padding: 28,

                    backgroundColor:
                      "rgba(255,255,255,0.07)",
                  }}
                >
                  <Text
                    style={{
                      color:
                        "rgba(255,255,255,0.88)",

                      lineHeight: 34,

                      fontSize: 18,
                    }}
                  >
                    {block}
                  </Text>
                </View>
              </BlurView>
            )
          )}
        </ScrollView>
      </LinearGradient>
    </>
  );
}