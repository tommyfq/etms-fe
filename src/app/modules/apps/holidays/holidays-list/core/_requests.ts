import { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { Holiday, HolidayQueryResponse } from "./_models";
import api from "../../../../../services/api"

const getHoliday = (query: string): Promise<HolidayQueryResponse> => {
  return api
    .post(`/holiday/list`, query)
    .then((d: AxiosResponse<HolidayQueryResponse>) => d.data);
};

const getHolidayById = (id: ID): Promise<Holiday | undefined> => {
  return api
    .get(`/holiday/detail/${id}`)
    .then((response: AxiosResponse<Response<Holiday>>) => response.data)
    .then((response: Response<Holiday>) => response.data);
};

const createHoliday = (holiday: Holiday): Promise<Response<Holiday>> => {
  return api
    .post(`/holiday/create`, holiday)
    .then((response: AxiosResponse<Response<Holiday>>) => response.data)
};

const updateHoliday = (holiday: Holiday): Promise<Response<Holiday>> => {
  return api
    .post(`/holiday/update`, holiday)
    .then((response: AxiosResponse<Response<Holiday>>) => response.data)
};

const downloadExcelFile = async (): Promise<void> => {
  try {
    const response = await api.get('/holiday/download', {
      responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'holiday_data.xlsx';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

const uploadFile = (formData: any): Promise<any | undefined> => {
  return api
    .patch(`/holiday/upload`, formData)
    .then((response: AxiosResponse<Response<Holiday>>) => response.data)
};


export {
  getHoliday,
  getHolidayById,
  createHoliday,
  updateHoliday,
  downloadExcelFile,
  uploadFile
};