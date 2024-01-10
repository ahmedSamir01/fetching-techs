import { useMutation, useQuery, useQueryClient } from "react-query";
import { SuperHero } from "../pages/RCSuperheroes";
import { request } from "../utils/axios-utils";

const fetchSuperHeroes = () => request({ url: "/superheroes" });
const addSuperHero = (hero: SuperHero) => {
  // return axios.post("http://localhost:4000/superheroes", hero);
  return request({ url: "/superheroes", method: "post", data: hero });
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
    // onSuccess: (data) => {
    //   // refetch the main list (X)
    //   // queryClient.invalidateQueries("super-heroes");

    //   // use response to to update the main list without refetching again
    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },

    // get the data that passed to the addSuperHero async fn, to optimisticlly update the UI
    onMutate: async (newHero: SuperHero) => {
      // cancel any refetches could happens, to avoid overwriting the optimistic update
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData.data.length + 1, ...newHero },
          ],
        };
      });
      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
