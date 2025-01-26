import { AxiosResponse } from "axios";
import {
  NewsApiInstance,
  guardianApiInstance,
  newYorkTimesApiInstance,
} from "../api/axiosInstance";
import { beginDate } from "../utils/dataTime";

export type Filters = {
  keyword?: string;
  date?: string;
  category?: string;
  source?: string;
};

export type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: { name: string };
  publishedAt: string;
};

const buildGuardianQuery = (keyword?: string, date?: string, category?: string): string => {
  let guardianQuery = "";
  if (keyword) {
    guardianQuery = keyword.split(" ").join(",");
  }
  if (date) {
    guardianQuery += `&from-date=${date}`;
  }
  if (category) {
    guardianQuery += `&section=${category.toLowerCase()}`;
  }
  return guardianQuery;
};

const combineArticles = (
  newsData?: AxiosResponse,
  guardianData?: AxiosResponse,
  nytData?: AxiosResponse
): Article[] => {
  const combinedResults: Article[] = [];

  if (nytData) {
    combinedResults.push(
      ...nytData.data.response.docs.map((doc: any) => ({
        title: doc.headline.main,
        description: doc.lead_paragraph,
        url: doc.web_url,
        urlToImage:
          doc.multimedia && doc.multimedia.length > 0
            ? `https://static01.nyt.com/${doc.multimedia[0].url}`
            : "https://answers-afd.microsoft.com/static/images/image-not-found.jpg",
        source: { name: "The New York Times" },
        publishedAt: doc.pub_date,
      }))
    );
  }

  if (newsData) {
    combinedResults.push(
      ...newsData.data.articles.map((result: any) => ({
        title: result.title,
        description: result.description,
        url: result.url,
        urlToImage:
          result.urlToImage ||
          "https://answers-afd.microsoft.com/static/images/image-not-found.jpg",
        source: { name: "The News" },
        publishedAt: result.publishedAt,
      }))
    );
  }



  if (guardianData) {
    combinedResults.push(
      ...guardianData.data.response.results.map((result: any) => ({
        title: result.webTitle,
        description: result.fields.trailText,
        url: result.webUrl,
        urlToImage:
          result.fields.thumbnail ||
          "https://answers-afd.microsoft.com/static/images/image-not-found.jpg",
        source: { name: "The Guardian" },
        publishedAt: result.webPublicationDate,
      }))
    );
  }

  return combinedResults;
};

export const fetchArticles = async (
  filters: Filters,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<Article[]> => {
  const { keyword, date, category, source } = filters;
  let newsResponse, guardianResponse, nytResponse;

  // Start loading
  setLoading(true);

  try {
    switch (source) {
      case "The Guardian":
        guardianResponse = await guardianApiInstance.get("/search?show-fields=trailText,thumbnail", {
          params: { q: buildGuardianQuery(keyword, date, category) },
        });
        break;
      case "The New York Times":
        nytResponse = await newYorkTimesApiInstance.get("/articlesearch.json", {
          params: {
            q: keyword,
            begin_date: date || beginDate(),
            fq: category?.toLowerCase(),
          },
        });
        break;
      case "The News":
        newsResponse = await NewsApiInstance.get(
          !category ? "/everything" : "/top-headlines",
          {
            params: {
              q: keyword || "everything",
              from: date || beginDate(),
              category: category?.toLowerCase(),
            },
          }
        );
        break;
      default:
        newsResponse = await NewsApiInstance.get(
          !category ? "/everything" : "/top-headlines",
          {
            params: {
              q: keyword || "everything",
              from: date || beginDate(),
              category,
            },
          }
        );
        guardianResponse = await guardianApiInstance.get("/search?show-fields=trailText,thumbnail", {
          params: { q: buildGuardianQuery(keyword, date, category) },
        });
        nytResponse = await newYorkTimesApiInstance.get("/articlesearch.json", {
          params: {
            q: keyword,
            begin_date: date || beginDate(),
            fq: category,
          },
        });
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
  } finally {
    // End loading, regardless of success or failure
    setLoading(false);
  }

  // Combine and return articles from all responses
  return combineArticles(newsResponse, guardianResponse, nytResponse);
};
