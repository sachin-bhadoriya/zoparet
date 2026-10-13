import { useLayoutEffect, useRef } from "react";
import SvgIcon from "../components/SvgIcon";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Hero = () => {
  const heroRef = useRef(null);

useLayoutEffect(() => {
  let headerSplit;
  let ctx;
  let cancelled = false;

  document.fonts.ready.then(() => {
    if (cancelled || !heroRef.current) return;

    ctx = gsap.context(() => {
      const heroBg = heroRef.current;

      // Keep the SVG and foreignObject markup unchanged.
      const bottomLines = gsap.utils.toArray(
        ".hero_bottom_left_content .line_inner"
      );

      // Background starts hidden and slightly enlarged.
      gsap.set(heroBg, {
        autoAlpha: 1,
      });

      gsap.set(bottomLines, {
        yPercent: 120,
        autoAlpha: 0,
      });

      // Split only the header text.
      headerSplit = SplitText.create(
        [
          ".hero_top_left .top_tag_line",
          ".hero_top_left .design_ag",
          ".hero_top_right span",
          ".hero_top_right div",
        ],
        {
          type: "lines",
          linesClass: "header_line_mask",
          mask: "lines",
        }
      );

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // 1. Header animation.
      tl.from(headerSplit.lines, {
        yPercent: 110,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.08,
      });

      // 2. Reveal the existing SVG paragraphs.
      tl.to(
        bottomLines,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: "power4.out",
        },
        "-=0.25"
      );

    }, heroRef);
  });

  return () => {
    cancelled = true;
    ctx?.revert();
    headerSplit?.revert();
  };
}, []);

  return (
    <section className="hero_section_container">
      <div
        ref={heroRef}
        className="hero_section_main_container"
        style={{ backgroundImage: `url(/hero_image.jpg)` }}
      >
        <div className="hero_content_container">
          <div className="hero_top_content">
            <div className="hero_top_left">
                <div className="dFlex gap5 alignCenter">
                  <SvgIcon name="half_logo" />
                  <span className="top_tag_line">
                    Innovation Beyond Limits
                  </span>
                </div>
              <div className="design_ag">Design Agency</div>
            </div>
            <div className="hero_top_right">
              <span>Y2K26</span>
              <div className="hero_top_right_main"> Brand </div>
              <div className="hero_top_right_main"> Product </div>
              <div className="hero_top_right_main"> Web </div>
              <div className="hero_top_right_main"> Motion </div>
            </div>
          </div>

          <h1 className="hero_bottom_left_content">
            <svg
              viewBox="0 0 1100 255"
              preserveAspectRatio="xMinYMin meet"
              className="hero_svg"
            >
              <foreignObject x="0" y="0" width="1100" height="255">
                <p className="line_inner">OUR BRANDS</p>
                <p className="line_inner">JUST REFUSE</p>
                <p className="line_inner">TO BLEND IN</p>
              </foreignObject>
            </svg>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;