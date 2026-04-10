import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { UserType } from "../pages/user/types/UserType";
import { db } from "../firebase";
import {
  deleteDoc,
  doc,
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
} from "firebase/firestore";

interface UserContextType {
  users: UserType[];
  loading: boolean;
  addUser: (user: Omit<UserType, "id">) => Promise<void>;
  updateUser: (id: string, user: Partial<UserType>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersCollection = collection(db, "users");

    const unsubscribe = onSnapshot(
      usersCollection,
      (snapshot) => {
        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as UserType[];

        setUsers(usersData);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore sync error:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const addUser = async (user: Omit<UserType, "id">) => {
    try {
      await addDoc(collection(db, "users"), user);
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  };

  const updateUser = async (id: string, user: Partial<UserType>) => {
    try {
      const userRef = doc(db, "users", id);
      // Remove id from payload to avoid self-overwrite issues if it exists in state
      const { id: _, ...data } = user;
      await updateDoc(userRef, data);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await deleteDoc(doc(db, "users", id));
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{ users, loading, addUser, updateUser, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
