import {
  useState,
  useEffect,
} from "react";
import { useStreakState } from "../streakStore";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { BlurView } from "expo-blur";

import { LinearGradient } from "expo-linear-gradient";

import {
  useTaskState,
  toggleTask,
} from "../store";

import {
  useMissionState,
  updateMission,
  addMission,
  removeMission,
  toggleMissionComplete,
} from "../missionStore";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { playButtonSound } from "../soundHelper";

const moods = [
  "😌",
  "🌿",
  "🌙",
  "🙂",
  "⚡",
];

const energies = [
  "🌊",
  "⚡",
  "☀️",
  "🌙",
];

const MOOD_KEY =
  "STILLNESS_MOOD";

const ENERGY_KEY =
  "STILLNESS_ENERGY";

/* GATE COUNTDOWN */

const gateDate = new Date("2027-02-01");

const today = new Date();

const diffTime =
  gateDate.getTime() - today.getTime();

const daysLeft = Math.ceil(
  diffTime / (1000 * 60 * 60 * 24)
);

export default function HomeScreen() {
  const tasks = useTaskState();
  const missionTasks =
  useMissionState();
  const todayDate =
  new Date()
    .toISOString()
    .split("T")[0];
const unfinishedTasks =
  tasks.filter(
    (task: any) =>
      task.createdDate !==
        todayDate &&
      !task.done
  );

const todayTasks =
  tasks.filter(
    (task: any) =>
      task.createdDate ===
      todayDate
  );

const [
  isEditingMission,
  setIsEditingMission,
] = useState(false);

  const [
  selectedMood,
  setSelectedMood,
] = useState("");

  const [
  selectedEnergy,
  setSelectedEnergy,
] = useState("");

  const completedTasks = tasks.filter(
    (task: any) => task.done
  ).length;
  const streak = useStreakState();
  const progress = tasks.length > 0
  ? Math.floor(
        (completedTasks / tasks.length) * 100
      )
    : 0;
    /* LOAD SAVED INNER STATE */

useEffect(() => {
  loadInnerState();
}, []);

async function loadInnerState() {
  try {
    const savedMood =
      await AsyncStorage.getItem(
        MOOD_KEY
      );

    const savedEnergy =
      await AsyncStorage.getItem(
        ENERGY_KEY
      );

    if (savedMood) {
      setSelectedMood(savedMood);
    }

    else {
      setSelectedMood("🌿");
    }

    if (savedEnergy) {
      setSelectedEnergy(
        savedEnergy
      );
    }

    else {
      setSelectedEnergy("🌊");
    }
  } catch (error) {
    console.log(error);
  }
}

async function handleMoodSelect(
  mood: string
) {
  try {
    setSelectedMood(mood);

    await AsyncStorage.setItem(
      MOOD_KEY,
      mood
    );
  } catch (error) {
    console.log(error);
  }
}

async function handleEnergySelect(
  energy: string
) {
  try {
    setSelectedEnergy(
      energy
    );

    await AsyncStorage.setItem(
      ENERGY_KEY,
      energy
    );
  } catch (error) {
    console.log(error);
  }
}
    /* TIME */

const currentHour =
  new Date().getHours();

/* DYNAMIC GREETING */

let greeting = "GOOD EVENING";

if (currentHour < 12) {
  greeting = "GOOD MORNING";
}

else if (currentHour < 18) {
  greeting = "GOOD AFTERNOON";
}

/* DYNAMIC MESSAGE */

let dynamicMessage =
  "Build your future gently, peacefully and consistently.";

if (progress >= 80) {
  dynamicMessage =
    "Momentum is building beautifully.";
}

else if (progress >= 50) {
  dynamicMessage =
    "You're moving forward steadily.";
}

else if (progress > 0) {
  dynamicMessage =
    "One calm step at a time.";
}

else {
  dynamicMessage =
    "Start small. Protect your momentum.";
}

  return (
    <>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={require("../../assets/backgrounds/waterfall.jpg")}
        resizeMode="cover"
        style={{
          flex: 1,
        }}
      >
        <LinearGradient
          colors={[
            "rgba(0,0,0,0.20)",
            "rgba(0,0,0,0.88)",
          ]}
          style={{
            flex: 1,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 90,
              paddingHorizontal: 24,
              paddingBottom: 180,
            }}
          >
            {/* GREETING */}

            <Text
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: 15,
                letterSpacing: 2,
                marginBottom: 10,
              }}
            >
              {greeting}
            </Text>

            {/* TITLE */}

            <Text
              style={{
                color: "white",
                fontSize: 60,
                fontWeight: "200",
                letterSpacing: 1,
                marginBottom: 10,
              }}
            >
              Stillness
            </Text>

            <Text
              style={{
                color: "rgba(255,255,255,0.58)",
                fontSize: 17,
                lineHeight: 30,
                marginBottom: 40,
              }}
            >
              {dynamicMessage}
            </Text>
            
            {/* WEEKLY INTENTIONS*/}

            <BlurView
              intensity={55}
              tint="dark"
              style={{
                borderRadius: 36,
                overflow: "hidden",
                marginBottom: 10,
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

                    marginBottom: 22,

                    fontSize: 13,
                  }}
                >
                  WEEKLY INTENTIONS
                </Text>

                {missionTasks.map(
                  (task, index) => (
                    <TouchableOpacity
  activeOpacity={0.82}
  onPress={ async () =>{
    await playButtonSound();
    toggleMissionComplete(index)
  }}
  style={{
    flexDirection: "row",

    alignItems: "center",

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

                      <View
  style={{
    flex: 1,
  }}
>
  
  <TextInput
    multiline
scrollEnabled={false}
    editable={isEditingMission}
    value={task.text}
    onChangeText={(text) =>
      updateMission(index, text)
    }
    style={{
      color: "white",

      fontSize: 18,

      fontWeight: "300",

      flex: 1,

      lineHeight: 28,
      
      flexWrap: "wrap",
      textDecorationLine:
  task.completed
    ? "line-through"
    : "none",

opacity:
  task.completed
    ? 0.45
    : 1,
    }}
  />

  {isEditingMission && (
    <TouchableOpacity
      onPress={async () => {
        await playButtonSound();
        removeMission(index)
      }}
      style={{
        marginTop: 8,
      }}
    >
      <Text
        style={{
          color:
            "rgba(255,120,120,0.9)",

          fontSize: 14,
        }}
      >
        Remove
      </Text>
    </TouchableOpacity>
  )}
</View>
                    </TouchableOpacity>
                  )
                )}
                {/* EDIT BUTTONS */}

<View
  style={{
    flexDirection: "row",

    justifyContent:
      "space-between",

    marginTop: 10,

    marginBottom: 12,
  }}
>
  <TouchableOpacity
    onPress={ async () => {
      await playButtonSound();
      setIsEditingMission(
        !isEditingMission
      )
    }}
  >
    <Text
      style={{
        color:
          "rgba(255,255,255,0.72)",

        fontSize: 15,
      }}
    >
      {isEditingMission
        ? "Done"
        : "Edit"}
    </Text>
  </TouchableOpacity>

  {isEditingMission && (
    <TouchableOpacity
      onPress={async () => {
  await playButtonSound();

  addMission();
}}
    >
      <Text
        style={{
          color:
            "rgba(255,255,255,0.72)",

          fontSize: 15,
        }}
      >
        + Add Mission
      </Text>
    </TouchableOpacity>
  )}
</View>
                {/* MESSAGE */}

                <View
                  style={{
                    marginTop: 12,

                    paddingTop: 22,

                    borderTopWidth: 1,

                    borderTopColor:
                      "rgba(255,255,255,0.08)",
                  }}
                >
                  <Text
                    style={{
                      color:
                        "rgba(255,255,255,0.38)",

                      lineHeight: 28,

                      fontSize: 15,
                    }}
                  >
                    Before opening Instagram,
                    complete one meaningful
                    thing.
                  </Text>
                </View>
              </View>
            </BlurView>

            {/* GATE COUNTDOWN */}

            <BlurView
              intensity={45}
              tint="dark"
              style={{
                borderRadius: 34,
                overflow: "hidden",
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
                      "rgba(255,255,255,0.45)",

                    letterSpacing: 2,

                    marginBottom: 18,

                    fontSize: 13,
                  }}
                >
                  GATE 2027
                </Text>

                <Text
                  style={{
                    color: "white",

                    fontSize: 52,

                    fontWeight: "200",

                    marginBottom: 10,
                  }}
                >
                  {daysLeft}
                </Text>

                <Text
                  style={{
                    color:
                      "rgba(255,255,255,0.48)",

                    fontSize: 16,
                  }}
                >
                  days remaining
                </Text>
              </View>
            </BlurView>

            {/* DAILY PROGRESS */}

            <BlurView
              intensity={45}
              tint="dark"
              style={{
                borderRadius: 34,
                overflow: "hidden",
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
                      "rgba(255,255,255,0.5)",

                    letterSpacing: 2,

                    marginBottom: 20,

                    fontSize: 13,
                  }}
                >
                  DAILY PROGRESS
                </Text>

                <Text
                  style={{
                    color: "white",

                    fontSize: 46,

                    fontWeight: "200",

                    marginBottom: 18,
                  }}
                >
                  {progress}%
                </Text>

                {/* BAR */}

                <View
                  style={{
                    height: 10,

                    backgroundColor:
                      "rgba(255,255,255,0.08)",

                    borderRadius: 30,

                    overflow: "hidden",

                    marginBottom: 16,
                  }}
                >
                  <View
                    style={{
                      width: `${progress}%`,

                      height: "100%",

                      backgroundColor:
                        "rgba(255,255,255,0.85)",

                      borderRadius: 30,
                    }}
                  />
                </View>

                <Text
                  style={{
                    color:
                      "rgba(255,255,255,0.45)",

                    lineHeight: 24,
                  }}
                >
                  {completedTasks} of{" "}
                  {tasks.length} tasks
                  completed today.
                </Text>
              </View>
            </BlurView>

            {/* INNER STATE */}

            <BlurView
              intensity={45}
              tint="dark"
              style={{
                borderRadius: 36,
                overflow: "hidden",
                marginBottom: 30,
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
                      "rgba(255,255,255,0.5)",

                    letterSpacing: 2,

                    marginBottom: 28,

                    fontSize: 13,
                  }}
                >
                  INNER STATE
                </Text>

                {/* MOOD + ENERGY */}

                <View
                  style={{
                    flexDirection: "row",

                    justifyContent:
                      "space-between",

                    marginBottom: 28,
                  }}
                >
                  {/* MOOD */}

                  <View
                    style={{
                      width: "48%",

                      borderRadius: 30,

                      backgroundColor:
                        "rgba(255,255,255,0.06)",

                      paddingVertical: 28,

                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 36,

                        marginBottom: 14,
                      }}
                    >
                      {selectedMood}
                    </Text>

                    <Text
                      style={{
                        color: "white",

                        fontSize: 18,

                        fontWeight: "300",

                        marginBottom: 6,
                      }}
                    >
                      Mood
                    </Text>

                    <Text
                      style={{
                        color:
                          "rgba(255,255,255,0.55)",

                        fontSize: 14,
                      }}
                    >
                      Peaceful
                    </Text>
                  </View>

                  {/* ENERGY */}

                  <View
                    style={{
                      width: "48%",

                      borderRadius: 30,

                      backgroundColor:
                        "rgba(255,255,255,0.06)",

                      paddingVertical: 28,

                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 36,

                        marginBottom: 14,
                      }}
                    >
                      {selectedEnergy}
                    </Text>

                    <Text
                      style={{
                        color: "white",

                        fontSize: 18,

                        fontWeight: "300",

                        marginBottom: 6,
                      }}
                    >
                      Energy
                    </Text>

                    <Text
                      style={{
                        color:
                          "rgba(255,255,255,0.55)",

                        fontSize: 14,
                      }}
                    >
                      Balanced
                    </Text>
                  </View>
                </View>

                {/* MOOD SELECTOR */}

                <View
                  style={{
                    flexDirection: "row",

                    justifyContent: "center",

                    marginBottom: 18,
                  }}
                >
                  {moods.map((mood, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={async () => {
                        await playButtonSound();
                        handleMoodSelect(mood)

                      }}
                      style={{
                        width: 56,

                        height: 56,

                        borderRadius: 20,

                        justifyContent:
                          "center",

                        alignItems: "center",

                        backgroundColor:
                          selectedMood === mood
                            ? "rgba(255,255,255,0.18)"
                            : "rgba(255,255,255,0.05)",

                        marginHorizontal: 6,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 26,
                        }}
                      >
                        {mood}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* ENERGY SELECTOR */}

                <View
                  style={{
                    flexDirection: "row",

                    justifyContent: "center",
                  }}
                >
                  {energies.map(
                    (energy, index) => (
                      <TouchableOpacity
                        key={index}
                      onPress={async () => {
                        await playButtonSound();
  handleEnergySelect(
    energy
  )
}}
                        style={{
                          width: 56,

                          height: 56,

                          borderRadius: 20,

                          justifyContent:
                            "center",

                          alignItems: "center",

                          backgroundColor:
                            selectedEnergy ===
                            energy
                              ? "rgba(255,255,255,0.18)"
                              : "rgba(255,255,255,0.05)",

                          marginHorizontal: 6,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 26,
                          }}
                        >
                          {energy}
                        </Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              </View>
            </BlurView>
{/* UNFINISHED THREADS */}

{unfinishedTasks.length >
  0 && (
  <BlurView
    intensity={55}
    tint="dark"
    style={{
      borderRadius: 36,

      overflow: "hidden",

      marginBottom: 22,
    }}
  >
    <View
      style={{
        padding: 30,

        backgroundColor:
          "rgba(255,140,100,0.06)",
      }}
    >
      <Text
        style={{
          color:
            "rgba(255,190,150,0.75)",

          letterSpacing: 2,

          marginBottom: 24,

          fontSize: 13,
        }}
      >
        UNFINISHED THREADS
      </Text>

      {unfinishedTasks.map(
        (
          task: any,
          index: number
        ) => (
          <TouchableOpacity
  key={index}
  activeOpacity={0.82}
  onPress={async () => {
    await playButtonSound();
    toggleTask(task.id)
  }}
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
                  "rgba(255,180,120,0.85)",

                marginRight: 16,
              }}
            />

            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.88)",

                  fontSize: 18,

                  fontWeight: "300",

                  lineHeight: 28,
                }}
              >
                {task.title}
              </Text>

              <Text
                style={{
                  color:
                    "rgba(255,190,150,0.55)",

                  marginTop: 4,

                  fontSize: 12,
                }}
              >
                from{" "}
                {task.createdDate}
              </Text>
            </View>
          </TouchableOpacity>
        )
      )}
    </View>
  </BlurView>
)}

            {/* TODAY TASKS */}

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
                    "rgba(255,255,255,0.04)",
                }}
              >
