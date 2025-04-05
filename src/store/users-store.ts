import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserType } from "../interfaces";
import axios from "axios";

const userGlobalStore = create((set) => ({
  currentUser: null,
  setCurrentUser: (user: UserType) => set({ currentUser: user }),
}));

export default userGlobalStore;

export interface UsersStoreType {
  currentUser: UserType | null;
  setCurrentUser: (user: UserType) => void;
}

interface UserState {
  user: {
    name: string;
    email: string;
  } | null;
  setUser: (user: { name: string; email: string }) => void;
  updateUser: (updatedUser: { name: string; email: string }) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null, // Initially, no user data
      setUser: (user) => set({ user }),

      updateUser: async (updatedUser) => {
        try {
          const response = await axios.put("/api/users/update", updatedUser);
          set({ user: response.data.user }); // Update the store with new user details
        } catch (error) {
          console.error("Failed to update user:", error);
        }
      },
    }),
    { name: "user-storage" } // Persist the state in localStorage
  )
);