import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function Pagination({
  itemsPerPage,
  paginateFront,
  paginateBack,
  totalItems,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const listClass = "bg-blue rounded-lg border-blue-300 text-blue-500 hover:bg-blue-200 cursor-pointer inline-flex items-center px-3 py-2 border text-sm font-bold"
  const listClassEnd = "bg-gray-300 rounded-lg text-gray-400 inline-flex items-center px-3 py-2 text-sm font-medium"

  return (
    <div className="flex justify-center items-center ml-auto mr-auto p-2">
      <div className="ml-auto mr-auto">
      <nav className="ml-auto">
        <ul className="flex pl-0 rounded list-none flex-wrap">
          {currentPage === 1 ?
            (
            <li
              className={listClassEnd}
            >
              <IoIosArrowBack className="h-5 w-5" />
            </li>
          )
            : (
            <li
              onClick={() => {
                paginateBack();
              }}
              className={listClass}
            >
              <IoIosArrowBack className="h-5 w-5" />
            </li>
          )}
          {pageNumbers.map((number, index) => (
            <li
            key={index}
              onClick={() => {
                paginate(number);
              }}
              className={
                currentPage === number
                  ? "bg-blue-100 select-none cursor-pointer rounded-lg border-blue-400 text-blue-800 hover:bg-blue-200 inline-flex items-center px-4 py-2 border text-sm font-bold"
                  : "bg-white select-none cursor-pointer rounded-lg border-gray-300 text-gray-500 hover:bg-blue-200 inline-flex items-center px-4 py-2 border text-sm font-bold"
              }
            >
              {number}
            </li>
          ))}
          {currentPage === pageNumbers.length ?
            (
            <li
              className={listClassEnd}
            >
              <IoIosArrowForward className="h-5 w-5" />
            </li>
          )
              : (
            <li
              onClick={() => {
                paginateFront();
              }}
              className={listClass}
            >
              <IoIosArrowForward className="h-5 w-5" />
            </li>
          )}
        </ul>
      </nav>
      </div>
        <p className="text-sm ml-2 select-none text-gray-500">
          <span className="font-medium">
            {" "}
            {currentPage * itemsPerPage - itemsPerPage}{" "}
          </span>
          to
          <span className="font-medium"> {currentPage * itemsPerPage} </span>
          of
          <span className="font-medium"> {totalItems} </span>
        </p>
    </div>
  );
}
