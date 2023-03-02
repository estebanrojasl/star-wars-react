export type Film = {
  img?: string;
  title: string;
  episode_id: 4;
  director: string;
  release_date: "string";
  characters: string[];
  opening_crawl: string;
  producer: string;
};

export type Character = {
  img?: string;
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  films: string[];
};
