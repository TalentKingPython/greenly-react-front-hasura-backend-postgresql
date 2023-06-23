import React from "react";
import firebase from "firebase/compat/app";

export const AuthContext = React.createContext<firebase.User | null>(null);
