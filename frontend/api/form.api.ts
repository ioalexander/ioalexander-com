import axios from "axios";
import type { IApiResponse } from "~/types/api";

export const formApi = (config: { baseUrl: string }) => {
  const axiosBase = axios.create({
    baseURL: config.baseUrl + "/form",
    withCredentials: true,
    validateStatus: (status) => status >= 200 && status < 399,
  });

  return {
    async submitContactForm(data: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      message: string;
      turnstile: string;
    }): Promise<IApiResponse<{ formId: string }>> {
      const { data: payload } = await axiosBase.post("/submit/contact", data);

      return payload;
    },
  };
};
