import { useLayoutEffect, useRef } from "react";
import { FaCircleRadiation } from "react-icons/fa6";
import gsap from "gsap";

const Hero = () => {
    const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(".hero_bottom_left_content", {
        y: 100,
        opacity: 0,
        duration: 1,
      });

      tl.from(
        ".hero_top_left",
        {
          y: 35,
          opacity: 0,
          duration: 1,
        },
        "+=0.1"
      );

      tl.from(
        ".hero_top_right",
        {
          y: 35,
          opacity: 0,
          duration: 1,
        },
        "+=0.1"
      );

      tl.to(
        ".hero_bg_image",
        // {
        //   scale: 1.25,
        //   opacity: 0,
        // },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
        },
        "+=0.15"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero_section_main_container" style={{backgroundImage: `url(/hero_image.jpg)`}}>
        <div className="hero_content_container">
            <div className="hero_top_content">
                <div className="hero_top_left">
                    <span className="top_tag_line"><FaCircleRadiation />  汉语; 漢語;</span>
                    <div className="design_ag">Design Agency</div>
                </div>
                <div className="hero_top_right">
                    <span>Y2K26</span>
                    <div>Brand <br /> Product <br /> Web <br /> Motion</div>
                </div>
            </div>
            <h1 className="hero_bottom_left_content">
                <span className="playfair_font">OUR BRANDS</span> <br /> <span className="playfair_font">JUST REFUSE</span> <br /> <span className="playfair_font">TO BLEND IN</span>
            </h1>
        </div>
    </section>
  )
}

export default Hero