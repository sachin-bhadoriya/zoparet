import { useLayoutEffect, useRef } from "react";
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

    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef}>
        <div className="logo_main">Zoparet</div>
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