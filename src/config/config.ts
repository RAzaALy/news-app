// Define types for categories and sources
export const categories: string[] = [
    "Health",
    "Sports",
    "Sciences",
    "Entertainment",
    "Technology",
    "Business",
    "Education",
  ];
  
  export const sources: string[] = [
    "The News",
    "The Guardian",
    "The New York Times",
  ];
  

  interface ApiConfig {
    BASE_URL: string;
    API_KEY: string;
  }
  
  interface AppConfig {
    NewsApi: ApiConfig;
    GuardianApi: ApiConfig;
    NewYorkTimeApi: ApiConfig;
  }
  
  export const config: AppConfig = {
    NewsApi: {
      BASE_URL: "https://newsapi.org/v2",
      API_KEY: import.meta.env.VITE_REACT_APP_NEWS_API_KEY,
    },
    GuardianApi: {
      BASE_URL: "https://content.guardianapis.com",
      API_KEY: import.meta.env.VITE_REACT_APP_GUARDIAN_API_KEY,
    },
    NewYorkTimeApi: {
      BASE_URL: "https://api.nytimes.com/svc/search/v2",
      API_KEY: import.meta.env.VITE_REACT_APP_NEWYORK_TIMES_CREDENTIALS,
    },
  };