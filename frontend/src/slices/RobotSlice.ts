import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from 'axios';
interface robot {
    state: string,
    mode: string,
    battery: number,
    pause: boolean,
    ems: number,
    goal: Object,
    nextGoal: Object,
    Goals: Array<[]>,
    errorText?: string | null,
    error : string | null,
    trays: any,
    status: string,
    loading : boolean,
    // Add other properties as needed
  }
  interface Tray {
    selected : boolean,
    table : string
  }
  
  const initialState: robot = {
    state: "ready",
    mode: "none",
    battery: 85,
    pause: false,
    ems: 0,
    goal: [],
    nextGoal: [],
    Goals: [],
    errorText: null,
    trays: new Array(3).fill({ selected: false, table: "" }),
    status: '',
    loading: false,
    error: null,
  };
  export const getRobot = createAsyncThunk<robot[], undefined, { rejectValue: string }>(
    'robot/get',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.post<robot[]>('/api/v1', {
            cmd : "getRobot",
            version : "gui_v3.1.2"
        });
        return response.data;
      } catch (error) {
        return rejectWithValue('Failed to fetch robot data');
      }
    }
  );
  export const setRobot = createAsyncThunk<robot[], undefined, { rejectValue: string }>(
    'robot/set',
    async (payload:any, { rejectWithValue }) => {
      try {
        const response = await axios.post<robot[]>('/api/v1', {
            cmd : "setRobot",
            version : "gui_v3.1.2",
            ...payload
        });
        return response.data;
      } catch (error) {
        return rejectWithValue('Failed to fetch robot data');
      }
    }
  );

const robotSlice = createSlice({
    name : "robot",
    initialState,
    reducers: {
        robotActionChange : (state, action: PayloadAction<{name : keyof robot, value : any}>)=>{
           const {name, value} = action.payload;
           if(name === "trays"){
            state.trays = value
           }
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getRobot.pending, (state)=>{
            // state.loading = true;
            // state.error = null;
            return {
                ...state
            }
        })
        .addCase(getRobot.fulfilled, (state, action: PayloadAction<robot[]>)=>{
            return {
                ...state,
                ...action.payload ?? null,
            }
            // state.data = action.payload ?? [];
            // state.loading = false;
        })
        .addCase(getRobot.rejected, (state, action: PayloadAction<string | undefined>)=>{
            state.loading = false;
            state.error = action.payload ?? 'Unknown error';
        })
        .addCase(setRobot.pending, (state)=>{
            return {
                ...state
            }
            // state.loading = true;
            // state.error = null;
        })
        .addCase(setRobot.fulfilled, (state, action: PayloadAction<robot[]>)=>{
            return {
                ...state,
                ...action.payload ?? null,
            }
            // state.data = action.payload ?? [];
            // state.loading = false;
        })
        .addCase(setRobot.rejected, (state, action: PayloadAction<string | undefined>)=>{
            state.loading = false;
            state.error = action.payload ?? 'Unknown error';
        })
    }
})
export default robotSlice.reducer;
export const { robotActionChange } = robotSlice.actions;