import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

import { SCENE_IMGS, useIsLoggedIn } from "../components/utils";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import { Film } from "../components/Types";
import Loading from "../components/Loading";

const FILMS_PER_PAGE = 2;

type GetFilmsResponse = {
  data: { results: Film[] };
};

const Films = () => {
  const navigate = useNavigate();
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
    <div className="flex flex-col mx-auto mt-12" style={{ maxWidth: 1200 }}>
      <div className="flex justify-between">
        <h1
          className="text-xl"
          style={{ fontFamily: "'Orbitron', sans-serif", color: "#FFE81F" }}
        >
          Star wars films
        </h1>
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

      {films == null ? (
        <Loading />
      ) : (
        <div className="flex flex-col">
          <div className="flex overflow-hidden min-w-full justify-between">
            {filtered?.map((film) => (
              <Card
                resourceName="films"
                id={film.episode_id}
                img={film.img}
                title={film.title}
                fields={[
                  { Released: film.release_date },
                  { Director: film.director },
                ]}
                relatedResourceTitle="Characters"
                relatedResourcesUrlArray={film.characters}
              />
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

          <div className="p-8" />

          <button
            style={{ fontFamily: "'Orbitron', sans-serif", color: "#FFE81F" }}
            onClick={() => navigate("/", { replace: true })}
          >
            Go back
          </button>
        </div>
      )}
    </div>
  );
};

export default Films;
