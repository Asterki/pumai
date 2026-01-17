import axios from "axios";

import { type ConfigAPITypes } from ".";

import ApiUtils from "../../utils/api";

const baseUrl =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_SERVER_URL + "/api/config"
    : "/api/config";

// Create an Axios client with credentials enabled by default
const axiosClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // Always include credentials
});

const configApi = {
  get: async (): Promise<ConfigAPITypes.GetConfigResponseData> => {
    try {
      const response =
        await axiosClient.get<ConfigAPITypes.GetConfigResponseData>(``, {
          withCredentials: true,
        });

      return response.data;
    } catch (error: Error | unknown) {
      // Check if the result is a network error, if so, we try to fetch from cache
      return ApiUtils.handleAxiosError(error);
    }
  },
  update: async (
    data: ConfigAPITypes.UpdateConfigRequestBody,
  ): Promise<ConfigAPITypes.UpdateResponseData> => {
    try {
      const response =
        await axiosClient.post<ConfigAPITypes.UpdateResponseData>(
          `/update`,
          data,
          {
            withCredentials: true,
          },
        );

      return response.data;
    } catch (error: Error | unknown) {
      return ApiUtils.handleAxiosError(error);
    }
  },
};

export default configApi;
