// eslint-disable-next-line react/prop-types
const TogglePasswordButton = ({ showPassword, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      {showPassword ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.5c-3.104 0-5.7 1.588-7.425 4.082A8.969 8.969 0 015 12c0 1.02.118 2.017.335 2.963A8.95 8.95 0 0112 17.5c3.104 0 5.7-1.588 7.425-4.082A8.969 8.969 0 0019 12c0-1.02-.118-2.017-.335-2.963A8.95 8.95 0 0012 6.5zM12 15a3 3 0 110-6 3 3 0 010 6z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8.5c-2.75 0-5.25 1.391-6.735 3.759A7.964 7.964 0 015 12c0 1.273.295 2.515.825 3.582A7.967 7.967 0 0112 16.5c2.75 0 5.25-1.391 6.735-3.759A7.964 7.964 0 0019 12c0-1.273-.295-2.515-.825-3.582A7.967 7.967 0 0112 8.5zM12 13a1 1 0 100-2 1 1 0 000 2z"
          />
        </svg>
      )}
    </button>
  );
};

export default TogglePasswordButton;
