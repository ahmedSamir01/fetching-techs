import axios from "axios";
import { useQuery } from "react-query";

interface SuperHero {
  name: string;
  age: number;
  superpower: string;
}

const fetchSuperHeroes = () => axios.get("http://localhost:4000/superheroes");

function RCSuperheroesPage() {
  // isLoading, data, isError, error, isFetching
  const { isLoading, data, isError, error } = useQuery<{ data: SuperHero[] }>(
    "super-heroes",
    fetchSuperHeroes,
    {
      staleTime: 30000,
    }
    // {
    //   staleTime: 0,
    //   cacheTime: 5000,
    // }
  );

  if (isLoading) {
    return <h2>loading...</h2>;
  }
  if (isError) {
    return <h2>{(error as Error).message}</h2>;
  }
  return (
    <>
      <h2>Super Heroes Page</h2>
      {data?.data.map((hero: SuperHero) => (
        <div>{hero.name}</div>
      ))}
    </>
  );
}

export default RCSuperheroesPage;
