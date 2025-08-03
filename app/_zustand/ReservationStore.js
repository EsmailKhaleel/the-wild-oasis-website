import { create } from "zustand";

const initialRange = { from: undefined, to: undefined };

const useReservationStore = create(
    (set) => ({
      range: initialRange,
      setRange: (range) => set({ range }),
      resetRange: () => set({ range: initialRange }),
    })
);

export default useReservationStore;
