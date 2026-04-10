import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../../pages/user/types/UserType";

interface UserState {
  users: UserType[];
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  loading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUsers, setLoading } = userSlice.actions;

export default userSlice.reducer;
