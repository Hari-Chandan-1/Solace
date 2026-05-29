import { useState } from "react";
import {
  cancelJournalNotifications,
} from "../notificationHelper";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { BlurView } from "expo-blur";

import {
  saveEntry,
  useJournalState,
  getTodayEntry,
} from "../journalStore";

import {
  saveDayData,
} from "../calendarStore";
import { playButtonSound } from "../soundHelper";
/* QUESTIONS */

/* QUESTION POOL */

const questionPool = [
  "What made today feel meaningful?",

  "What distracted you the most today?",

  "What deserves appreciation today?",

  "What should tomorrow protect?",

  "What are you trying to become?",

  "What emotion stayed with you today?",

  "Where did your energy go today?",

  "What felt peaceful today?",

  "What deserves less attention tomorrow?",

  "What are you avoiding emotionally?",

  "What moment felt truly alive today?",

  "What strengthened your mind today?",

  "What weakened your focus today?",

  "What are you grateful for tonight?",

  "What kind of life are you building?",
];
/* DAILY QUESTIONS */

function getDailyQuestions() {
  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  let seed = 0;

  for (let i = 0; i < today.length; i++) {
    seed += today.charCodeAt(i);
  }

  const selected = [];

  for (let i = 0; i < 5; i++) {
    const index =
      (seed + i * 3) %
      questionPool.length;

    selected.push(
      questionPool[index]
    );
  }

  return selected;
}

export default function JournalScreen() {
  const journal = useJournalState();

  const todayEntry = getTodayEntry();

  const questions =
  todayEntry?.questions ||
  getDailyQuestions();

  const hour = new Date().getHours();

  const minute =
    new Date().getMinutes();

  const isJournalTime =
    hour > 21 ||
    (hour === 21 && minute >= 45);

  const [answers, setAnswers] =
    useState<any>(
      todayEntry?.answers || {}
    );

  const [submitted, setSubmitted] =
    useState(false);

  async function handleSubmit() {
    await saveEntry(
  questions,
  answers
);

    setSubmitted(true);
    await cancelJournalNotifications();
    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    /* SAVE TO CALENDAR */

    await saveDayData(today, {
      journal: questions
  .map(
    (
      question: string,
      index: number
    ) =>
      `${question}\n\n${answers[index] || ""}`
  )
  .join("\n\n\n"),

      mood:
        answers[0]?.length > 40
          ? "Reflective"
          : "Quiet",

      progress: 100,
    });
  }

  /* LOCKED STATE */

  if (!isJournalTime && !todayEntry) {
    return (
      <ImageBackground
        source={require("../../assets/backgrounds/JournallingBackground.jpg")}
        resizeMode="cover"
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,

            backgroundColor:
              "rgba(0,0,0,0.78)",

            justifyContent: "center",

            alignItems: "center",

            padding: 30,
          }}
        >
          <BlurView
            intensity={55}
            tint="dark"
            style={{
              borderRadius: 34,

              overflow: "hidden",

              width: "100%",
            }}
          >
            <View
              style={{
                padding: 34,

                backgroundColor:
                  "rgba(255,255,255,0.05)",
              }}
            >
              <Text
                style={{
                  color: "white",

                  fontSize: 38,

                  fontWeight: "200",

                  marginBottom: 20,

                  textAlign: "center",
                }}
              >
                Night Reflection
              </Text>

              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.48)",

                  textAlign: "center",

                  lineHeight: 32,

                  fontSize: 16,
                }}
              >
                Your nightly reflection
