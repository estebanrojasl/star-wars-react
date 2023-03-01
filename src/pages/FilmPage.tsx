import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// reuse the Film type from src\pages\Films.tsx
type Film = {
  title: string;
  episode_id: 4;
  director: string;
  release_date: "string";
};

type GetFilmsResponse = {
  data: Film;
};

const FilmPage = () => {
  const { filmId } = useParams();

  const [film, setFilm] = useState<Film>();

  async function getFilm() {
    try {
      const { data } = (await axios.get(
        `https://swapi.dev/api/films/${filmId}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      )) as GetFilmsResponse;

      setFilm(data);
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
    getFilm();
  }, []);

  return (
    <>
      <h2>{film?.title}</h2>
      <h2>{film?.episode_id}</h2>
      <h2>{film?.director}</h2>
      <h2>{film?.release_date}</h2>
    </>
  );
};

export default FilmPage;
