import axios from "axios";
import AIFeature, { AIAPITypes } from ".";

import ApiUtils from "../../utils/api";

const baseUrl =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_SERVER_URL + "/api/ai"
    : "/api/ai";

const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const api = {
  async generate(
    data: AIAPITypes.GenerateRequestBody,
  ): Promise<AIAPITypes.GenerateResponseData> {
    try {
      const response = await axiosClient.post<AIAPITypes.GenerateResponseData>(
        "/generate",
        data,
      );

      return response.data;
    } catch (error) {
      return ApiUtils.handleAxiosError(error);
    }
  },
};

export default api;
