import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  useEffect,
  useState,
} from "react";

/* STORAGE KEY */

const STORAGE_KEY =
  "STILLNESS_STREAK";

/* GLOBAL STATE */

let streakData = {
  streak: 0,

  lastCompletedDate: "",
};

let listeners: any[] = [];

/* TODAY */

function getTodayDate() {
  return new Date()
    .toISOString()
    .split("T")[0];
}

/* YESTERDAY */

function getYesterdayDate() {
  const yesterday = new Date();

  yesterday.setDate(
    yesterday.getDate() - 1
  );

  return yesterday
    .toISOString()
    .split("T")[0];
}

/* NOTIFY */

function notify() {
  listeners.forEach((listener) =>
    listener({ ...streakData })
  );
}

/* LOAD */

async function loadStreak() {
  try {
    const saved =
      await AsyncStorage.getItem(
        STORAGE_KEY
      );

    if (saved) {
      streakData = JSON.parse(saved);

      notify();
    }
  } catch (error) {
    console.log(
      "Error loading streak:",
      error
    );
  }
}

/* SAVE */

async function saveStreak() {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(streakData)
    );
  } catch (error) {
    console.log(
      "Error saving streak:",
      error
    );
  }
}

/* HOOK */

export function useStreakState() {
  const [state, setState] =
    useState({ ...streakData });

  useEffect(() => {
    listeners.push(setState);

    loadStreak();

    return () => {
      listeners = listeners.filter(
        (l) => l !== setState
      );
    };
  }, []);

  return state;
}

/* COMPLETE DAY */

export async function completeDay() {
  const today = getTodayDate();

  const yesterday =
    getYesterdayDate();

  /* ALREADY COMPLETED */

  if (
    streakData.lastCompletedDate ===
    today
  ) {
    return;
  }

  /* CONTINUE STREAK */

  if (
    streakData.lastCompletedDate ===
    yesterday
  ) {
    streakData.streak += 1;
  }

  /* FIRST DAY / RESET */

  else {
    streakData.streak = 1;
  }

  streakData.lastCompletedDate =
    today;

  await saveStreak();

  notify();
}