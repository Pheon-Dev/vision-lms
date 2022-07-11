const Label = ({ label, item, valid }) =>
  !item && valid ? (
    <>
      <label className="block tracking-wide text-xs mb-2">
        <>
          <span className="uppercase text-red-700 font-bold text-lg">
            {label}
          </span>
          <span className="text-red-500 italic"> is required *</span>
        </>
      </label>
    </>
  ) : (
    <>
      <label className="block tracking-wide text-xs mb-2">
        <>
          <span className="uppercase text-gray-700 font-bold text-md">
            {label}
          </span>
          <span className="text-red-500 italic">*</span>
        </>
      </label>
    </>
  );

export default Label;
