/* eslint-disable react/prop-types */
const IconNotify = ({
  width = 24,
  height = 24,
  stroke = "currentColor",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    width={width}
    height={height}
    strokeWidth="2"
    strokeLinejoin="round"
    strokeLinecap="round"
    stroke={stroke}
    {...props}
  >
    <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"></path>
    <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>
  </svg>
);

export default IconNotify;
