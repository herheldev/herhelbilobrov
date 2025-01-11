const HomeSvg = ({ ...props }) => {
  return (
    <svg
      width="48"
      height="48"
      {...props}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_64_591"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="48"
        height="48"
      >
        <rect width="48" height="48" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_64_591)">
        <path
          d="M12 37.9998H19.3846V26.2306H28.6154V37.9998H36V19.9998L24 10.9229L12 19.9998V37.9998ZM10 39.9998V18.9998L24 8.42285L38 18.9998V39.9998H26.6154V28.2306H21.3846V39.9998H10Z"
          fill="#FFFAEE"
        />
      </g>
    </svg>
  );
};

export default HomeSvg;
