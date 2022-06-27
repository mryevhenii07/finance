import { configureStore } from '@reduxjs/toolkit'

import finances from './slice/financeSlice'

export const store = configureStore({
  reducer: {finances,},
})