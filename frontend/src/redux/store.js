import { configureStore } from '@reduxjs/toolkit'
// import todoReducer from "./Counter"
import userReducer from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    user: userReducer
  },
})