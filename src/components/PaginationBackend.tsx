import React from "react";

const PaginationBE = ({
  loading,
  next,
  prev,
  fetchNext,
  fetchPrev,
}: {
  loading?: boolean;
  next?: string;
  prev?: string;
  fetchNext: () => void;
  fetchPrev: () => void;
}) => {
  return (
    <nav className="flex justify-between">
      {prev != null && (
        <button
          disabled={loading}
          className={`${loading === true ? "animate-ping" : ""}`}
          style={{ fontSize: 18 }}
          onClick={() => {
            fetchPrev();
            window.scrollTo(0, 0);
          }}
        >
          {`< Prev`}
        </button>
      )}

      <div className="p-4" />

      {next != null && (
        <button
          className={`${loading === true ? "animate-ping" : ""}`}
          disabled={loading}
          style={{ fontSize: 18 }}
          onClick={() => {
            fetchNext();
            window.scrollTo(0, 0);
          }}
        >
          {`Next >`}
        </button>
      )}
    </nav>
  );
};

export default PaginationBE;
