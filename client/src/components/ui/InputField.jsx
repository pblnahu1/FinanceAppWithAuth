/* eslint-disable react/prop-types */
import TogglePasswordButton from "./TogglePasswordButton";

// eslint-disable-next-line react/prop-types
const InputField = ({
  type,
  placeholder,
  icon,
  value,
  onChange,
  showPassword,
  handleTogglePassword,
}) => {
  const isPasswordType = type === "password";

  return (
    <label className="flex items-center w-full mb-5 input input-bordered">
      {icon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 mr-2 opacity-70"
        >
          {icon}
        </svg>
      )}
      <input
        type={isPasswordType && showPassword ? "text" : type}
        className="w-auto max-w-full grow"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {isPasswordType && (
        <TogglePasswordButton
          showPassword={showPassword}
          onClick={handleTogglePassword}
        />
      )}
    </label>
  );
};

export default InputField;
