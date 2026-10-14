import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useSmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let destroyScroll;

    const setupScroll = () => {
      destroyScroll?.();
      destroyScroll = undefined;
      if (media.matches) return;

      const lenis = new Lenis({
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        anchors: true,
      });

      // GSAP owns the animation loop; Lenis expects milliseconds.
      const updateScroll = (time) => lenis.raf(time * 1000);
      const resizeScroll = () => lenis.resize();

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(updateScroll);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.addEventListener("refresh", resizeScroll);
      ScrollTrigger.refresh();

      destroyScroll = () => {
        gsap.ticker.remove(updateScroll);
        ScrollTrigger.removeEventListener("refresh", resizeScroll);
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
      };
    };

    setupScroll();
    media.addEventListener("change", setupScroll);

    return () => {
      media.removeEventListener("change", setupScroll);
      destroyScroll?.();
    };
  }, []);
}
