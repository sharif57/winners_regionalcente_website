import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FocusTarget = "reachout"  | null;

interface FocusState {
  target: FocusTarget;
  requestId: number;
}

const initialState: FocusState = {
  target: null,
  requestId: 0,
};

const focusSlice = createSlice({
  name: "focus",
  initialState,
  reducers: {
    requestFocus: (state, action: PayloadAction<FocusTarget>) => {
      state.target = action.payload;
      state.requestId += 1;
    },
    clearFocus: (state) => {
      state.target = null;
    },
  },
});

export const { requestFocus, clearFocus } = focusSlice.actions;
export default focusSlice.reducer;