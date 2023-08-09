import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodoAPI } from "api";
import { TStatus, ITodo, TNewTask } from "types";

type InitialState = {
    status: TStatus;
    list: ITodo[];
};
const initialState: InitialState = {
    status: "init",
    list: [],
};

export const getTodoListAction = createAsyncThunk(
    "todo/getTodoListAction",
    async () => {
        const res = await TodoAPI.list();
        return res.data.reverse();
    }
);

export const deleteTodoAction = createAsyncThunk(
    "todo/deleteTodoAction",
    async (id: number) => {
        await TodoAPI.del(id);
        return id;
    }
);

export const updateStatusTodoAction = createAsyncThunk(
    "todo/updateStatusTodoAction",
    async (data: ITodo) => {
        await TodoAPI.changeStatus(data);
        return data.id;
    }
);

export const updateTodoAction = createAsyncThunk(
    "todo/updateTodoAction",
    async ({ id, data }: { id: number; data: TNewTask }) => {
        const res = await TodoAPI.update(data, id);
        return res.data;
    }
);

export const createTodoAction = createAsyncThunk(
    "todo/createTodoAction",
    async (data: TNewTask) => {
        const res = await TodoAPI.create(data);
        return res.data;
    }
);

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTodoListAction.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getTodoListAction.rejected, (state) => {
            state.status = "error";
        });
        builder.addCase(getTodoListAction.fulfilled, (state, action) => {
            state.status = "success";
            state.list = action.payload;
        });
        builder.addCase(deleteTodoAction.fulfilled, (state, action) => {
            state.list = state.list.filter((value) => value.id !== action.payload);
        });
        builder.addCase(updateStatusTodoAction.fulfilled, (state, action) => {
            state.list = state.list.map((todo) =>
                todo.id === action.payload
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
        });
        builder.addCase(updateTodoAction.fulfilled, (state, action) => {
            state.list = state.list.map((todo) =>
                todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
            );
        });
        builder.addCase(createTodoAction.fulfilled, (state, action) => {
            state.list.unshift(action.payload);
        });
    },
});

export default todoSlice.reducer;