import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAxiosFetch } from "./utils";

interface Field {
  [k: string]: string;
}

type Fields = Field[];

type ResourceType = Record<string, string | number>;

const Character = ({ url }: { url: string }) => {
  const { resource } = useAxiosFetch({
    url,
  }) as { resource: ResourceType | undefined };

  return resource == null ? (
    <span className="px-6 h-1 mr-2 rounded animate-pulse bg-slate-700" />
  ) : (
    <Link to={`/`}>
      <small>{resource?.name}, </small>
    </Link>
  );
};

const RESOURCE_LIST_LIMIT = 5;

const Card = ({
  id,
  resourceName,
  img,
  title,
  fields,
  relatedResourceTitle,
  relatedResourcesUrlArray,
}: {
  id: number;
  resourceName?: string;
  img?: string;
  title: string;
  fields: Fields;
  relatedResourceTitle?: string;
  relatedResourcesUrlArray?: string[];
}) => {
  const [showMoreResources, setShowMoreResources] = useState(false);

  const isLongList =
    relatedResourcesUrlArray != null
      ? relatedResourcesUrlArray.length > RESOURCE_LIST_LIMIT - 1
      : false;

  const resourcesToDisplay =
    isLongList && showMoreResources === false
      ? relatedResourcesUrlArray?.slice(0, RESOURCE_LIST_LIMIT)
      : relatedResourcesUrlArray;

  return (
    <div className="flex flex-col overflow-hidden" style={{ maxWidth: 550 }}>
      <Link
        className={`${resourceName == null ? "pointer-events-none" : null}`}
        to={`/${resourceName}/${id}`}
        key={id}
      >
        <img
          src={img}
          className="rounded"
          loading="lazy"
          alt="img"
          style={{ width: 550 }}
        />
        <div className="p-2" />
        <h1>{title}</h1>
        {fields.map((field) => (
          <p key={Object.keys(field)[0]}>
            <small className="text-slate-400">{Object.keys(field)[0]}: </small>
            <small>{field[Object.keys(field)[0]]}</small>
          </p>
        ))}
      </Link>

      <p>
        <small className="text-slate-400">{relatedResourceTitle}: </small>

        {resourcesToDisplay?.map((url) => (
          <Character key={url} url={url} />
        ))}

        {isLongList && showMoreResources === false && (
          <button onClick={() => setShowMoreResources(true)}>...</button>
        )}
      </p>
    </div>
  );
};

export default Card;
