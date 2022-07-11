import Pagination from "./Pagination";

export default function ListLayout({
  title,
  headers,
  children,
  type,
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  paginateFront,
  paginateBack,
}) {
  function renderList() {
    return (
      <div className="flex flex-col mt-5">
        <div className="font-bold flex justify-center w-full text-xl">
          <span className="text-black ml-auto mr-auto">{title}</span>
        </div>
        <br />
      {type === 'payments' ? null :
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          paginate={paginate}
          currentPage={currentPage}
          paginateBack={paginateBack}
          paginateFront={paginateFront}
        />
      }
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200 border-b-2 border-gray-300">
                  {type === "payments" ? (
                    <tr>
                      {headers?.map((item, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                        >
                          {item}
                        </th>
                      ))}
                    </tr>
                  ) : (
                    <tr>
                      {headers?.map((item, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-6 py-3 text-left text-l font-bold text-gray-900 uppercase tracking-wider"
                        >
                          {item}
                        </th>
                      ))}
                    </tr>
                  )}
                </thead>
                {children}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{renderList()}</>;
}
