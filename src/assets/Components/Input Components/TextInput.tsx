import React from "react";

interface inputParameters {
  id: string;
  label: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error: string | undefined;
  width: string;
  touched: boolean | undefined;
}
const TextInput = ({
  id,
  label,
  onBlur,
  onChange,
  value,
  error,
  width,
  touched,
  ...props
}: inputParameters) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-gray-800 text-[Montserrat] font-semibold mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        className={`border ${width} border-gray-300 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:border-[#003F8F] transition duration-500 ${
          error && touched ? "border-red-500" : ""
        }`}
        {...props}
      />
      {error && touched ? (
        <div className="text-red-500 ml-3 text-[13px]">{error}</div>
      ) : null}
    </div>
  );
};

export default TextInput;
