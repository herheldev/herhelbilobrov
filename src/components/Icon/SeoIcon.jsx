const SeoIcon = ({ ...props }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.01562 22H15.0156C20.0156 22 22.0156 20 22.0156 15V9C22.0156 4 20.0156 2 15.0156 2H9.01562C4.01562 2 2.01562 4 2.01562 9V15C2.01562 20 4.01562 22 9.01562 22Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="iconWhite"
      />
      <path
        d="M7.34558 14.49L9.72558 11.4C10.0656 10.96 10.6956 10.88 11.1356 11.22L12.9656 12.66C13.4056 13 14.0356 12.92 14.3756 12.49L16.6856 9.51001"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="iconBlack"
      />
    </svg>
  );
};

export default SeoIcon;
