import AsyncStorage from "@react-native-async-storage/async-storage";
import { completeDay } from "./streakStore";
import {
  useEffect,
  useState,
} from "react";

/* GLOBAL TASK STATE */

let tasks: any[] = [];

let listeners: any[] = [];

/* STORAGE KEY */

const STORAGE_KEY = "STILLNESS_TASKS";
function getTodayDate() {
  return new Date()
    .toISOString()
    .split("T")[0];
}
/* NOTIFY */

function notify() {
  listeners.forEach((listener) =>
    listener([...tasks])
  );
}

/* LOAD TASKS */

async function loadTasks() {
  try {
    const savedTasks =
      await AsyncStorage.getItem(
        STORAGE_KEY
      );

    if (savedTasks) {
  tasks = JSON.parse(savedTasks);
tasks = tasks.map(
  (task: any) => ({
    createdDate:
      task.createdDate ||
      getTodayDate(),

    ...task,
  })
);
  const today =
    getTodayDate();

  tasks = tasks.filter(
    (task: any) => {
      if (
        task.done &&
        task.createdDate !==
          today
      ) {
        return false;
      }

      return true;
    }
  );

  await saveTasks();

  notify();
}
  } catch (error) {
    console.log(
      "Error loading tasks:",
      error
    );
  }
}

/* SAVE TASKS */

async function saveTasks() {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    );
  } catch (error) {
    console.log(
      "Error saving tasks:",
      error
    );
  }
}

/* CUSTOM HOOK */

export function useTaskState() {
  const [state, setState] =
    useState([...tasks]);

  useEffect(() => {
    listeners.push(setState);

    loadTasks();

    return () => {
      listeners = listeners.filter(
        (l) => l !== setState
      );
    };
  }, []);

  return state;
}

/* ADD TASK */

export async function addTask(
  task: any
) {
  tasks.push({
  ...task,

  createdDate:
    getTodayDate(),
});

  await saveTasks();

  notify();
}

/* DELETE TASK */

export async function deleteTask(
  id: number
) {
  tasks = tasks.filter(
    (task) => task.id !== id
  );

  await saveTasks();

  notify();
}

/* TOGGLE TASK */

export async function toggleTask(
  id: number
) {
  tasks = tasks.map((task) =>
    task.id === id
      ? {
          ...task,
          done: !task.done,
        }
      : task
  );

  await saveTasks();
  await completeDay();
  notify();
}