const SchoolSvg = ({ ...props }) => {
  return (
    <svg
      width="64"
      height="65"
      viewBox="0 0 64 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_240_3520"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="64"
        height="65"
      >
        <rect y="0.5" width="64" height="64" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_240_3520)">
        <path
          d="M32 50.3462L16 41.6487V28.7256L8.20508 24.5L32 11.5769L55.7949 24.5V41.5256H53.1282V25.9974L48 28.7256V41.6487L32 50.3462ZM32 34.3666L50.2154 24.5L32 14.6333L13.7846 24.5L32 34.3666ZM32 47.3051L45.3333 40.1051V30.1923L32 37.4136L18.6667 30.1923V40.1051L32 47.3051Z"
          fill="#A7B4E3"
        />
      </g>
    </svg>
  );
};

export default SchoolSvg;
