import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  useEffect,
  useState,
} from "react";

const STORAGE_KEY =
  "STILLNESS_MISSIONS";

let missionData = [
  {
    text:
      "Complete GATE Signals revision",

    completed: false,

    createdDate:
      new Date()
        .toISOString()
        .split("T")[0],
  },

  {
    text:
      "1 distraction-free focus session",

    completed: false,

    createdDate:
      new Date()
        .toISOString()
        .split("T")[0],
  },

  {
    text:
      "Workout + mental reset",

    completed: false,

    createdDate:
      new Date()
        .toISOString()
        .split("T")[0],
  },
];

let listeners: any[] = [];

function getTodayDate() {
  return new Date()
    .toISOString()
    .split("T")[0];
}
function notify() {
  listeners.forEach((listener) =>
    listener([...missionData])
  );
}

async function loadMissions() {
  try {
    const saved =
      await AsyncStorage.getItem(
        STORAGE_KEY
      );

    if (saved) {
  missionData = JSON.parse(saved);

  const today =
    getTodayDate();

  missionData =
    missionData.filter(
      (task: any) => {
        if (
          task.completed &&
          task.createdDate !==
            today
        ) {
          return false;
        }

        return true;
      }
    );

  await saveMissions();

  notify();
}
  } catch (error) {
    console.log(error);
  }
}

async function saveMissions() {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(missionData)
    );
  } catch (error) {
    console.log(error);
  }
}

export function useMissionState() {
  const [state, setState] =
    useState([...missionData]);

  useEffect(() => {
    listeners.push(setState);

    loadMissions();

    return () => {
      listeners = listeners.filter(
        (l) => l !== setState
      );
    };
  }, []);

  return state;
}

export async function updateMission(
  index: number,
  value: string
) {
  missionData[index].text =
  value;

  await saveMissions();

  notify();
}
export async function addMission() {
  missionData.push({
  text: "",

  completed: false,

  createdDate:
    getTodayDate(),
});

  await saveMissions();

  notify();
}
export async function removeMission(
  index: number
) {
  missionData.splice(index, 1);

  await saveMissions();

  notify();
}
export async function toggleMissionComplete(
  index: number
) {
  missionData[index].completed =
    !missionData[index]
      .completed;

  await saveMissions();

  notify();
}