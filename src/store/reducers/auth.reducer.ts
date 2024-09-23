import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface authState{
 userId : number; 
}

const initialState: authState= {
  userId : 1
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state,action : PayloadAction<number>) {
        state.userId = action.payload;
    }
  }});

export const authActions = authSlice.actions

export const authReducer = authSlice.reducer