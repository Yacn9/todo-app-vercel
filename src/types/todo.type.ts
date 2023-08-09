interface ITodo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

type TStatus =
    "loading" |
    "error" |
    "success" |
    "init"

type TNewTask = Omit<ITodo, "id" | "completed">;

export type { ITodo, TStatus, TNewTask }