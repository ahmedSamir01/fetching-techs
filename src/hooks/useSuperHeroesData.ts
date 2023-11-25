import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => axios.get("http://localhost:4000/superheroes");

export const useCustomQuery = (
  onSuccess: (key: unknown) => void,
  onError: () => void
) => {
  // isLoading, data, isError, error, isFetching
  return useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      onSuccess,
      onError,
      select: (data) => data.data.map((hero: { name: string }) => hero.name),
    }
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
