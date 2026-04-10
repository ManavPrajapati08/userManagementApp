import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useAppDispatch } from "../../store/hooks";
import { setUsers, setLoading } from "../../store/slices/userSlice";
import type { UserType } from "../../pages/user/types/UserType";

export const useDatabaseSync = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const usersCollection = collection(db, "users");

    const unsubscribe = onSnapshot(
      usersCollection,
      (snapshot) => {
        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as UserType[];

        dispatch(setUsers(usersData));
      },
      (error) => {
        console.error("Firestore sync error:", error);
        dispatch(setLoading(false));
      },
    );

    return () => unsubscribe();
  }, [dispatch]);
};
