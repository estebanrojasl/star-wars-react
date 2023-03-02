import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
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
  const [search, setSearch] = useState("");

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

  const filtered = current?.filter((film) => {
    return film.title.toLowerCase().includes(search.toLowerCase());
  });

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex mx-auto mt-12" style={{ maxWidth: 1200 }}>
      {films == null ? (
        <h2>Loading</h2>
      ) : (
        <div className="flex flex-col">
          <div className="flex justify-between">
            <h1 className="text-xl">Star wars films</h1>
            <input
              type="text"
              className="bg-transparent border rounded border-gray-400 p-1"
              placeholder="E.g. Phantom menace"
              id="search"
              defaultValue={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="p-4" />

          <div className="flex overflow-hidden min-w-full gap-24">
            {filtered?.map((film) => (
              <Link to={`/films/${film.episode_id}`} key={film.episode_id}>
                <img
                  src={film.img}
                  className="rounded"
                  loading="lazy"
                  alt="film.episode_id"
                  style={{ width: 500, maxWidth: 1000 }}
                />
                <div className="p-2" />
                <h1>{film.title}</h1>
              </Link>
            ))}
          </div>

          <div className="p-4" />

          <div className="self-center">
            <Pagination
              paginate={paginate}
              currentPage={currentPage}
              pagesCount={films.length / FILMS_PER_PAGE}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Films;
