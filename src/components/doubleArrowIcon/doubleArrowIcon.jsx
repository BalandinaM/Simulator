const DoubleArrowIcon = ({ width = 24, height = 48, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 48"
    fill="none"
  >
    {/* Стрелка вверх */}
    <path
      d="M12 14L12 6M12 6L8 10M12 6L16 10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Стрелка вниз */}
    <path
      d="M12 34L12 42M12 42L8 38M12 42L16 38"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DoubleArrowIcon;
