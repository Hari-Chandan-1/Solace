import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  useEffect,
  useState,
} from "react";

const STORAGE_KEY =
  "STILLNESS_RESET";

let resetData: any = {};

let listeners: any[] = [];

function notify() {
  listeners.forEach((listener) =>
    listener({ ...resetData })
  );
}

async function loadReset() {
  try {
    const saved =
      await AsyncStorage.getItem(
        STORAGE_KEY
      );

    if (saved) {
      resetData = JSON.parse(saved);

      notify();
    }
  } catch (error) {
    console.log(error);
  }
}

async function saveReset() {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(resetData)
    );
  } catch (error) {
    console.log(error);
  }
}

export function useResetState() {
  const [state, setState] =
    useState({ ...resetData });

  useEffect(() => {
    listeners.push(setState);

    loadReset();

    return () => {
      listeners = listeners.filter(
        (l) => l !== setState
      );
    };
  }, []);

  return state;
}

export async function saveResetEntry(
  date: string,
  entry: any
) {
  resetData[date] = entry;

  await saveReset();

  notify();
}