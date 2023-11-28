import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { SuperHero } from "../pages/RCSuperheroes";

const fetchSuperHero = ({ queryKey }: { queryKey: string }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId: { heroId: string }) => {
  const queryClient = useQueryClient();
  return useQuery(["super-hero", heroId], fetchSuperHero, {
    initialData: () => {
      const hero: SuperHero | undefined = queryClient
        .getQueryData<{ data: SuperHero[] }>("super-heroes")
        ?.data?.find((hero: SuperHero) => hero.id === parseInt(heroId));
      return hero ? { data: hero } : undefined;
    },
  });
};

// export const useSuperHeroData = heroId => {
//   const queryClient = useQueryClient()
//   return useQuery(['super-hero', heroId], fetchSuperHero, {
//     initialData: () => {
//       const hero = queryClient
//         .getQueryData('super-heroes')
//         ?.data?.find(hero => hero.id === parseInt(heroId))
//       if (hero) {
//         return { data: hero }
//       } else {
//         return undefined
//       }
//     }
//   })
// }
