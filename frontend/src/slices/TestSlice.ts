import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
interface item {
    id?: number,
    title?: string | null,
    body?: string | null,
    userId: number,
    data: any,
    loading: boolean
}
const initialState: item = {
    id: 1,
    title: null,
    body: null,
    userId: 1,
    loading: false,
    data: []
}
interface itemPayload {
    title?: string | null,
    body?: string | null,
    userId?: number,
}
export const getItem = createAsyncThunk<item, number, { rejectValue: string }>(
    'item/get',
    async (payload:number, { rejectWithValue }) => {
      try {
        const response = await axios.get<item>(`https://jsonplaceholder.typicode.com/posts`);
        return response.data;
      } catch (error) {
        return rejectWithValue('Failed to fetch robot data');
      }
    }
  );
  export const setItem = createAsyncThunk<item, itemPayload, { rejectValue: string }>(
    'item/set',
    async (payload:itemPayload, { rejectWithValue }) => {
      try {
        const response = await axios.post<item>(`https://jsonplaceholder.typicode.com/posts/`, {
            ...payload
        });
        return response.data;
      } catch (error) {
        return rejectWithValue('Failed to fetch robot data');
      }
    }
  );
  const testSlice = createSlice({
    name : "test",
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
        .addCase(getItem.pending, (state)=>{
            state.loading = true
        })
        .addCase(getItem.fulfilled, (state, {payload})=>{
            state.data = payload;
            state.loading = false;
          
        })
        .addCase(getItem.rejected, (state)=>{
            //state.loading = false;
        })
        .addCase(setItem.pending, (state)=>{
            state.loading = true
        })
        .addCase(setItem.fulfilled, (state, {payload})=>{
            console.log(payload)
            state.data = {
                ...state.data,
                ...payload
            }
          
        })
        .addCase(setItem.rejected, (state)=>{
            //state.loading = false;
        })
    }
})
export default testSlice.reducer;