import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { SCENE_IMGS, useAxiosFetch, useIsLoggedIn } from "../components/utils";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import { Film } from "../components/Types";
import Loading from "../components/Loading";
import qs from "qs";

const FILMS_PER_PAGE = 2;

const Films = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredFilms, setFilteredFilms] = useState<Film[]>();

  const search = qs.parse(location.search, { ignoreQueryPrefix: true }).search;

  const searchString = typeof search === "string" ? search : "";

  const { resource } = useAxiosFetch({
    url: "https://swapi.dev/api/films",
  }) as { resource: { results: Film[] } | undefined };

  const handleSearchChange = (e: any) => {
    setCurrentPage(1);
    e.target.value === ""
      ? navigate({ search: qs.stringify({ search: undefined }) })
      : navigate({ search: qs.stringify({ search: e.target.value }) });
  };

  useEffect(() => {
    const indexOfLast = currentPage * FILMS_PER_PAGE;
    const indexOfFirst = indexOfLast - FILMS_PER_PAGE;
    const withImages = resource?.results?.map((film, index) => ({
      ...film,
      img: SCENE_IMGS[index],
    }));

    const filtered = withImages
      ?.filter((film) =>
        film.title.toLowerCase().includes(searchString.toLowerCase())
      )
      .slice(indexOfFirst, indexOfLast);

    setFilteredFilms(filtered);
  }, [currentPage, resource?.results, searchString]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn !== "true") {
    return <Navigate replace to="/login?next=films" />;
  }

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
          defaultValue={searchString}
          onChange={(e) => handleSearchChange(e)}
        />
      </div>

      <div className="p-4" />

      {resource?.results == null ? (
        <Loading />
      ) : (
        <div className="flex flex-col">
          {(filteredFilms ?? []).length > 0 ? (
            <div className="flex overflow-hidden min-w-full justify-between">
              {filteredFilms?.map((film) => (
                <Card
                  key={film.episode_id}
                  resourceName="films"
                  id={film.episode_id}
                  img={film.img}
                  title={film.title}
                  fields={[
                    { Released: film.release_date },
                    { Director: film.director },
                  ]}
                  relatedResourceTitle="Characters"
                  relatedResourceDisplayProp="name"
                  relatedResourcesUrlArray={film.characters}
                />
              ))}
            </div>
          ) : (
            <p className="self-center" style={{ minHeight: 300 }}>
              No films found for this search...
            </p>
          )}

          <div className="p-8" />

          <Pagination
            paginate={paginate}
            currentPage={currentPage}
            pagesCount={resource?.results.length / FILMS_PER_PAGE}
          />

          <div className="p-4" />

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
