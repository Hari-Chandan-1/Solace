import { Audio } from "expo-av";

let rainSound: Audio.Sound | null = null;

export async function loadSounds() {
  try {
    rainSound = new Audio.Sound();

    await rainSound.loadAsync(
      require("../assets/sounds/buttonsound.mp3")
    );

    await rainSound.setVolumeAsync(0.3);
  } catch (error) {
    console.log(error);
  }
}

export async function playButtonSound() {
  try {
    if (rainSound) {
      await rainSound.replayAsync();
    }
  } catch (error) {
    console.log(error);
  }
}