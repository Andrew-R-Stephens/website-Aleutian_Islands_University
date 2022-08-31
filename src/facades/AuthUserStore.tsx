import create from 'zustand'
import {persist} from "zustand/middleware";

export const useUserAuthStore = create(persist(set => ({
        userID: '0',
        setUserID: (newID:string) => set(() => ({ userID: newID })),
        defaultUserID: () => set(() => ({ userID: 0 }))
    }))
);
