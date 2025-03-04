import { configureStore, Tuple } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import logger from 'redux-logger'
import AuthSlice from "./slices/AuthSlice";
import DeviceSlice from "./slices/DeviceSlice";
import TestSlice from "./slices/TestSlice";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer : {
       login: AuthSlice,
       device: DeviceSlice,
       test: TestSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
    
    // devTools: process.env.NODE_ENV !== "production",
});
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;