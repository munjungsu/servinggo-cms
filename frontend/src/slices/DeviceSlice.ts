import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Call, CallBase } from "../types/servinggo-protocol ";
//import { Call } from "../types/call";
// interface Call {
//   no: string,
//   mapNode: mapNode,
//   serialNo: string,
//   type: number,
//   createdAt: string
// }
// interface mapNode {
//   name: string,
//   type: number,
//   no: number,
//   index: number
// }
// interface regCall {
//   call_: CallBase
// }
interface CallState {
  callList: Call[];
  call? : CallBase
  regCall?: any;
  updateCall?: Iupdate;
  removeCall?: Iremove;
  loading: boolean;
}
interface Iupdate {
  updateCall: Call;
}
interface Iremove {
  removeCall: number;
}

const initialState: CallState = {
  callList: [],
  regCall: "",
  loading: false,
};
//전체 콜 목록 조회
export const getDeviceAll = createAsyncThunk(
  "device/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<CallState>(
        "/api/CallDevice/GetAllCallList"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch device data");
    }
  }
);
//등록 할 콜이 있는지 조회
export const getRegCall = createAsyncThunk(
  "reg_device/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<CallState>(
        "/api/CallDevice/GetRegCallDevice"
      );
      console.log(response)
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch device data");
    }
  }
);
//콜 매칭
export const setRegCall = createAsyncThunk(
  "reg_device/set",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<CallBase>(
        "/api/CallDevice/GetRegCallDevice"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch device data");
    }
  }
);
//update 콜
export const upDateCall = createAsyncThunk(
  "reg_device/update",
  async (payload: Iupdate[], { rejectWithValue }) => {
    try {
      const response = await axios.post<Iupdate>(
        "/api/CallDevice/UpdateCallDevice",
        {
          ...payload,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch device data");
    }
  }
);
export const removeCall = createAsyncThunk(
  "reg_device/remove",
  async (payload: Iremove, { rejectWithValue }) => {
    try {
      const response = await axios.post<Iremove>(
        "/api/CallDevice/RemoveCallDevice",
        {
          ...payload,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch device data");
    }
  }
);
const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDeviceAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getDeviceAll.fulfilled,
        (state, { payload }: PayloadAction<CallState>) => {
          state.loading = false;
          state.callList = payload.callList;
        }
      )
      .addCase(getDeviceAll.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        getRegCall.fulfilled,
        (state, { payload }: PayloadAction<CallState>) => {
          console.log(payload)
          state.loading = false;
          state.regCall = payload;
        }
      )
      .addCase(
        upDateCall.fulfilled,
        (state, { payload }: PayloadAction<Iupdate>) => {
          state.loading = false;
          state.updateCall = payload;
        }
      )
      .addCase(
        removeCall.fulfilled,
        (state, { payload }: PayloadAction<Iremove>) => {
          state.loading = false;
          state.removeCall = payload;
        }
      );
  },
});
export default deviceSlice.reducer;
