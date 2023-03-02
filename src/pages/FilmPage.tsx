import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { Film } from "../components/Types";
import { CHAR_IMGS, SCENE_IMGS } from "../components/utils";

type GetFilmsResponse = {
  data: Film;
};

const FilmPage = () => {
  const { filmId } = useParams();
  const navigate = useNavigate();

  const [film, setFilm] = useState<Film>();

  useEffect(() => {
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

    getFilm();
  }, [filmId]);

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
