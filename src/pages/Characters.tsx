import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { CHAR_IMGS, useAxiosFetch, useIsLoggedIn } from "../components/utils";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import { Character, Film } from "../components/Types";
import Loading from "../components/Loading";
import qs from "qs";

const CHARS_PER_PAGE = 2;

const Characters = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>();

  const search = qs.parse(location.search, { ignoreQueryPrefix: true }).search;

  const searchString = typeof search === "string" ? search : "";

  const { resource: characters } = useAxiosFetch({
    url: "https://swapi.dev/api/people",
  }) as { resource: { results: Character[] } | undefined };

  const handleSearchChange = (e: any) => {
    setCurrentPage(1);
    e.target.value === ""
      ? navigate({ search: qs.stringify({ search: undefined }) })
      : navigate({ search: qs.stringify({ search: e.target.value }) });
  };

  useEffect(() => {
    const indexOfLast = currentPage * CHARS_PER_PAGE;
    const indexOfFirst = indexOfLast - CHARS_PER_PAGE;
    const withImages = characters?.results.map((character, index) => ({
      ...character,
      img: CHAR_IMGS[index],
    }));

    const filtered = withImages
      ?.filter((character) =>
        character.name.toLowerCase().includes(searchString.toLowerCase())
      )
      .slice(indexOfFirst, indexOfLast);

    setFilteredCharacters(filtered);
  }, [characters?.results, currentPage, searchString]);

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
          Star wars characters
        </h1>

        <input
          type="text"
          className="bg-transparent border rounded border-gray-400 p-1"
          placeholder="E.g. Darth Vader"
          id="search"
          defaultValue={searchString}
          onChange={(e) => handleSearchChange(e)}
        />
      </div>

      <div className="p-8" />

      {characters?.results == null ? (
        <Loading />
      ) : (
        <div className="flex flex-col">
          {(filteredCharacters ?? []).length > 0 ? (
            <div className="flex overflow-hidden min-w-full justify-between">
              {filteredCharacters?.map((character) => (
                <Card
                  key={character.name}
                  resourceName="characters"
                  id={character.name}
                  img={character.img}
                  imgOrientation="vertical"
                  title={character.name}
                  fields={[
                    { Height: character.height },
                    { Mass: character.mass },
                    { "Hair color": character.hair_color },
                    { "Skin color": character.skin_color },
                  ]}
                  relatedResourceTitle="Films"
                  relatedResourceDisplayProp="title"
                  relatedResourcesUrlArray={character.films}
                />
              ))}
            </div>
          ) : (
            <p className="self-center" style={{ minHeight: 300 }}>
              No characters found for this search...
            </p>
          )}

          <div className="p-8" />

          <Pagination
            paginate={paginate}
            currentPage={currentPage}
            pagesCount={characters?.results.length / CHARS_PER_PAGE}
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

export default Characters;
