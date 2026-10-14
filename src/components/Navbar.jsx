import { useLayoutEffect, useRef } from "react";
import SvgIcon from "../components/SvgIcon";
import gsap from "gsap";

const Navbar = () => {
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(".nav_links_container li", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0, 
      });

      tl.from(".logo_main", {
        y: -30,
        opacity: 0,
        duration: 0.8,
      }, "+=0.2");
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef}>
        <div className="logo_main"><SvgIcon name="long_logo" className="nav_logo"/></div>
        <ul className="nav_links_container">
            <li><a className="cmn_txt_bg" href="#">Projects</a></li>
            <li><a className="cmn_txt_bg" href="#">About</a></li>
            <li><a className="cmn_txt_bg" href="#">Lab</a></li>
            <li><a className="cmn_txt_bg" href="#">Contact</a></li>
        </ul>
    </nav>
  )
}

export default Navbar