import axios from "axios";
import { useQuery } from "react-query";

interface Config {
  method?: string;
  url: string;
  data?: never;
}

export const useCutomQuery = (
  FetchConfig: Config,
  onSuccess: (any) => void,
  onError: () => void,
  queryName: string
) => {
  const fetchSuperHeroes = () => axios(FetchConfig);

  // isLoading, data, isError, error, isFetching
  return useQuery(
    queryName,
    fetchSuperHeroes,
    { onSuccess, onError }
    // {
    //   staleTime: 0,  how many ms to wait to make a new fetch
    //   cacheTime: 5000,
    //   refetchOnMount: "true", default
    //   refetchOnMount: "always", override staletime
    //   refetchOnWindowFocus: "true", default
    //   refetchOnWindowFocus: "always", override staletime

    // refetchInterval: false,
    // refetchIntervalInBackground: false,

    // enabled: false
    // }
  );
};
