import { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { User, ListRoleQueryResponse, ListDCQueryResponse, UsersQueryResponse, ListCompanyQueryResponse } from "./_models";
import api from "../../../../../services/api"

const getUser = (query: string): Promise<UsersQueryResponse> => {
  return api
    .post(`/user/list`, query)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data);
};

const getListRole = (): Promise<ListRoleQueryResponse> => {
    return api
        .get(`/user/list-role`)
        .then((d: AxiosResponse<ListRoleQueryResponse>) => {return d.data});
}

const getListDC = (companyId:number): Promise<ListDCQueryResponse> => {
    return api
        .get(`/dc/list-option/${companyId}`)
        .then((d: AxiosResponse<ListDCQueryResponse>) => {return d.data});
}

const getUserById = (id: ID): Promise<User | undefined> => {
    return api
        .get(`/user/detail/${id}`)
        .then((response: AxiosResponse<Response<User>>) => response.data)
        .then((response: Response<User>) => response.data);
};

const createUser = (user: User): Promise<any> => {
    return api
        .post(`/user/create`, user)
        .then((response: AxiosResponse<Response<User>>) => {return response.data})
        //.then((response: Response<Company>) => response.data);
};

const updateUser = (user: User): Promise<any | undefined> => {
    return api
        .post(`/user/update`, user)
        .then((response: AxiosResponse<Response<User>>) => response.data)
};

const getListCompany = (): Promise<ListCompanyQueryResponse> => {
    return api
      .get(`/company/list-option`)
      .then((d: AxiosResponse<ListCompanyQueryResponse>) => {return d.data});
  }

export {
    getUser,
    getUserById,
    createUser,
    updateUser,
    getListRole,
    getListDC,
    getListCompany
};
