import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ConversationEntry {
  id: string;
  originalText: string;
  translatedText: string;
  originalLang: string;
  targetLang: string;
  timestamp: number;
  source: 'phrase' | 'recording';
  speaker?: 'officer' | 'detained';
}

interface ConversationStore {
  conversations: ConversationEntry[];
  addConversation: (conversation: Omit<ConversationEntry, 'id' | 'timestamp'>) => void;
  clearConversation: (id: string) => void;
  clearAllConversations: () => void;
}

export const useConversationStore = create<ConversationStore>()(
  persist(
    (set) => ({
      conversations: [],
      addConversation: (conversation) =>
        set((state) => ({
          conversations: [
            {
              ...conversation,
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
              timestamp: Date.now(),
            },
            ...state.conversations,
          ],
        })),
      clearConversation: (id) =>
        set((state) => ({
          conversations: state.conversations.filter((conv) => conv.id !== id),
        })),
      clearAllConversations: () => set({ conversations: [] }),
    }),
    {
      name: 'ice-cbp-conversations',
    }
  )
);