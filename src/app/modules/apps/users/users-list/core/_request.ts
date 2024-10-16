import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { User, ListRoleQueryResponse, UsersQueryResponse } from "./_models";

const getUser = (query: string): Promise<UsersQueryResponse> => {
  const url = `http://localhost:8080/api/user/list`
  return axios
    .post(url, query)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data);
};

const getListRole = (): Promise<ListRoleQueryResponse> => {
    const url = `http://localhost:8080/api/user/list-role`
    return axios
        .get(url)
        .then((d: AxiosResponse<ListRoleQueryResponse>) => {return d.data});
}

const getUserById = (id: ID): Promise<User | undefined> => {
    const url = `http://localhost:8080/api/user/detail/${id}`
    return axios
        .get(url)
        .then((response: AxiosResponse<Response<User>>) => response.data)
        .then((response: Response<User>) => response.data);
};

const createUser = (user: User): Promise<any> => {
    const url = `http://localhost:8080/api/user/create`
    return axios
        .post(url, user)
        .then((response: AxiosResponse<Response<User>>) => {return response.data})
        //.then((response: Response<Company>) => response.data);
};

const updateUser = (user: User): Promise<any | undefined> => {
    const url = `http://localhost:8080/api/user/update`
    return axios
        .post(url, user)
        .then((response: AxiosResponse<Response<User>>) => response.data)
};

export {
    getUser,
    getUserById,
    createUser,
    updateUser,
    getListRole
};
