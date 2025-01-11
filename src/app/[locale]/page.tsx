import ChoseSite from "@/components/ChoseSite/ChoseSite";

"use  client"
import Image from "next/image";
import styles from "./page.module.scss";
import Header from "@/components/Header/Header";
import ServiceSection from "@/components/ServiceSection/ServiceSection";
import QuateSection from "@/components/QuateSection/QuateSection";
import VideoSection from "@/components/VideoSection/VideoSection";
import AboutSection from "@/components/AboutSection/AboutSection";
import Footer from "@/components/Footer/Footer";
import MediaSection from "@/components/MediaSection/MediaSection";
import WhySection from "@/components/WhySection/WhySection";
import ContactSection from "@/components/ContactSection/ContactSection";

export default async function Home() {

  
  
  return (
    <>

      <Header />
      <main className={`main`}>
        <ServiceSection />
        <QuateSection />
        <VideoSection/>
        <AboutSection/>
        <MediaSection/>
        <WhySection/>
        <ContactSection/>
      </main>
      <Footer/>
      <ChoseSite/>
      <script src="https://static.elfsight.com/platform/platform.js" async></script>
<div className="elfsight-app-95e8c06e-d148-443e-b0ab-4c08fa88d081" data-elfsight-app-lazy></div>
    </>
  );
}
