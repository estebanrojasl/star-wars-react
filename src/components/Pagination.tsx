import React from "react";

// const Pagination = ({
//   perPage,
//   count,
//   paginate,
// }: {
//   perPage: number;
//   count: number;
//   paginate: (number: number) => void;
// }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(count / perPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav>
//       <ul className="flex mr-2">
//         {pageNumbers.map((number) => (
//           <li key={number} className="page-item">
//             <button onClick={() => paginate(number)}>{number}</button>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

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
      {/* hide the whole button if notcurrent page */}
      <button
        style={{ fontSize: 32, width: 50 }}
        onClick={() => paginate(currentPage - 1)}
      >
        {currentPage > 1 && <b>{`<`}</b>}
      </button>

      <div className="p-4" />

      <button
        style={{ fontSize: 32, width: 50 }}
        onClick={() => paginate(currentPage + 1)}
      >
        {currentPage < pagesCount && <b>{`>`}</b>}
      </button>
    </nav>
  );
};

export default Pagination;
