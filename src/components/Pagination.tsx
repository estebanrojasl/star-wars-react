import React from "react";

const Pagination = ({
  currentPage,
  pagesCount,
  paginate,
}: {
  currentPage: number;
  pagesCount: number;
  paginate: (number: number) => void;
}) => {
  return (
    <nav className="flex">
      {currentPage > 1 && (
        <button
          style={{ fontSize: 32 }}
          onClick={() => paginate(currentPage - 1)}
        >
          <b>{`<`}</b>
        </button>
      )}

      <div className="p-4" />

      {currentPage < pagesCount && (
        <button
          style={{ fontSize: 32, width: 50 }}
          onClick={() => paginate(currentPage + 1)}
        >
          <b>{`>`}</b>
        </button>
      )}
    </nav>
  );
};

export default Pagination;