opens quietly at 9:45 PM.
              </Text>

              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.30)",

                  textAlign: "center",

                  lineHeight: 28,

                  fontSize: 14,

                  marginTop: 28,
                }}
              >
                Slow down for tonight.
{"\n"}
Nothing needs to rush now.
              </Text>
            </View>
          </BlurView>
        </View>
      </ImageBackground>
    );
  }

  /* SUCCESS SCREEN */

  if (submitted) {
    return (
      <ImageBackground
        source={require("../../assets/backgrounds/JournallingBackground.jpg")}
        resizeMode="cover"
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,

            backgroundColor:
              "rgba(0,0,0,0.84)",

            justifyContent: "center",

            alignItems: "center",

            padding: 28,
          }}
        >
          <BlurView
            intensity={55}
            tint="dark"
            style={{
              borderRadius: 36,

              overflow: "hidden",

              width: "100%",
            }}
          >
            <View
              style={{
                padding: 36,

                backgroundColor:
                  "rgba(255,255,255,0.05)",
              }}
            >
              <Text
                style={{
                  color: "white",

                  fontSize: 40,

                  fontWeight: "200",

                  textAlign: "center",

                  marginBottom: 22,
                }}
              >
                Reflection Complete
              </Text>

              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.58)",

                  textAlign: "center",

                  lineHeight: 34,

                  fontSize: 17,
                }}
              >
                The day has been held gently.
{"\n\n"}
Your thoughts are safe here.
{"\n\n"}
Rest peacefully tonight.
              </Text>
            </View>
          </BlurView>
        </View>
      </ImageBackground>
    );
  }

  /* MAIN SCREEN */

  return (
    <ImageBackground
      source={require("../../assets/backgrounds/JournallingBackground.jpg")}
      resizeMode="cover"
      style={{
        flex: 1,
      }}
    >
      {/* OVERLAY */}

      <View
        style={{
          flex: 1,

          backgroundColor:
            "rgba(0,0,0,0.82)",
        }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingTop: 90,

            paddingHorizontal: 24,

            paddingBottom: 180,
          }}
          showsVerticalScrollIndicator={
            false
          }
        >
          {/* TITLE */}

          <Text
            style={{
              color:
                "rgba(255,255,255,0.42)",

              letterSpacing: 2,

              marginBottom: 10,

              fontSize: 14,
            }}
          >
            NIGHT REFLECTION
          </Text>

          <Text
            style={{
              color: "white",

              fontSize: 56,

              fontWeight: "200",

              marginBottom: 14,
            }}
          >
            Journal
          </Text>

          <Text
            style={{
              color:
                "rgba(255,255,255,0.55)",

              lineHeight: 32,

              marginBottom: 42,

              fontSize: 16,
            }}
          >
            Let's close the day
            peacefully and honestly.
          </Text>

          {/* QUESTIONS */}

          {questions.map(
            (question: string, index: number) => (
              <BlurView
                key={index}
                intensity={50}
                tint="dark"
                style={{
                  borderRadius: 36,

                  overflow: "hidden",

                  marginBottom: 24,
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
                      color: "white",

                      fontSize: 21,

                      fontWeight: "300",

                      lineHeight: 34,

                      marginBottom: 20,
                    }}
                  >
                    {question}
                  </Text>

                  <TextInput
                    multiline
                    value={
                      answers[index] || ""
                    }
                    onChangeText={(text) =>
                      setAnswers({
                        ...answers,

                        [index]: text,
                      })
                    }
                    placeholder="Write honestly..."
                    placeholderTextColor="rgba(255,255,255,0.25)"
                    style={{
                      minHeight: 140,

                      color: "white",

                      fontSize: 16,

                      lineHeight: 30,

                      textAlignVertical:
                        "top",

                      backgroundColor:
                        "rgba(255,255,255,0.04)",

                      borderRadius: 24,

                      padding: 20,
                    }}
                  />
                </View>
              </BlurView>
            )
          )}
          <Text
  style={{
    color:
      "rgba(255,255,255,0.28)",

    textAlign: "center",

    marginBottom: 28,

    fontSize: 14,

    letterSpacing: 1,
  }}
>
  {Object.keys(answers)
    .filter(
      (key) =>
        answers[key]?.trim()
    ).length}
  / 5 reflections answered
</Text>
          {/* BUTTON */}

          <TouchableOpacity
            onPress={async () => {
  await playButtonSound();

  handleSubmit();
}}
            activeOpacity={0.85}
            style={{
              backgroundColor:
                "rgba(255,255,255,0.14)",

              paddingVertical: 22,

              borderRadius: 30,

              alignItems: "center",

              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: "white",

                fontSize: 18,

                fontWeight: "300",
              }}
            >
              Finish Reflection
            </Text>
          </TouchableOpacity>

          {/* FOOTER */}

          <Text
            style={{
              color:
                "rgba(255,255,255,0.32)",

              textAlign: "center",

              lineHeight: 30,

              marginTop: 46,

              fontSize: 15,
            }}
          >
            Awareness creates calm.
            {"\n"}
            Calm creates clarity.
          </Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}