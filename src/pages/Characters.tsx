import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import qs from "qs";

import { CHAR_IMGS, useAxiosFetch, useIsLoggedIn } from "../components/utils";
import Card from "../components/Card";
import { Character } from "../components/Types";
import Loading from "../components/Loading";
import PaginationBE from "../components/PaginationBackend";

const Characters = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [url, setUrl] = useState("https://swapi.dev/api/people");

  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>();

  const search = qs.parse(location.search, { ignoreQueryPrefix: true }).search;

  const searchString = typeof search === "string" ? search : "";

  const { resource: characters, loading } = useAxiosFetch({
    url,
  }) as {
    resource:
      | { results: Character[]; count: number; next: string; previous: string }
      | undefined;
    loading?: boolean;
  };

  const handleSearchChange = (e: any) => {
    e.target.value === ""
      ? navigate({ search: qs.stringify({ search: undefined }) })
      : navigate({ search: qs.stringify({ search: e.target.value }) });
  };

  useEffect(() => {
    if (searchString !== "") {
      console.log("searchString", searchString);
      setUrl("https://swapi.dev/api/people?search=" + searchString);
    }

    const withImages = characters?.results.map((character, index) => ({
      ...character,
      img:
        CHAR_IMGS[index] ??
        CHAR_IMGS[Math.floor(Math.random() * CHAR_IMGS.length)],
    }));

    setFilteredCharacters(withImages);
  }, [characters?.results, searchString]);

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
          <PaginationBE
            next={characters?.next}
            fetchNext={() => setUrl(characters?.next)}
            prev={characters?.previous}
            fetchPrev={() => setUrl(characters?.previous)}
            loading={loading}
          />

          <div className="p-8" />

          <div className="grid grid-cols-2 gap-24">
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

          <div className="p-8" />

          <PaginationBE
            next={characters?.next}
            fetchNext={() => setUrl(characters?.next)}
            prev={characters?.previous}
            fetchPrev={() => setUrl(characters?.previous)}
            loading={loading}
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