<Text
  style={{
    color:
      "rgba(255,255,255,0.5)",

    letterSpacing: 2,

    marginBottom: 10,

    fontSize: 13,
  }}
>
  TODAY
</Text>

<Text
  style={{
    color:
      "rgba(255,255,255,0.38)",

    marginBottom: 28,

    lineHeight: 28,

    fontSize: 15,
  }}
>
  Small disciplined actions
  create calm momentum.
</Text>

                {todayTasks.map(
                  (
                    task: any,
                    index: number
                  ) => (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.72}
                      onPress={async () => {
                        await playButtonSound();
                        await toggleTask(task.id)
                      }}
                     style={{
  flexDirection: "row",

  alignItems: "center",

  marginBottom: 24,

  padding: 18,

  borderRadius: 28,

  backgroundColor: task.done
    ? "rgba(255,255,255,0.08)"
    : "rgba(255,255,255,0.04)",

  borderWidth: 1,

  borderColor: task.done
    ? "rgba(255,255,255,0.14)"
    : "rgba(255,255,255,0.04)",
}}
                    >
                      {/* TICK */}

                      <View
                        style={{
  width: 32,

  height: 32,

  borderRadius: 30,

  borderWidth: 1.5,

  borderColor:
    task.done
      ? "rgba(255,255,255,1)"
      : "rgba(255,255,255,0.18)",

  backgroundColor:
    task.done
      ? "rgba(255,255,255,0.95)"
      : "rgba(255,255,255,0.03)",

  marginRight: 18,

  justifyContent: "center",

  alignItems: "center",

  shadowColor: "#fff",

  shadowOpacity:
    task.done ? 0.35 : 0,

  shadowRadius: 10,

  shadowOffset: {
    width: 0,
    height: 0,
  },
}}
                      >
                        {task.done && (
                          <Text
                            style={{
                              color:
                                "black",

                              fontSize: 16,

                              fontWeight:
                                "bold",
                            }}
                          >
                            ✓
                          </Text>
                        )}
                      </View>

                      {/* TASK INFO */}

                      <View>
                        <Text
                          style={{
                            color:
                              "rgba(255,255,255,0.4)",

                            marginBottom: 4,

                            fontSize: 13,
                          }}
                        >
                          {task.time}
                        </Text>

                        <Text
                          style={{
                            color: task.done
                              ? "rgba(255,255,255,0.38)"
                              : "white",

                            fontSize: 20,

                            fontWeight:
                              "300",

                            textDecorationLine:
                              task.done
                                ? "line-through"
                                : "none",
                          }}
                        >
                          {task.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </BlurView>

            {/* CONSISTENCY */}

            <BlurView
              intensity={40}
              tint="dark"
              style={{
                borderRadius: 34,
                overflow: "hidden",
                marginTop: 30,
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
                      "rgba(255,255,255,0.45)",

                    letterSpacing: 2,

                    marginBottom: 18,

                    fontSize: 13,
                  }}
                >
                  CONSISTENCY
                </Text>

                <Text
                  style={{
                    color: "white",

                    fontSize: 46,

                    fontWeight: "200",

                    marginBottom: 8,
                  }}
                >
                 {streak.streak} Days
                </Text>

                <Text
                  style={{
                    color:
                      "rgba(255,255,255,0.42)",

                    lineHeight: 30,
                  }}
                >
                  Momentum matters more
                  than intensity.
                </Text>
              </View>
            </BlurView>

            {/* FOOTER */}

            <Text
              style={{
                color: "rgba(255,255,255,0.35)",

                textAlign: "center",

                marginTop: 42,

                lineHeight: 28,

                fontSize: 15,
              }}
            >
              Small calm steps every
              day{"\n"}
              become an extraordinary
              life.
            </Text>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </>
  );
}