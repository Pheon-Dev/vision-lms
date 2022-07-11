const List = ({ title, note, content }) => (
    <>
      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
        <span className="tracking-wide text-l text-gray-700 font-bold">
          {title}
        </span>
        <span className="tracking-wide text-md ml-2 text-gray-500 font-semibold">
          {note}
        </span>
        <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
          {content}
        </span>
      </li>
    </>
  );

export default List;
