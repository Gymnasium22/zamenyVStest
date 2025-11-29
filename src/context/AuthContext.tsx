import React, { createContext, useContext, useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth } from '../services/firebase';

export type UserRole = 'admin' | 'teacher' | 'guest' | null;

interface AuthContextType {
    user: firebase.User | null;
    role: UserRole;
    loading: boolean;
    logout: () => Promise<void>;
    setGuestRole: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ВАЖНО: Эти email должны совпадать с теми, которые вы создали в Firebase Console
const ADMIN_EMAIL = 'admin@gymnasium22.com';
const TEACHER_EMAIL = 'teacher@gymnasium22.com';


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<firebase.User | null>(null);
    const [role, setRole] = useState<UserRole>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth) {
            console.warn("Firebase Auth is not initialized. Authentication is disabled.");
            setLoading(false);
            return;
        }

        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Улучшенная логика ролей
                if (currentUser.email === ADMIN_EMAIL) {
                    setRole('admin');
                } else if (currentUser.email === TEACHER_EMAIL) {
                    setRole('teacher');
                } else {
                    // Если залогинился неизвестный пользователь, не даем ему роль и выкидываем
                    setRole(null);
                    auth?.signOut();
                }
            } else {
                setRole(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const logout = async () => {
        if (auth) {
            await auth.signOut();
        }
        setRole(null);
    };

    const setGuestRole = () => {
        setRole('guest');
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, role, loading, logout, setGuestRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};