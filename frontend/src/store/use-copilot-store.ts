import { create } from "zustand";
import type { CopilotMessage } from "@/types/copilot";

interface CopilotState {
  messages: CopilotMessage[];
  isLoading: boolean;
  addMessage: (message: CopilotMessage) => void;
  updateMessage: (id: string, patch: Partial<CopilotMessage>) => void;
  appendToMessage: (id: string, delta: string) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

export const useCopilotStore = create<CopilotState>((set) => ({
  messages: [],
  isLoading: false,
  addMessage: (message) =>
    set((s) => ({ messages: [...s.messages, message] })),
  updateMessage: (id, patch) =>
    set((s) => ({
      messages: s.messages.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    })),
  appendToMessage: (id, delta) =>
    set((s) => ({
      messages: s.messages.map((m) =>
        m.id === id ? { ...m, content: m.content + delta } : m,
      ),
    })),
  setLoading: (isLoading) => set({ isLoading }),
  clearMessages: () => set({ messages: [] }),
}));
