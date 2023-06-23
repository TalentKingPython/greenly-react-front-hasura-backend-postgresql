import React, { useState, useContext } from 'react';
import { AuthContext } from '../modules/firebase/context/authContext';
import firebase from 'firebase/compat/app';

export function useAuth() {
  return useContext(AuthContext);
}

export const TestAuthProvider: React.FC = ({ children }) => {
  const [user] = useState<firebase.User | null>(null);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
