import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

export const DynamicParallelQueries = () => {
  const queryResults = useQueries([
    {
      queryKey: "super-heroes",
      queryFn: fetchSuperHeroes,
    },
    {
      queryKey: "friends",
      queryFn: fetchFriends,
    },
  ]);

  console.log(queryResults);

  return <div>Dynamic Parallel Queries</div>;
};
