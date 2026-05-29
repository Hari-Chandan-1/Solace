import { useState } from "react";
import {
  playButtonSound,
} from "../soundHelper";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";

import { BlurView } from "expo-blur";

import {
  useTaskState,
  addTask,
  deleteTask,
  toggleTask,
} from "../store";

export default function PlannerScreen() {
  const [taskName, setTaskName] = useState("");

  const [taskTime, setTaskTime] = useState("");

  const tasks = useTaskState();

  const completedTasks = tasks.filter(
    (task: any) => task.done
  ).length;

  async function handleAddTask() {
    if (!taskName || !taskTime) return;

    addTask({
      id: Date.now(),

      title: taskName,

      time: taskTime,

      done: false,
    });

    setTaskName("");

    setTaskTime("");
  }

  return (
    <ImageBackground
      source={require("../../assets/backgrounds/PlannerBackground.png")}
      resizeMode="cover"
      style={{
        flex: 1,
      }}
    >
      {/* DARK OVERLAY */}

      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.74)",
        }}
      >
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            paddingTop: 90,
            paddingHorizontal: 24,
            paddingBottom: 160,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* TITLE */}

          <Text
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 15,
              letterSpacing: 2,
              marginBottom: 10,
            }}
          >
            DAILY SYSTEM
          </Text>

          <Text
            style={{
              color: "white",
              fontSize: 56,
              fontWeight: "200",
              marginBottom: 10,
            }}
          >
            Planner
          </Text>

          <Text
            style={{
              color: "rgba(255,255,255,0.55)",
              lineHeight: 30,
              marginBottom: 36,
              fontSize: 16,
            }}
          >
            Design your day with calm focus and
            intention.
          </Text>

          {/* PROGRESS */}

          <BlurView
            intensity={50}
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
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: 2,
                  marginBottom: 20,
                  fontSize: 13,
                }}
              >
                TASK PROGRESS
              </Text>

              <Text
                style={{
                  color: "white",
                  fontSize: 42,
                  fontWeight: "200",
                  marginBottom: 16,
                }}
              >
                {completedTasks}/{tasks.length}
              </Text>

              {/* BAR */}

              <View
                style={{
                  height: 10,
                  borderRadius: 30,
                  backgroundColor:
                    "rgba(255,255,255,0.08)",

                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    width: `${
                      tasks.length > 0
                        ? (completedTasks /
                            tasks.length) *
                          100
                        : 0
                    }%`,

                    height: "100%",

                    backgroundColor:
                      "rgba(255,255,255,0.90)",

                    borderRadius: 30,
                  }}
                />
              </View>
            </View>
          </BlurView>

          {/* INPUT */}

          <BlurView
            intensity={55}
            tint="dark"
            style={{
              borderRadius: 34,
              overflow: "hidden",
              marginBottom: 34,
            }}
          >
            <View
              style={{
                padding: 26,
                backgroundColor:
                  "rgba(255,255,255,0.05)",
              }}
            >
              <Text
                style={{
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: 2,
                  marginBottom: 24,
                  fontSize: 13,
                }}
              >
                ADD NEW TASK
              </Text>

              {/* TASK NAME */}

              <TextInput
                placeholder="Task Name"
                placeholderTextColor="rgba(255,255,255,0.35)"
                value={taskName}
                onChangeText={setTaskName}
                style={{
                  backgroundColor:
                    "rgba(255,255,255,0.05)",

                  borderRadius: 22,

                  padding: 18,

                  color: "white",

                  marginBottom: 18,

                  fontSize: 16,
                }}
              />

              {/* TIME */}

              <TextInput
                placeholder="Time (Example: 8:00 PM)"
                placeholderTextColor="rgba(255,255,255,0.35)"
                value={taskTime}
                onChangeText={setTaskTime}
                style={{
                  backgroundColor:
                    "rgba(255,255,255,0.05)",

                  borderRadius: 22,

                  padding: 18,

                  color: "white",

                  marginBottom: 24,

                  fontSize: 16,
                }}
              />

              {/* BUTTON */}

              <TouchableOpacity
                onPress={async () => {
  await playButtonSound();

  handleAddTask();
}}
                activeOpacity={0.85}
                style={{
                  backgroundColor:
                    "rgba(255,255,255,0.12)",

                  paddingVertical: 18,

                  borderRadius: 24,

                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "300",
                  }}
                >
                  Add Task
                </Text>
              </TouchableOpacity>
            </View>
          </BlurView>

          {/* TASKS */}

          <Text
            style={{
              color: "rgba(255,255,255,0.45)",
              letterSpacing: 2,
              marginBottom: 20,
              fontSize: 13,
            }}
          >
            TODAY'S FLOW
          </Text>

          {tasks.length === 0 && (
            <View
              style={{
                alignItems: "center",
                marginTop: 40,
              }}
            >
              <Text
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 16,
                  lineHeight: 28,
                  textAlign: "center",
                }}
              >
                No tasks yet.{"\n"}
                Build your first intentional day.
              </Text>
            </View>
          )}

          {tasks.map((task: any, index: number) => (
            <BlurView
              key={index}
              intensity={40}
              tint="dark"
              style={{
                borderRadius: 30,
                overflow: "hidden",
                marginBottom: 18,
              }}
            >
              <View
                style={{
                  padding: 24,
                  backgroundColor:
                    "rgba(255,255,255,0.05)",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* TASK INFO */}

                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color:
                          "rgba(255,255,255,0.42)",

                        marginBottom: 6,

                        fontSize: 13,
                      }}
                    >
                      {task.time}
                    </Text>

                    <Text
                      style={{
                        color: task.done
                          ? "rgba(255,255,255,0.35)"
                          : "white",

                        fontSize: 22,

                        fontWeight: "300",

                        textDecorationLine:
                          task.done
                            ? "line-through"
                            : "none",
                      }}
                    >
                      {task.title}
                    </Text>
                  </View>

                  {/* ACTIONS */}

                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 20,
                    }}
                  >
                    {/* TICK */}

                    <TouchableOpacity
                      onPress={async () => {
                        await playButtonSound();
                        await toggleTask(task.id)
                      }}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 18,

                        backgroundColor:
                          task.done
                            ? "rgba(255,255,255,0.92)"
                            : "rgba(255,255,255,0.08)",

                        justifyContent: "center",
                        alignItems: "center",

                        marginRight: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: task.done
                            ? "black"
                            : "white",

                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        ✓
                      </Text>
                    </TouchableOpacity>

                    {/* DELETE */}

                    <TouchableOpacity
                      onPress={async () => {
                        await playButtonSound();
                        await deleteTask(task.id)
                      }}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 18,

                        backgroundColor:
                          "rgba(255,80,80,0.18)",

                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 18,
                        }}
                      >
                        ✕
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </BlurView>
          ))}

          {/* FOOTER */}

          <Text
            style={{
              color: "rgba(255,255,255,0.32)",
              textAlign: "center",
              marginTop: 40,
              lineHeight: 28,
              fontSize: 15,
            }}
          >
            Discipline becomes peaceful{"\n"}
            when your environment supports
            you.
          </Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}