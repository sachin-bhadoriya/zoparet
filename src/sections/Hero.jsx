import { useLayoutEffect, useRef } from "react";
import HolesPlate from "../components/HolesPlate";
import MouseTextFollower from "../components/MouseTextFollower";
import SvgIcon from "../components/SvgIcon";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Hero = () => {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
      const ctx = gsap.context(() => {

        const bgImage = heroRef.current.querySelector(".holes_plate>img");
        const webCanvas = heroRef.current.querySelector(".holes_plate>canvas");
        const leftTagine = heroRef.current.querySelectorAll(".left_tag_line");

        const plusIcon = heroRef.current.querySelector(".right_abs_box>.zopa_svg");
        const desLine = heroRef.current.querySelector(".right_abs_box>.des_line");
        const heroTopRightSpan = heroRef.current.querySelector(".hero_top_right_span span");
        const heroTopRightMain = heroRef.current.querySelectorAll(".hero_top_right_main");
        const lineInner = heroRef.current.querySelectorAll(".line_inner span");
        const mouseTextFollower = heroRef.current.querySelectorAll(".mouse_text_follower");

        gsap.set(bgImage, {opacity: 0, scale: 1.2});
        gsap.set(webCanvas, {opacity: 0});
        gsap.set(leftTagine, {opacity: 0, y: 20});
        gsap.set(plusIcon, {y: -20, scale: 0.85});
        gsap.set(desLine, {scaleY: 0, transformOrigin: "top"});
        gsap.set(heroTopRightSpan, {yPercent: 100});
        gsap.set(heroTopRightMain, {opacity:0, y: -30});
        gsap.set(lineInner, {yPercent: 80, opacity: 0});
        gsap.set(mouseTextFollower, {opacity: 0});

        const tl = gsap.timeline();

        tl.to(plusIcon, { y:0 });
        tl.to(leftTagine, { y:0, opacity:1, stagger:0.3});
        tl.to(bgImage, { opacity:1, scale:1, delay:-0.3, ease: "power4.out", duration: 2.1 });
        tl.to(lineInner, { yPercent:0, opacity:1, stagger:0.2, ease: "power4.inOut", duration: 1.4, delay: -2});
        tl.to(desLine, { scaleY:1, ease: "power4.inOut", duration: 1.4, delay: -2});
        tl.to(desLine, { scaleY:1, ease: "power4.inOut", duration: 1.4, delay: -2});
        tl.to(heroTopRightSpan, { yPercent:1, ease: "power4.inOut", duration: 1.4, delay: -2});
        tl.to(heroTopRightMain, { opacity:1, y:0, stagger:0.13, ease: "power3.inOut", duration: 1.3, delay: -1.5});
        tl.to(webCanvas, { opacity:1, ease: "power3.inOut", delay: -1.5});
        tl.to(mouseTextFollower, { opacity:1, ease: "power3.inOut", delay: -1.5});

      }, heroRef);

      return () => ctx.revert();
    }, []);

  return (
    <section className="hero_section_container">
      <div ref={heroRef} className="hero_section_main_container">
        <HolesPlate />
        <MouseTextFollower />
        <div className="hero_content_container">
          <div className="hero_top_content">
            <div className="hero_top_left">
                <div className="hero_tag_line_container left_tag_line">
                  <SvgIcon name="banner_blink" className="banner_blink" />
                  <span className="top_tag_line">
                    Innovation Beyond Limits
                  </span>
                </div>
              <div className="design_ag left_tag_line">Design Agency</div>
            </div>
            <div className="hero_top_right">
              <span className="hero_top_right_span"><span>Y2K26</span></span>
              <div className="hero_top_right_main"> Brand </div>
              <div className="hero_top_right_main"> Product </div>
              <div className="hero_top_right_main"> Web </div>
              <div className="hero_top_right_main"> Motion </div>
              <div className="right_abs_box"><SvgIcon name="plus" /> <span className="des_line"></span></div>
            </div>
          </div>

          <h1 className="hero_bottom_left_content">
            <svg
              viewBox="0 0 1100 264"
              preserveAspectRatio="xMinYMin meet"
              className="hero_svg"
            >
              <foreignObject x="0" y="0" width="1100" height="264">
                <p className="line_inner"><span>OUR BRANDS</span></p>
                <p className="line_inner"><span>JUST REFUSE</span></p>
                <p className="line_inner"><span>TO BLEND IN</span></p>
              </foreignObject>
            </svg>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
