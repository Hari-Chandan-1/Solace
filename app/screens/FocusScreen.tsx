import { useEffect, useRef, useState } from "react";

import { useStreakState } from "../streakStore";
const [
  completedSessions,
  setCompletedSessions,
] = useState(0);
import {
  useFocusState,
  completeSession,
  setSessionStartDate,
} from "../focusStore";

import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { BlurView } from "expo-blur";

import { Audio } from "expo-av";

import {
  LineChart,
} from "react-native-chart-kit";
import {
  playButtonSound,
} from "../soundHelper";
export default function FocusScreen() {
  const [seconds, setSeconds] =
    useState(1500);

  const [isRunning, setIsRunning] =
    useState(false);

  const streak = useStreakState();

  const focus = useFocusState();

  const screenWidth =
    Dimensions.get("window").width;

  /* TEMP WEEKLY DATA */

const weeklyFocusData =
  focus.weeklyData.length > 0
    ? focus.weeklyData.map(
        (item: any) =>
          item.minutes
      )
    : [0, 0, 0, 0, 0, 0, 0];

  const [
  sessionCompleted,
  setSessionCompleted,
] = useState(false);

  const soundRef =
    useRef<Audio.Sound | null>(null);

  /* TIMER */

  useEffect(() => {
    let interval: any;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    /* SESSION COMPLETE */

    if (
  seconds === 0 &&
  !sessionCompleted
) { 
    setSessionCompleted(true);    
  stopRain();

      setIsRunning(false);

      setCompletedSessions(
        (prev: number) => prev + 1
      );

      completeSession(25, true);
    }

    return () =>
      clearInterval(interval);
  }, [isRunning, seconds]);

  /* FORMAT */

  const minutes = Math.floor(
    seconds / 60
  );

  const remainingSeconds =
    seconds % 60;

  const formattedTime = `${String(
    minutes
  ).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;

  /* PLAY RAIN */

  async function playRain() {
    const { sound } =
      await Audio.Sound.createAsync(
        require("../../assets/sounds/rain.mp3"),

        {
          shouldPlay: true,

          isLooping: true,

          volume: 1.0,
        }
      );

    soundRef.current = sound;
  }

  /* STOP RAIN */

  async function stopRain() {
    if (soundRef.current) {
      await soundRef.current.stopAsync();

      await soundRef.current.unloadAsync();

      soundRef.current = null;
    }
  }

  /* START */

  async function handleStart() {
    if (!isRunning) {
setSessionCompleted(false);

setIsRunning(true);

await setSessionStartDate();

await playRain();
    }
  }

  /* STOP */

  async function handleStop() {
  setIsRunning(false);

  const focusedMinutes =
    Math.floor(
      (1500 - seconds) / 60
    );

  if (focusedMinutes > 0) {
    await completeSession(
      focusedMinutes,
      false
    );
  }

  await stopRain();
}

  /* RESET */

  async function handleReset() {
    setIsRunning(false);

    setSeconds(1500);

    setSessionCompleted(false);

    await stopRain();
  }

  return (
    <ImageBackground
      source={require("../../assets/backgrounds/focus.jpg")}
      resizeMode="cover"
      style={{
        flex: 1,
      }}
    >
      <LinearGradient
        colors={[
          "rgba(0,0,0,0.30)",
          "rgba(0,0,0,0.92)",
        ]}
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,

            justifyContent: "center",

            alignItems: "center",

            paddingTop: 120,

            paddingBottom: 180,

            paddingHorizontal: 24,
          }}
          showsVerticalScrollIndicator={
            false
          }
        >
          {/* TOP */}

          <Text
            style={{
              color:
                "rgba(255,255,255,0.45)",

              letterSpacing: 3,

              marginBottom: 20,

              fontSize: 13,
            }}
          >
            LOCK-IN MODE
          </Text>

          {/* TITLE */}

          <Text
            style={{
              color: "white",

              fontSize: 56,

              fontWeight: "200",

              marginBottom: 18,
            }}
          >
            Focus
          </Text>

          {/* SUBTEXT */}

          <Text
            style={{
              color:
                "rgba(255,255,255,0.50)",

              textAlign: "center",

              lineHeight: 30,

              fontSize: 16,

              marginBottom: 42,
            }}
          >
            For the next session,{"\n"}
            nothing else exists.
          </Text>

          {/* TIMER */}

          <BlurView
            intensity={55}
            tint="dark"
            style={{
              width: 320,

              height: 320,

              borderRadius: 300,

              overflow: "hidden",

              justifyContent: "center",

              alignItems: "center",

              marginBottom: 34,
            }}
          >
            <View
              style={{
                width: "100%",

                height: "100%",

                justifyContent: "center",

                alignItems: "center",

                backgroundColor:
                  "rgba(255,255,255,0.04)",
              }}
            >
              <Text
                style={{
                  color: "white",

                  fontSize: 76,

                  fontWeight: "200",

                  marginBottom: 10,
                }}
              >
                {formattedTime}
              </Text>

              <Text
                style={{
                  color: isRunning
                    ? "rgba(255,255,255,0.70)"
                    : "rgba(255,255,255,0.35)",

                  letterSpacing: 2,

                  fontSize: 12,
                }}
              >
                {isRunning
                  ? "RAIN AMBIENCE ACTIVE"
                  : "READY TO BEGIN"}
              </Text>
            </View>
          </BlurView>

          {/* BUTTONS */}

          <View
            style={{
              flexDirection: "row",

              marginBottom: 40,
            }}
          >
            <TouchableOpacity
              onPress={async () => {
  await playButtonSound();

  if (isRunning) {
    await handleStop();
  } else {
    await handleStart();
  }
}}
              activeOpacity={0.85}
              style={{
                backgroundColor:
                  "rgba(255,255,255,0.12)",

                paddingVertical: 18,

                paddingHorizontal: 42,

                borderRadius: 26,

                marginRight: 16,
              }}
            >
              <Text
                style={{
                  color: "white",

                  fontSize: 18,

                  fontWeight: "300",
                }}
              >
                {isRunning
                  ? "Pause"
                  : "Start"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
  await playButtonSound();

  handleReset();
}}
              activeOpacity={0.85}
              style={{
                backgroundColor:
                  "rgba(255,255,255,0.06)",

                paddingVertical: 18,

                paddingHorizontal: 34,

                borderRadius: 26,
              }}
            >
              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.85)",

                  fontSize: 18,

                  fontWeight: "300",
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>

          {/* SESSION CARD */}

          <BlurView
            intensity={45}
            tint="dark"
            style={{
              borderRadius: 34,

              overflow: "hidden",

              width: "100%",

              marginBottom: 28,
            }}
          >
            <View
              style={{
                padding: 28,

                backgroundColor:
                  "rgba(255,255,255,0.05)",
              }}
            >
              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.42)",

                  letterSpacing: 2,

                  marginBottom: 14,

                  fontSize: 13,
                }}
              >
                TODAY'S FOCUS
              </Text>

              <Text
                style={{
                  color: "white",

                  fontSize: 46,

                  fontWeight: "200",

                  marginBottom: 8,
                }}
              >
                {completedSessions}
              </Text>

              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.32)",

                  marginBottom: 18,

                  fontSize: 15,
                }}
              >
                {streak.streak} day
                consistency streak
              </Text>

              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.45)",

                  lineHeight: 28,

                  marginBottom: 24,
                }}
              >
                completed deep focus
                sessions today.
              </Text>

              <View
                style={{
                  borderTopWidth: 1,

                  borderTopColor:
                    "rgba(255,255,255,0.08)",

                  paddingTop: 22,
                }}
              >
                <Text
                  style={{
                    color:
                      "rgba(255,255,255,0.72)",

                    fontSize: 18,

                    lineHeight: 34,

                    fontWeight: "300",
                  }}
                >
                  “Protect your attention.
                  Your future is built
                  there.”
                </Text>
              </View>
            </View>
          </BlurView>

          {/* ANALYTICS */}

          <BlurView
            intensity={45}
            tint="dark"
            style={{
              borderRadius: 34,

              overflow: "hidden",

              width: "100%",

              marginBottom: 28,
            }}
          >
            <View
              style={{
                padding: 28,

                backgroundColor:
                  "rgba(255,255,255,0.05)",
              }}
            >
              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.42)",

                  letterSpacing: 2,

                  marginBottom: 22,

                  fontSize: 13,
                }}
              >
                FOCUS ANALYTICS
              </Text>

              {/* STATS */}

              <View
                style={{
                  flexDirection: "row",

                  justifyContent:
                    "space-between",

                  marginBottom: 28,
                }}
              >
                <View>
                  <Text
                    style={{
                      color: "white",

                      fontSize: 34,

                      fontWeight: "200",
                    }}
                  >
                    {focus.totalSessions}
                  </Text>

                  <Text
                    style={{
                      color:
                        "rgba(255,255,255,0.42)",

                      marginTop: 6,
                    }}
                  >
                    Total Sessions
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      color: "white",

                      fontSize: 34,

                      fontWeight: "200",
                    }}
                  >
                    {focus.totalMinutes}
                  </Text>

                  <Text
                    style={{
                      color:
                        "rgba(255,255,255,0.42)",

                      marginTop: 6,
                    }}
                  >
                    Focus Minutes
                  </Text>
                </View>
              </View>

              <View
                style={{
                  borderTopWidth: 1,

                  borderTopColor:
                    "rgba(255,255,255,0.08)",

                  paddingTop: 22,
                }}
              >
                <Text
                  style={{
                    color:
                      "rgba(255,255,255,0.72)",

                    fontSize: 18,

                    lineHeight: 32,

                    fontWeight: "300",
                  }}
                >
                  {focus.todaySessions} deep
                  sessions completed today.
                </Text>
              </View>
            </View>
          </BlurView>

          {/* WEEKLY GRAPH */}

          <BlurView
            intensity={45}
            tint="dark"
            style={{
              borderRadius: 34,

              overflow: "hidden",

              width: "100%",

              marginBottom: 28,
            }}
          >
            <View
              style={{
                paddingVertical: 28,

                backgroundColor:
                  "rgba(255,255,255,0.05)",
              }}
            >
              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.42)",

                  letterSpacing: 2,

                  marginBottom: 24,

                  fontSize: 13,

                  paddingHorizontal: 28,
                }}
              >
                WEEKLY MOMENTUM
              </Text>

              <LineChart
                data={{
                  labels:
  focus.weeklyData.length > 0
    ? focus.weeklyData.map(
        (item: any) =>
          item.day
      )
    : [
        "M",
        "T",
        "W",
        "T",
        "F",
        "S",
        "S",
      ],

                  datasets: [
                    {
                      data:
                        weeklyFocusData,
                    },
                  ],
                }}
                width={
                  screenWidth - 48
                }
                height={220}
                withDots={true}
                withInnerLines={false}
                withOuterLines={false}
                withVerticalLines={false}
                withHorizontalLines={false}
                withShadow={false}
                fromZero={true}
                chartConfig={{
                  backgroundGradientFrom:
                    "transparent",

                  backgroundGradientTo:
                    "transparent",

                  decimalPlaces: 0,

                  color: (
                    opacity = 1
                  ) =>
                    `rgba(255,255,255,${opacity})`,

                  labelColor: (
                    opacity = 1
                  ) =>
                    `rgba(255,255,255,0.35)`,

                  propsForDots: {
                    r: "5",

                    strokeWidth: "2",

                    stroke:
                      "rgba(255,255,255,0.9)",
                  },
                }}
                bezier
                style={{
                  borderRadius: 20,
                }}
              />

              <View
                style={{
                  paddingHorizontal: 28,

                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    color:
                      "rgba(255,255,255,0.68)",

                    fontSize: 17,

                    lineHeight: 30,

                    fontWeight: "300",
                  }}
                >
                  {
  focus.totalMinutes > 300
    ? "Your consistency is becoming a real strength."
    : focus.totalMinutes > 100
    ? "Momentum is building slowly and steadily."
    : "Every focused session is shaping your future."
}
                </Text>
              </View>
            </View>
          </BlurView>

          {/* FOCUS INTENSITY */}

          <BlurView
            intensity={45}
            tint="dark"
            style={{
              borderRadius: 34,

              overflow: "hidden",

              width: "100%",

              marginBottom: 28,
            }}
          >
            <View
              style={{
                padding: 28,

                backgroundColor:
                  "rgba(255,255,255,0.05)",
              }}
            >
              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.42)",

                  letterSpacing: 2,

                  marginBottom: 24,

                  fontSize: 13,
                }}
              >
                FOCUS INTENSITY
              </Text>

              {weeklyFocusData.map(
                (value, index) => (
                  <View
                    key={index}
                    style={{
                      marginBottom: 18,
                    }}
                  >
                    <View
                      style={{
                        flexDirection:
                          "row",

                        justifyContent:
                          "space-between",

                        marginBottom: 8,
                      }}
                    >
                      <Text
                        style={{
                          color:
                            "rgba(255,255,255,0.62)",
                        }}
                      >
                        {
  focus.weeklyData[index]
    ?.day || `Day ${index + 1}`
}
                      </Text>

                      <Text
                        style={{
                          color:
                            "rgba(255,255,255,0.40)",
                        }}
                      >
                        {value}%
                      </Text>
                    </View>

                    <View
                      style={{
                        height: 10,

                        backgroundColor:
                          "rgba(255,255,255,0.08)",

                        borderRadius: 30,

                        overflow: "hidden",
                      }}
                    >
                      <View
                        style={{
                          width: `${value}%`,

                          height: "100%",

                          backgroundColor:
                            "rgba(255,255,255,0.85)",

                          borderRadius: 30,
                        }}
                      />
                    </View>
                  </View>
                )
              )}
            </View>
          </BlurView>

          {/* FOOTER */}

          <Text
            style={{
              color:
                "rgba(255,255,255,0.30)",

              marginTop: 12,

              textAlign: "center",

              lineHeight: 28,

              fontSize: 15,
            }}
          >
            Let the noise fade.{"\n"}
            Just this moment matters.
          </Text>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}