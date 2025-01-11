const PrevSvg = ({ ...props }) => {
  return (
    <svg
      width="130"
      height="131"
      viewBox="0 0 130 131"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="-0.5"
        y="0.5"
        width="129"
        height="129"
        rx="64.5"
        transform="matrix(-1 0 0 1 129 0.5)"
        stroke="#333333"
      />
      <path
        d="M60.2903 65.5249L72.5811 53.1845L71.1453 51.7488L57.4188 65.5249L71.1453 79.2514L72.5811 77.8156L60.2903 65.5249Z"
        fill="#333333"
      />
    </svg>
  );
};

export default PrevSvg;
