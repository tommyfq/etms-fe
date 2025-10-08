import { AxiosResponse } from "axios";
import { Response } from "../../../../_metronic/helpers";
import { MyProfile } from "./ProfileModel";
import api from "../../../services/api"


const getAccountDetail = (): Promise<MyProfile | undefined> => {
  return api
    .get(`/account/detail`)
    .then((response: AxiosResponse<Response<MyProfile>>) => response.data)
    .then((response: Response<MyProfile>) => response.data);
};

const updateProfile = (myProfile: FormData): Promise<Response<MyProfile>> => {
  return api
    .post(`/account/update`, myProfile)
    .then((response: AxiosResponse<Response<MyProfile>>) => {return response.data})
    //.then((response: Response<Company>) => response.data);
};

const changePassword = (passwordData: {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<Response<{is_ok:boolean, message: string}>> => {
  return api
    .post(`/account/change-password`, passwordData)
    .then((response: AxiosResponse<Response<{is_ok:boolean, message: string}>>) => response.data);
};


export {
    getAccountDetail,
    updateProfile,
    changePassword
};
