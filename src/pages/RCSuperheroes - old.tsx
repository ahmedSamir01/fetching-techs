/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useQuery } from "react-query";

interface SuperHero {
  name: string;
  age: number;
  superpower: string;
}

const fetchSuperHeroes = () => axios.get("http://localhost:4000/superheroes");

function RCSuperheroesPage() {
  const onSuccess = (responseData: any) => {
    console.log(responseData);
  };

  const onError = () => {
    console.log("error");
  };
  // isLoading, data, isError, error, isFetching
  const { isLoading, data, isError, error, refetch } = useQuery<{
    data: SuperHero[];
  }>(
    "super-heroes",
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
      <button onClick={refetch}>refetch</button>
    </>
  );
}

export default RCSuperheroesPage;
