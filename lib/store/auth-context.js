"use client"

import { createContext } from "react";

export const authContext = createContext({
    user: null,
    loading: false,
    googleLoginHandler:  async ()  => {},
    logout: async () => {},
});

export default function AuthContextProvider({ children }) {
     const values = {
        user,
        loading,
        googleLoginHandler,
        logout
     }
    return (
     <authContext.Provider  value={values}>{children}</authContext.Provider>
    );
    
};