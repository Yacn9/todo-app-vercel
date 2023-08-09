import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import todoReducer from "./slices/todo.slice";

const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store;