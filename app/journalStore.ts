import AsyncStorage from "@react-native-async-storage/async-storage";
import { completeDay } from "./streakStore";
import {
  useEffect,
  useState,
} from "react";

/* STORAGE */

const STORAGE_KEY =
  "STILLNESS_JOURNAL";

/* GLOBAL STATE */

let journalEntries: any = {};

let listeners: any[] = [];

/* TODAY DATE */

function getTodayDate() {
  return new Date()
    .toISOString()
    .split("T")[0];
}

/* NOTIFY */

function notify() {
  listeners.forEach((listener) =>
    listener({ ...journalEntries })
  );
}

/* LOAD */

async function loadJournal() {
  try {
    const saved =
      await AsyncStorage.getItem(
        STORAGE_KEY
      );

    if (saved) {
      journalEntries = JSON.parse(saved);

      notify();
    }
  } catch (error) {
    console.log(
      "Error loading journal:",
      error
    );
  }
}

/* SAVE */

async function saveJournal() {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(journalEntries)
    );
  } catch (error) {
    console.log(
      "Error saving journal:",
      error
    );
  }
}

/* HOOK */

export function useJournalState() {
  const [state, setState] =
    useState({ ...journalEntries });

  useEffect(() => {
    listeners.push(setState);

    loadJournal();

    return () => {
      listeners = listeners.filter(
        (l) => l !== setState
      );
    };
  }, []);

  return state;
}

/* SAVE ENTRY */

export async function saveEntry(
  questions: string[],
  answers: any
) {
  const today = getTodayDate();

  journalEntries[today] = {
    date: today,

    questions,

    answers,
  };

  await saveJournal();

  await completeDay();

  notify();
}
/* GET TODAY ENTRY */

export function getTodayEntry() {
  const today = getTodayDate();

  return journalEntries[today];
}