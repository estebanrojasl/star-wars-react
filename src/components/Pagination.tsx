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
    <nav className="flex justify-between">
      {currentPage > 1 && (
        <button
          style={{ fontSize: 18 }}
          onClick={() => paginate(currentPage - 1)}
        >
          {`< Prev`}
        </button>
      )}

      <div className="p-4" />

      {currentPage < pagesCount && (
        <button
          style={{ fontSize: 18 }}
          onClick={() => paginate(currentPage + 1)}
        >
          {`Next >`}
        </button>
      )}
    </nav>
  );
};

export default Pagination;
