import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useIsLoggedIn } from "../components/utils";

import Scene1 from "../assets/scenes/scene1.png";
import Scene2 from "../assets/scenes/scene2.png";
import Scene3 from "../assets/scenes/scene3.png";
import Scene4 from "../assets/scenes/scene4.png";
import Scene5 from "../assets/scenes/scene5.png";
import Scene6 from "../assets/scenes/scene6.png";
import Pagination from "../components/Pagination";

const SCENE_IMGS = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6];

const FILMS_PER_PAGE = 2;

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
  const [films, setFilms] = useState<Film[]>();
  const [currentPage, setCurrentPage] = useState(1);

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

  if (isLoggedIn !== "true") {
    return <Navigate replace to="/login?next=films" />;
  }

  const indexOfLast = currentPage * FILMS_PER_PAGE;
  const indexOfFirst = indexOfLast - FILMS_PER_PAGE;

  const withImages = films?.map((film, index) => ({
    ...film,
    img: SCENE_IMGS[index],
  }));

  const current = withImages?.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex mx-auto" style={{ maxWidth: 1200 }}>
      {films == null ? (
        <h2>Loading</h2>
      ) : (
        <>
          <div className="flex overflow-hidden min-w-full">
            {current?.map((film) => (
              <div key={film.episode_id} className="mr-32">
                <img
                  src={film.img}
                  alt="film.episode_id"
                  style={{ width: 800, maxWidth: 1000 }}
                />
                <h1>{film.title}</h1>
              </div>
            ))}
          </div>

          <Pagination
            perPage={FILMS_PER_PAGE}
            count={films.length}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default Films;
