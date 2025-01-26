import React, { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchArticles, Filters, Article } from "../services/articles";
import { getPreferences } from "../utils/localstorage";

type ArticlesContextType = {
  articles: Article[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  setFilters: Dispatch<SetStateAction<Filters>>; // Update type here
  filters: Filters; // Include filters in the context if needed
  loading : boolean
};

const ArticlesContext = createContext<ArticlesContextType | undefined>(
  undefined
);

export const ArticlesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<Filters>({});
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    setFilters(prev => ({...prev, ...getPreferences()}))
  },[])

  const {
    data: articles,
    isLoading,
    error,
    refetch,
  } = useQuery(["articles", filters], () => fetchArticles(filters,setLoading), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  console.log({filters})
  // Narrow the type of `error` to `Error | null`
  const typedError = error instanceof Error ? error : null;


  return (
    <ArticlesContext.Provider
      value={{ articles, isLoading, error: typedError, refetch, setFilters, filters,loading }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = (): ArticlesContextType => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error("useArticles must be used within an ArticlesProvider");
  }
  return context;
};
