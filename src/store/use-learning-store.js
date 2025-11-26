import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useLearningStore = create(
  persist(
    (set) => ({
      xp: 0,
      streak: 0,
      completedNodes: [], // Array of lesson/unit IDs that are completed

      // Actions
      addXp: (amount) => set((state) => ({ xp: state.xp + amount })),
      decreaseXp: (amount) => set((state) => ({ xp: Math.max(0, state.xp - amount) })),
      incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
      markNodeCompleted: (nodeId) => set((state) => {
        if (state.completedNodes.includes(nodeId)) return state;
        return { completedNodes: [...state.completedNodes, nodeId] };
      }),
      resetLearningProgress: () => set({ xp: 0, streak: 0, completedNodes: [] }),
      resetCurrentLesson: (lessonId) => set((state) => ({
        completedNodes: state.completedNodes.filter(id => id !== lessonId)
      })),
    }),
    {
      name: 'learning-storage', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);