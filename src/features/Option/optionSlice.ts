import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface OptionType {
  id: number;
  name: string;
  count: number;
}
export interface CounterState {
  options: OptionType[];
}

const initialState: CounterState = {
  options: [],
};

export const optionSlice = createSlice({
  name: 'OPTION',
  initialState,
  reducers: {
    setOptions: (state, action: PayloadAction<OptionType[]>) => {
      state.options = action.payload;
    },
  },
});

export const { setOptions } = optionSlice.actions;

export default optionSlice;
