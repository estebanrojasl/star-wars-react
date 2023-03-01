import React, { useEffect } from "react";
import axios from "axios";
import { useIsLoggedIn } from "../components/utils";
import { Navigate } from "react-router-dom";

type Film = {
  title: string;
  episode_id: 4;
  director: string;
  release_date: "string";
};

type GetFilmsResponse = {
  data: { results: Film[] };
};

const Films = () => {
  const [films, setFilms] = React.useState<Film[]>();

  async function getFilms() {
    try {
      const { data } = (await axios.get("https://swapi.dev/api/films", {
        headers: {
          Accept: "application/json",
        },
      })) as GetFilmsResponse;

      setFilms(data.results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  useEffect(() => {
    getFilms();
  }, []);

  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn === false) {
    return <Navigate replace to="/login?next=films" />;
  }

  return (
    <>
      {films == null ? (
        <h2>Loading</h2>
      ) : (
        <div>
          {films?.map((film) => (
            <div key={film.episode_id}>
              <h1>{film.title}</h1>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Films;
