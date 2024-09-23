import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../models/user.model';

export interface authState{
 user : IUser; 
}

const initialState: authState= {
  user: {
    id : 1,
    name : ""
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state,action : PayloadAction<number>) {
        state.user.id = action.payload;
    }
  }});

export const authActions = authSlice.actions

export const authReducer = authSlice.reducer