/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useCustomQuery } from "../hooks/useSuperHeroesData";

interface SuperHero {
  name: string;
  id: number;
  alterEgo: string;
}

function RCSuperheroesPage() {
  const onSuccess = (responseData: any) => {
    console.log(responseData);
  };

  const onError = () => {
    console.log("error");
  };

  const { isLoading, data, isError, error, refetch } = useCustomQuery(
    onSuccess,
    onError
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
      {data?.data?.map((hero: SuperHero) => (
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>
            {hero.id} {hero.name}
          </Link>
        </div>
      ))}
      <button onClick={refetch}>refetch</button>
    </>
  );
}

export default RCSuperheroesPage;
