import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState } from "react";

import {
  useProfileState,
  updateProfile,
} from "../profileStore";

import { BlurView } from "expo-blur";

import { LinearGradient } from "expo-linear-gradient";

import { useStreakState } from "../streakStore";

import { useFocusState } from "../focusStore";

import { useTaskState } from "../store";
import { playButtonSound } from "../soundHelper";

export default function ProfileScreen() {
  const streak = useStreakState();

  const focus = useFocusState();

  const tasks = useTaskState();

  const profile =
    useProfileState();

  const completedTasks = tasks.filter(
    (task: any) => task.done
  ).length;

  /* EDIT MODE */

  const [editing, setEditing] =
    useState(false);

  const [name, setName] = useState(
    profile.name
  );

  const [identity, setIdentity] =
    useState(profile.identity);

  const [quote, setQuote] = useState(
    profile.quote
  );

  const [vision, setVision] =
    useState(
      (profile.vision || []).join("\n")
    );

  const [values, setValues] =
    useState(
      (profile.values || []).join("\n")
    );

  /* SYNC */

  useEffect(() => {
    setName(profile.name);

    setIdentity(profile.identity);

    setQuote(profile.quote);

    setVision(
      (profile.vision || []).join("\n")
    );

    setValues(
      (profile.values || []).join("\n")
    );
  }, [profile]);

  return (
    <>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={require("../../assets/backgrounds/ProfileBackground.jpg")}
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
              PERSONAL SPACE
            </Text>

            {/* NAME */}

            <Text
              style={{
                color: "white",

                fontSize: 56,

                fontWeight: "200",

                marginBottom: 14,
              }}
            >
              {profile.name}
            </Text>

            {/* MESSAGE */}

            <Text
              style={{
                color:
                  "rgba(255,255,255,0.58)",

                fontSize: 17,

                lineHeight: 30,

                marginBottom: 28,
              }}
            >
              {profile.identity}
            </Text>

            {/* LIFE VISION */}

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

                    marginBottom: 24,

                    fontSize: 13,
                  }}
                >
                  LIFE VISION
                </Text>

               {(profile.vision || []).map(
                  (
                    item,
                    index
                  ) => (
                    <View
                      key={index}
                      style={{
                        flexDirection:
                          "row",

                        alignItems:
                          "center",

                        marginBottom: 18,
                      }}
                    >
                      <View
                        style={{
                          width: 10,

                          height: 10,

                          borderRadius: 20,

                          backgroundColor:
                            "rgba(255,255,255,0.85)",

                          marginRight: 16,
                        }}
                      />

                      <Text
                        style={{
                          color: "white",

                          fontSize: 18,

                          fontWeight: "300",

                          flex: 1,

                          lineHeight: 28,
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                  )
                )}
              </View>
            </BlurView>

            {/* STATS */}

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

                    marginBottom: 24,

                    fontSize: 13,
                  }}
                >
                  PERSONAL STATS
                </Text>

                <View
                  style={{
                    flexDirection: "row",

                    justifyContent:
                      "space-between",
                  }}
                >
                  {/* STREAK */}

                  <View>
                    <Text
                      style={{
                        color: "white",

                        fontSize: 40,

                        fontWeight: "200",
                      }}
                    >
                      {streak.streak}
                    </Text>

                    <Text
                      style={{
                        color:
                          "rgba(255,255,255,0.42)",

                        marginTop: 6,
                      }}
                    >
                      Day Streak
                    </Text>
                  </View>

                  {/* FOCUS */}

                  <View>
                    <Text
                      style={{
                        color: "white",

                        fontSize: 40,

                        fontWeight: "200",
                      }}
                    >
                      {
                        focus.totalSessions
                      }
                    </Text>

                    <Text
                      style={{
                        color:
                          "rgba(255,255,255,0.42)",

                        marginTop: 6,
                      }}
                    >
                      Focus Sessions
                    </Text>
                  </View>

                  {/* TASKS */}

                  <View>
                    <Text
                      style={{
                        color: "white",

                        fontSize: 40,

                        fontWeight: "200",
                      }}
                    >
                      {completedTasks}
                    </Text>

                    <Text
                      style={{
                        color:
                          "rgba(255,255,255,0.42)",

                        marginTop: 6,
                      }}
                    >
                      Tasks Done
                    </Text>
                  </View>
                </View>
              </View>
            </BlurView>

            {/* VALUES */}

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

                    marginBottom: 24,

                    fontSize: 13,
                  }}
                >
                  CORE VALUES
                </Text>

                <Text
                  style={{
                    color: "white",

                    fontSize: 22,

                    lineHeight: 42,

                    fontWeight: "300",
                  }}
                >
                  {(profile.values || []).join("\n")}
                </Text>
              </View>
            </BlurView>

            {/* EDIT BUTTON */}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={async () => {
                await playButtonSound();
                if (editing) {
                  await updateProfile({
                    name,

                    identity,

                    quote,

                    vision: vision
                      .split("\n")
                      .filter(
                        (item) =>
                          item
                      ),

                    values: values
                      .split("\n")
                      .filter(
                        (item) =>
                          item
                      ),
                  });
                }

                setEditing(!editing);
              }}
              style={{
                backgroundColor:
                  "rgba(255,255,255,0.08)",

                alignSelf: "flex-start",

                paddingHorizontal: 20,

                paddingVertical: 12,

                borderRadius: 20,

                marginBottom: 28,
              }}
            >
              <Text
                style={{
                  color: "white",

                  fontSize: 15,
                }}
              >
                {editing
                  ? "Save"
                  : "Edit"}
              </Text>
            </TouchableOpacity>

            {/* EDIT CARD */}

            {editing && (
              <BlurView
                intensity={40}
                tint="dark"
                style={{
                  borderRadius: 30,

                  overflow: "hidden",

                  marginBottom: 28,
                }}
              >
                <View
                  style={{
                    padding: 24,

                    backgroundColor:
                      "rgba(255,255,255,0.05)",
                  }}
                >
                  {/* NAME */}

                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Name"
                    placeholderTextColor="rgba(255,255,255,0.35)"
                    style={{
                      color: "white",

                      fontSize: 18,

                      marginBottom: 20,

                      borderBottomWidth: 1,

                      borderBottomColor:
                        "rgba(255,255,255,0.08)",

                      paddingBottom: 12,
                    }}
                  />

                  {/* IDENTITY */}

                  <TextInput
                    value={identity}
                    onChangeText={
                      setIdentity
                    }
                    placeholder="Identity"
                    placeholderTextColor="rgba(255,255,255,0.35)"
                    multiline
                    style={{
                      color: "white",

                      fontSize: 17,

                      lineHeight: 30,

                      marginBottom: 20,

                      borderBottomWidth: 1,

                      borderBottomColor:
                        "rgba(255,255,255,0.08)",

                      paddingBottom: 12,
                    }}
                  />

                  {/* QUOTE */}

                  <TextInput
                    value={quote}
                    onChangeText={setQuote}
                    placeholder="Quote"
                    placeholderTextColor="rgba(255,255,255,0.35)"
                    multiline
                    style={{
                      color: "white",

                      fontSize: 17,

                      lineHeight: 30,

                      marginBottom: 24,
                    }}
                  />

                  {/* LIFE VISION */}

                  <TextInput
                    value={vision}
                    onChangeText={setVision}
                    placeholder="Life Vision"
                    placeholderTextColor="rgba(255,255,255,0.35)"
                    multiline
                    style={{
                      color: "white",

                      fontSize: 17,

                      lineHeight: 30,

                      marginBottom: 24,

                      borderTopWidth: 1,

                      borderTopColor:
                        "rgba(255,255,255,0.08)",

                      paddingTop: 20,
                    }}
                  />

                  {/* VALUES */}

                  <TextInput
                    value={values}
                    onChangeText={setValues}
                    placeholder="Core Values"
                    placeholderTextColor="rgba(255,255,255,0.35)"
                    multiline
                    style={{
                      color: "white",

                      fontSize: 17,

                      lineHeight: 30,
                    }}
                  />
                </View>
              </BlurView>
            )}

            {/* QUOTE */}

            <BlurView
              intensity={40}
              tint="dark"
              style={{
                borderRadius: 36,

                overflow: "hidden",
              }}
            >
              <View
                style={{
                  padding: 32,

                  backgroundColor:
                    "rgba(255,255,255,0.05)",
                }}
              >
                <Text
                  style={{
                    color:
                      "rgba(255,255,255,0.72)",

                    fontSize: 22,

                    lineHeight: 42,

                    fontWeight: "300",
                  }}
                >
                  "{profile.quote}"
                </Text>
              </View>
            </BlurView>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </>
  );
}