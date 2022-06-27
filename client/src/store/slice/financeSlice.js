import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  finance: {},
};

export const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    addFinance(state, action) {
      action.payload.forEach(({ ticker, ...rest }) => {
        // console.log(ticker);
        // console.log(rest);
        if (state.finance[ticker]) {
          state.finance[ticker].push(rest);
          return;
        }
        state.finance[ticker] = [rest];
      });
    },
  },
});

export const { addFinance } = financeSlice.actions;

export default financeSlice.reducer;
