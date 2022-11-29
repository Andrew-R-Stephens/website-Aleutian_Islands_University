import create from 'zustand'
import {persist} from "zustand/middleware";

export enum Roles {
    Visitor,
    Student,
    Faculty,
    Administrator,
    Researcher
}

export const AuthRole = {
    Visitor: '0',
    Student: '1',
    Faculty: '2',
    Administrator: '3',
    Researcher: '4'
}

export const RoleAuthStore = create(persist((set:any, get:any) => ({
        authRole: AuthRole.Visitor,
        setRole_Visitor: () => {
            console.log("Attempting V set")
            set(() => ({ authRole: AuthRole.Visitor }))
        },
        setRole_Student: () => {
            console.log("Attempting S set")
            set(() => ({ authRole: AuthRole.Student }))
        },
        setRole_Faculty: () => {
            console.log("Attempting F set")
            set(() => ({ authRole: AuthRole.Faculty }))
        },
        setRole_Administrator: () => {
            console.log("Attempting A set")
            set(() => ({ authRole: AuthRole.Administrator }))
        },
        setRole_Researcher: () => {
            console.log("Attempting R set")
            set(() => ({ authRole: AuthRole.Researcher }))
        },
        setDefaultRole: () => {
            console.log("Attempting D set")
            set(() => ({ authRole: AuthRole.Visitor }))
        },
        invalidateRole: (newRole:string) => {
            console.log("requested role:", newRole);
            switch(newRole) {
                case AuthRole.Visitor: {
                    RoleAuthStore.getState().setDefaultRole();
                    return;
                }
                case AuthRole.Student: {
                    RoleAuthStore.getState().setRole_Student();
                    return;
                }
                case AuthRole.Faculty: {
                    RoleAuthStore.getState().setRole_Faculty();
                    return;
                }
                case AuthRole.Administrator: {
                    RoleAuthStore.getState().setRole_Administrator();
                    return;
                }
                case AuthRole.Researcher: {
                    RoleAuthStore.getState().setRole_Researcher();
                    return;
                }
            }
        }
    }), {
        name: 'roleStore',
        getStorage: () => sessionStorage
    })
);

export const UserAuthStore = create(persist((set:any, get:any) => ({
        userID: '0',
        setUserID: (newID:string) => {
            set(() => ({ userID: newID }));
        },
        action: () => {
            const userID = get().userID;
        },
        setDefaults: () => set(() => ({ userID: '0' }))
    }), {
        name: 'authStore',
        getStorage: () => sessionStorage
    })
);