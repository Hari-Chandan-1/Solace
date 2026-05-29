import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  useEffect,
  useState,
} from "react";

/* STORAGE KEY */

const STORAGE_KEY =
  "STILLNESS_PROFILE";

/* PROFILE DATA */

let profileData = {
  name: "Hari Chandan",

  identity:
    "Building a calm disciplined future.",

  quote:
    "A calm disciplined mind can quietly build an extraordinary life.",

  vision: [
    "GATE 2027 Preparation",

    "DRDO Career Journey",

    "Mental Peace & Clarity",

    "Strong Health & Discipline",

    "Deep Focus & Consistency",
  ],

  values: [
    "Discipline",

    "Clarity",

    "Stillness",

    "Momentum",
  ],
};

/* LISTENERS */

let listeners: any[] = [];

/* NOTIFY */

function notify() {
  listeners.forEach((listener) =>
    listener({ ...profileData })
  );
}

/* LOAD */

async function loadProfile() {
  try {
    const saved =
      await AsyncStorage.getItem(
        STORAGE_KEY
      );

    if (saved) {
      const parsed = JSON.parse(saved);

profileData = {
  ...profileData,
  ...parsed,
};

      notify();
    }
  } catch (error) {
    console.log(
      "Error loading profile:",
      error
    );
  }
}

/* SAVE */

async function saveProfile() {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(profileData)
    );
  } catch (error) {
    console.log(
      "Error saving profile:",
      error
    );
  }
}

/* HOOK */

export function useProfileState() {
  const [state, setState] =
    useState({ ...profileData });

  useEffect(() => {
    listeners.push(setState);

    loadProfile();

    return () => {
      listeners = listeners.filter(
        (l) => l !== setState
      );
    };
  }, []);

  return state;
}

/* UPDATE */

export async function updateProfile(
  updates: Partial<
    typeof profileData
  >
) {
  profileData = {
    ...profileData,
    ...updates,
  };

  await saveProfile();

  notify();
}