"use client"
import { useEffect, useRef, useState } from "react";
import "./VideoSection.scss";

import { useInView } from "react-intersection-observer";
const VideoSection = () => {
    const refVideo = useRef();
    const [clientRewievs, setClientRewievs] = useState(false)
    const {ref, inView} = useInView({
      threshold: 0.2,
    })
    
   
useEffect(()=>{
  setClientRewievs(true)
},[])
  return (
    <section ref={ref} id="video" className="video">
      
      {
          clientRewievs && <div className={`video__media ${inView ? "show-animate": "hide-animate"}`}><script src="https://static.elfsight.com/platform/platform.js" async></script>
        <div className="elfsight-app-4cb682d1-8281-4111-9833-a9f38b408933" data-elfsight-app-lazy></div></div>
        }
    </section>
  );
};

export default VideoSection;
