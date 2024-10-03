import envConfig from "@/src/config/envConfig";
import { Nexios } from "nexios-http";
import { cookies } from "next/headers";

const nexiosInstance = new Nexios({
  baseURL: envConfig.baseApi,
  headers: {
    "Content-Type": "application/json",
  },
});

nexiosInstance.interceptors.request.use((config) => {
  const accessToken = cookies().get("accessToken")?.value;

  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `${accessToken}`,
    };
  }

  return config;
});

export default nexiosInstance;
