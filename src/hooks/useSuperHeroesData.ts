import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { SuperHero } from "../pages/RCSuperheroes";

const fetchSuperHeroes = () => axios.get("http://localhost:4000/superheroes");
const addSuperHero = (hero: unknown) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

export const useSuperHeroesData = (
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
      // select: (data) => data.data.map((hero: { name: string }) => hero.name),
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

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess: (data) => {
      // queryClient.invalidateQueries("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};
