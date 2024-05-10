import { create } from "zustand";

type QueueStore = {
  activeQueueID: string | null;
  setActiveQueueID: (id: string) => void;
};

export const useQueueStore = create<QueueStore>((set) => ({
  activeQueueID: null,
  setActiveQueueID: (id) => set({ activeQueueID: id }),
}));

export const useQueue = () => useQueueStore((state) => state);
