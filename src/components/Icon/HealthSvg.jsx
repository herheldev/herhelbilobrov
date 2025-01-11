const HealthSvg = ({ ...props }) => {
  return (
    <svg
      width="64"
      height="65"
      viewBox="0 0 64 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      
    >
      <mask
        id="mask0_240_3511"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="64"
        height="65"
      >
        <rect
          y="0.5"
          width="64"
          height="64"
          fill="#F9B577"
          fillOpacity="0.6"
        />
      </mask>
      <g mask="url(#mask0_240_3511)">
        <path
          d="M29.3333 44.5H34.6666V37.8333H41.3333V32.5H34.6666V25.8333H29.3333V32.5H22.6666V37.8333H29.3333V44.5ZM13.3333 53.8333V25.8333L31.9999 11.782L50.6666 25.8333V53.8333H13.3333ZM15.9999 51.1666H47.9999V27.1666L31.9999 15.1667L15.9999 27.1666V51.1666Z"
          fill="#F9B577"
        />
      </g>
    </svg>
  );
};

export default HealthSvg;
