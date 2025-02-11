import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetOrderListRes } from "../types/servinggo-protocol";
import axios from "axios";
interface GetOrder extends GetOrderListRes {
  loading : boolean
  error?: string;
}
const initialState: GetOrder = {
  orderList: [],
  protocolId: 0,
  result: 204,
  description: "",
  loading: false,
};
export const getOrder = createAsyncThunk<GetOrder, void>(
  "order/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<GetOrder>(
        "/api/Order/GetOrderList"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch device data");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        // state.loading = true;
        // state.error = null;
        state.loading = true
      })
      .addCase(
        getOrder.fulfilled,
        (state, { payload }: PayloadAction<GetOrder>) => {
          state.loading = false;
          state.orderList = payload.orderList
        }
      )
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});
export default orderSlice.reducer;