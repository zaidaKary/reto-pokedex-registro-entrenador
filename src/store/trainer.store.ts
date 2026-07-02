import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Trainer } from "../types/trainer";

interface TrainerStore {
  trainer: Trainer | null;
  saveTrainer: (trainer: Trainer) => void;
  clearTrainer: () => void;
}

export const useTrainerStore = create<
  TrainerStore,
  [["zustand/persist", unknown]]
>(
  persist(
    (set) => ({
      trainer: null,

      saveTrainer: (trainer) =>
        set({
          trainer,
        }),

      clearTrainer: () =>
        set({
          trainer: null,
        }),
    }),
    {
      name: "trainer-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
