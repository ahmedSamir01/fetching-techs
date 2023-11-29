/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";
import { useState } from "react";

export interface SuperHero {
  name: string;
  id: number;
  alterEgo: string;
}

function RCSuperheroesPage() {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
  const onSuccess = (responseData: any) => {
    console.log(responseData);
  };

  const onError = () => {
    console.log("error");
  };

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData(
    onSuccess,
    onError
  );

  const { mutate: addHero } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    addHero(hero);
  };

  if (isLoading) {
    return <h2>loading...</h2>;
  }
  if (isError) {
    return <h2>{(error as Error).message}</h2>;
  }
  return (
    <>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
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
