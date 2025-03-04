import { AxiosResponse } from "axios";
import { ReportingQueryResponse, ListYearQueryResponse, ListMonthQueryResponse } from "./_models";
import api from "../../../../../services/api"

import moment from 'moment';

const ASSET_URL = `/report`;

const getReport = (query: string): Promise<ReportingQueryResponse> => {
  return api
    .post(`${ASSET_URL}/list`, query)
    .then((d: AxiosResponse<ReportingQueryResponse>) => d.data);
};

const getListYear = (): Promise<ListYearQueryResponse> => {
  return api
    .post(`${ASSET_URL}/list-year`)
    .then((d: AxiosResponse<ListYearQueryResponse>) => d.data);
};

const getListMonth = (year: string): Promise<ListMonthQueryResponse> => {
  return api
    .post(`${ASSET_URL}/list-month`, {year:year})
    .then((d: AxiosResponse<ListMonthQueryResponse>) => d.data);
};

const downloadExcelFile = async (year:string, month:string): Promise<void> => {
  try {

    const timestamp = moment().format("YYYYMMDDHHmmss");

    const response = await api.post('/report/download', 
      {filter_year:year, filter_month:month},
      { responseType: 'blob', }// Important to specify the response type
    );

    // Create a blob from the response data
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a link element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'reporting_data_'+timestamp+'.xlsx'; // Name the downloaded file

    // Append to the document body
    document.body.appendChild(link);

    // Trigger the download by simulating click
    link.click();

    // Clean up and remove the link
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading file:', error);
    // Handle error appropriately (e.g., show an alert to the user)
  }
};


export {
  getReport,
  downloadExcelFile,
  getListYear,
  getListMonth
};
