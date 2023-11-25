import axios from "axios";
import { useQuery } from "react-query";
import { useCutomQuery } from "../hooks/useCustomQuery";

interface SuperHero {
  name: string;
  age: number;
  superpower: string;
}

function RCSuperheroesPage() {
  const onSuccess = (responseData) => {
    console.log(responseData);
  };

  const onError = () => {
    console.log("error");
  };

  const { isLoading, data, isError, error, refetch } = useCutomQuery(
    { url: "http://localhost:4000/superheroes" },
    onSuccess,
    onError,
    "super-heroes"
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
