import React from "react";

const Pagination = ({
  perPage,
  count,
  paginate,
}: {
  perPage: number;
  count: number;
  paginate: (number: number) => void;
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(count / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
