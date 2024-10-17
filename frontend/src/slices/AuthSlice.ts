import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
type user = {
    userData : any
}
const initialState: user = {
    userData: []
}
type userPayload = {
    id: string,
    password: string,
}
export const Authority = createAsyncThunk<user, userPayload, { rejectValue: string }>(
    'login/set',
    async (payload:userPayload, { rejectWithValue }) => {
      try {
        const response = await axios.post<user>('/api/Authority/SignIn', {
           ...payload
        });
        return response.data;
      } catch (error) {
        return rejectWithValue('Failed to fetch robot data');
      }
    }
  );
const authSlice = createSlice({
    name : "login",
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
        .addCase(Authority.pending, (state)=>{
            // return {
            //     ...state
            // }
        })
        .addCase(Authority.fulfilled, (state, {payload})=>{
            state.userData = {
                ...payload
            }
        })
            
        .addCase(Authority.rejected, (state)=>{
            //state.loading = false;
        })
    }
})
export default authSlice.reducer;