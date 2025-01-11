import { useInView } from "react-intersection-observer";

const LineVerticalBlack = ({ ...props }) => {
  const {ref, inView} = useInView({threshold: 0.1})
  return (
    <svg
      ref={ref}
      className={`${inView ? "show-animate" : ""}`}
      style={{opacity: "0"}}
      width="1"
      height="159"
      viewBox="0 0 1 159"
      fill="none"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="0.5" y1="3.29897e-08" x2="0.49999" y2="159" stroke="black" />
    </svg>
  );
};

export default LineVerticalBlack;
