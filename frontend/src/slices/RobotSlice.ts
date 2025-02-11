import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllRobotListRes } from "../types/servinggo-protocol";
import axios from "axios";
interface GetRobot extends GetAllRobotListRes {
  loading : boolean
  error?: string;
}
const initialState: GetRobot = {
  robotDetailSummaryList: [],
  protocolId: 0,
  result: 204,
  description: "",
  loading: false,
};
export const getRobot = createAsyncThunk<GetRobot, void>(
  "robot/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<GetRobot>(
        "/api/Robot/GetAllRobotList"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch device data");
    }
  }
);
const robotSlice = createSlice({
  name: "robot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRobot.pending, (state) => {
        // state.loading = true;
        // state.error = null;
        state.loading = true
      })
      .addCase(
        getRobot.fulfilled,
        (state, { payload }: PayloadAction<GetRobot>) => {
          state.loading = false;
          state.robotDetailSummaryList = payload.robotDetailSummaryList
        }
      )
      .addCase(getRobot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});
export default robotSlice.reducer;
