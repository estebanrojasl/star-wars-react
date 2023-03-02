import React, { useEffect, useState } from "react";

import Scene1 from "../assets/scenes/scene1.png";
import Scene2 from "../assets/scenes/scene2.png";
import Scene3 from "../assets/scenes/scene3.png";
import Scene4 from "../assets/scenes/scene4.png";
import Scene5 from "../assets/scenes/scene5.png";
import Scene6 from "../assets/scenes/scene6.png";

import Char1 from "../assets/chars/c3Po_r2d2.png";
import Char2 from "../assets/chars/darth_maul.png";
import Char3 from "../assets/chars/darth_vader.png";
import Char4 from "../assets/chars/storm_trooper1.png";
import Char5 from "../assets/chars/yoda.png";
import axios from "axios";

export const SCENE_IMGS = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6];
export const CHAR_IMGS = [Char1, Char2, Char3, Char4, Char5];

export function useIsLoggedIn() {
  const loggedIn = localStorage.getItem("loggedIn");
  const [isLogged, setIsLogged] = useState<string | null>(loggedIn);

  useEffect(() => {
    const handleStorage = () => {
      const loggedIn = localStorage.getItem("loggedIn");

      setIsLogged(loggedIn);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return isLogged;
}

export function useAxiosFetch({ url }: { url: string }) {
  const [resource, setResource] = useState();

  useEffect(() => {
    async function getResource() {
      try {
        const { data } = await axios.get(url, {
          headers: {
            Accept: "application/json",
          },
        });

        setResource(data);
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

    getResource();
  }, [url]);

  return { resource };
}
