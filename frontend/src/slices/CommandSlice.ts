import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RobotGoHomeRes,
  RobotPauseRes,
  RobotPauseReq,
  RobotGoHomeReq,
  RobotDefaultSummary,
  GetRobotRes,
} from "../types/servinggo-protocol";
import axios from "axios";
interface Command extends RobotPauseReq {
  loading: boolean;
  error?: string;
  isPause?: boolean;
}
const initialState: Command = {
    robotNo: 0,
    loading: false,
    error: "",
    isPause: false,
};
export const robotHome = createAsyncThunk<RobotGoHomeReq, RobotGoHomeReq>(
    "robot/set_home",
    async (payload:RobotGoHomeReq, { rejectWithValue }) => {
      try {
        const response = await axios.post<Command>(
          "/api/Robot/RobotGoHome", {
            ...payload
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue("Failed to fetch device data");
      }
    }
  );
  export const robotPause = createAsyncThunk<RobotPauseReq, RobotPauseReq>(
    "robot/set_pause",
    async (payload:RobotPauseReq, { rejectWithValue }) => {
      try {
        const response = await axios.post<Command>(
          "/api/Robot/RobotPause",{
            ...payload
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue("Failed to fetch device data");
      }
    }
  );
  const commandSlice = createSlice({
    name: "command",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(robotHome.pending, (state) => {
          state.loading = true
        })
        .addCase(
            robotHome.fulfilled,
          (state, { payload }: PayloadAction<RobotGoHomeReq>) => {
            state.loading = false;
            //state.robotNo = payload.robotNo;
          }
        )
        .addCase(robotHome.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(robotPause.pending, (state) => {
            state.loading = true
          })
          .addCase(
            robotPause.fulfilled,
            (state, { payload }: PayloadAction<RobotPauseReq>) => {
              state.loading = false;
              //state.robotNo = payload.robotNo;
              //state.isPause = payload.isPause;
            }
          )
          .addCase(robotPause.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          })
    },
  });
  export default commandSlice.reducer;