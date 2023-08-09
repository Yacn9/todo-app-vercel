import { TNewTask, ITodo } from "types";
import { APIService } from "services";
import { AxiosResponse } from "axios";

const ENTITY = "/todo";

const list = (): Promise<AxiosResponse<ITodo[]>> => APIService.get(`${ENTITY}`);

const changeStatus = (data: ITodo): Promise<AxiosResponse> =>
    APIService.patch(`${ENTITY}/${data.id}`, {
        ...data,
        completed: !data.completed,
    });

const del = (id: number): Promise<AxiosResponse> =>
    APIService.delete(`${ENTITY}/${id}`);

const create = (data: TNewTask): Promise<AxiosResponse> =>
    APIService.post(`${ENTITY}`, { ...data, userId: 1, completed: false });

const update = (data: TNewTask, id: number): Promise<AxiosResponse> =>
    APIService.put(`${ENTITY}/${id}`, data);

export const TodoAPI = {
    list,
    changeStatus,
    del,
    create,
    update,
};