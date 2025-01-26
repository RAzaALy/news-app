import { AxiosInstance } from "axios";
import axios from "axios";
import { config } from "../config/config";

// Helper function to handle request errors
const handleRequestError = (error: any) => {
  console.error("API Error:", error.response || error.message);
  return Promise.reject(error);
};

// Create a pre-configured instance function
const createAxiosInstance = (
  baseURL: string,
  headers: Record<string, string> = {},
  params: Record<string, string> = {}
): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers,
    params,
    timeout: 10000, // Set timeout of 10 seconds
  });

  // Add request/response interceptors
  instance.interceptors.response.use(
    (response) => response, // Pass through successful responses
    handleRequestError // Handle errors globally
  );

  return instance;
};

// NewsAPI instance
const NewsApiInstance = createAxiosInstance(config.NewsApi.BASE_URL, {
  "X-Api-Key": config.NewsApi.API_KEY,
});

// The Guardian API instance
const guardianApiInstance = createAxiosInstance(config.GuardianApi.BASE_URL, {}, {
  "api-key": config.GuardianApi.API_KEY,
});

// New York Times API instance
const newYorkTimesApiInstance = createAxiosInstance(config.NewYorkTimeApi.BASE_URL, {}, {
  "api-key": config.NewYorkTimeApi.API_KEY,
});

export { guardianApiInstance, NewsApiInstance, newYorkTimesApiInstance };
