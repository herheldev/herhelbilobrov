const ArrowSvg = ({ ...props }) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_191_1934"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="48"
        height="48"
      >
        <rect
          y="48"
          width="48"
          height="48"
          transform="rotate(-90 0 48)"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_191_1934)">
        <path
          d="M30.0162 23.3883L19.4008 34.0037L17.9854 32.5883L27.1854 23.3883L17.9854 14.1883L19.4008 12.7729L30.0162 23.3883Z"
          fill="#1C1B1F"
        />
      </g>
    </svg>
  );
};

export default ArrowSvg;
