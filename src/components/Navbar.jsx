import { useLayoutEffect, useRef } from "react";
import SvgIcon from "../components/SvgIcon";
import gsap from "gsap";

const Navbar = () => {
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const nav = navRef.current;

    const updateHeaderHeight = () => {
      if (nav) document.body.style.setProperty("--header-height",`${nav.getBoundingClientRect().height}px`);
    };

    updateHeaderHeight();
    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(nav);

    const ctx = gsap.context(() => {
      gsap.from(".nav_links_container li", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0, 
      });

      gsap.from(".logo_main", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0,
      });
    }, navRef);

    return () => {
      ctx.revert();
      resizeObserver.disconnect();
      document.body.style.removeProperty("--header-height");
    };
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