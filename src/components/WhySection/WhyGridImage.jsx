import { useInView } from "react-intersection-observer";
import skeleton from "./SKELETON.svg";
const WhyGridImage = ({img, className, alt }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
   
  });
  const { ref:ref2, inView:inView2 } = useInView({
    threshold: 0.2,
   triggerOnce: true
  });
  
  return (
    <div
      ref={ref}
      className={`${className} ${inView ? "show-animate" : "hide-animate"}`}
    >
        
        {inView2 ? <img alt={alt} width="100%" height="100%" loading="lazy" src={img}/> : <img ref={ref2} alt={alt} width="100%" height="100%"  loading="lazy" src="/img/SKELETON.svg"/>}
    </div>
  );
};

export default WhyGridImage;
