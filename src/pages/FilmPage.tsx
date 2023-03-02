import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { Film } from "../components/Types";
import { CHAR_IMGS, SCENE_IMGS, useAxiosFetch } from "../components/utils";

const FilmPage = () => {
  const { filmId } = useParams();
  const navigate = useNavigate();

  const { resource: film } = useAxiosFetch({
    url: `https://swapi.dev/api/films/${filmId}`,
  }) as { resource: Film | undefined };

  return (
    <>
      {film == null ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="flex">
            <img
              src={CHAR_IMGS[Math.floor(Math.random() * CHAR_IMGS.length)]}
              alt="storm-trooper"
              className="px-8 pt-16"
              style={{ height: 500 }}
            />
            <div className="p-8" />
            <Card
              id={film.episode_id}
              img={SCENE_IMGS[Math.floor(Math.random() * SCENE_IMGS.length)]}
              title={film.title}
              fields={[
                { Released: film.release_date },
                { Producer: film.producer },
                { Director: film.director },
                { "Opening crawl": film.opening_crawl },
              ]}
              relatedResourceTitle="Characters"
              relatedResourcesUrlArray={film.characters}
            />
          </div>
          <div className="p-8" />

          <button
            style={{ fontFamily: "'Orbitron', sans-serif", color: "#FFE81F" }}
            onClick={() => navigate(-1)}
          >
            Go back
          </button>
        </div>
      )}
    </>
  );
};

export default FilmPage;
