const Status = ({ colour, state, range, level }) => (
  <>
    <span className={`bg-${colour}-${level} text-white px-2 rounded-lg`} />
    <span className={`text-${colour}-${range} pl-2`}>{state}</span>
  </>
);

export default Status;
