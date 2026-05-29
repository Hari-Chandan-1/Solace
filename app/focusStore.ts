import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  useEffect,
  useState,
} from "react";

/* STORAGE */

const STORAGE_KEY =
  "STILLNESS_FOCUS";

/* GLOBAL STATE */

let focusData = {
  totalSessions: 0,

  totalMinutes: 0,

  todaySessions: 0,
  
  sessionStartDate: "",

  lastDate: "",

  weeklyData: [] as any[],
};

let listeners: any[] = [];

/* TODAY */

function getTodayDate() {
  return new Date()
    .toISOString()
    .split("T")[0];
}

/* NOTIFY */

function notify() {
  listeners.forEach((listener) =>
    listener({ ...focusData })
  );
}

/* LOAD */

async function loadFocus() {
  try {
    const saved =
      await AsyncStorage.getItem(
        STORAGE_KEY
      );

    if (saved) {
      const parsed =
        JSON.parse(saved);

      focusData = {
        ...focusData,
        ...parsed,
      };

      notify();
    }
  } catch (error) {
    console.log(
      "Error loading focus:",
      error
    );
  }
}

/* SAVE */

async function saveFocus() {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(focusData)
    );
  } catch (error) {
    console.log(
      "Error saving focus:",
      error
    );
  }
}

/* HOOK */

export function useFocusState() {
  const [state, setState] =
    useState({ ...focusData });

  useEffect(() => {
    listeners.push(setState);

    loadFocus();

    return () => {
      listeners = listeners.filter(
        (l) => l !== setState
      );
    };
  }, []);

  return state;
}

/* COMPLETE SESSION */
export async function setSessionStartDate() {
  focusData.sessionStartDate =
    getTodayDate();

  await saveFocus();

  notify();
}
export async function completeSession(
  minutes: number,
  completed: boolean
) {
  const today =
    focusData.sessionStartDate ||
    getTodayDate();

  /* RESET DAILY COUNT */

  if (focusData.lastDate !== today) {
    focusData.todaySessions = 0;
  }

  if (completed) {
    focusData.totalSessions += 1;

    focusData.todaySessions += 1;
  }

  focusData.totalMinutes +=
    minutes;

  focusData.lastDate = today;

  const dayName =
    new Date(today).toLocaleDateString(
      "en-US",
      {
        weekday: "short",
      }
    );

  const existingDay =
    focusData.weeklyData.find(
      (item: any) =>
        item.day === dayName
    );

  if (existingDay) {
    existingDay.minutes +=
      minutes;
  }

  else {
    focusData.weeklyData.push({
      day: dayName,

      minutes,
    });
  }

  await saveFocus();

  notify();
}