import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  useEffect,
  useState,
} from "react";

const STORAGE_KEY =
  "STILLNESS_CALENDAR";

let calendarData: any = {};

let listeners: any[] = [];

function notify() {
  listeners.forEach((listener) =>
    listener({ ...calendarData })
  );
}

async function loadCalendar() {
  try {
    const saved =
      await AsyncStorage.getItem(
        STORAGE_KEY
      );

    if (saved) {
      calendarData = JSON.parse(saved);

      notify();
    }
  } catch (error) {
    console.log(error);
  }
}

async function saveCalendar() {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(calendarData)
    );
  } catch (error) {
    console.log(error);
  }
}

export function useCalendarState() {
  const [state, setState] =
    useState({ ...calendarData });

  useEffect(() => {
    listeners.push(setState);

    loadCalendar();

    return () => {
      listeners = listeners.filter(
        (l) => l !== setState
      );
    };
  }, []);

  return state;
}

export async function saveDayData(
  date: string,
  data: any
) {
  calendarData[date] = {
    ...(calendarData[date] || {}),
    ...data,
  };

  await saveCalendar();

  notify();
}