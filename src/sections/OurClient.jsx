import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const COUNT = 6;
const RADIUS = 260;
const AUTO_SPEED = 0.1;   // degrees per frame (~30deg/s)
const DRAG_SENS = 8;    // degrees rotated per pixel dragged
const FRICTION = 0.3;   // closer to 1 = longer free spin after release
const SRC =
  "https://framerusercontent.com/images/0ndH7w2SEWXEtmeKP0sza0Drs.svg?width=371&height=52";

const OurClient = () => {
  const wrapperRef = useRef(null);
  const ringRef = useRef(null);

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    let rot = 0;          // target rotation
    let vel = 0;          // momentum from dragging
    let dragging = false;
    let lastX = 0;

    // smooth follow of the target rotation
    const setRot = gsap.quickTo(ringRef.current, "rotationY", { duration: 0.25, ease: "power2.out",
    });

    const tick = () => {
      const dt = gsap.ticker.deltaRatio(); // 1 at 60fps
      if (!dragging) {
        vel *= Math.pow(FRICTION, dt);      // momentum fades out slowly
        rot += (AUTO_SPEED + vel) * dt;     // auto spin + leftover momentum
      }
      setRot(rot);
    };
    gsap.ticker.add(tick);

    const onDown = (e) => {
      dragging = true;
      lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
      el.classList.add("is_dragging");
    };

    const onMove = (e) => {
      if (!dragging) return;
      const dx = (e.clientX - lastX) * DRAG_SENS;
      lastX = e.clientX;
      rot += dx;
      vel = dx;
    };

    const onUp = (e) => {
      dragging = false;
      el.classList.remove("is_dragging");
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    return () => {
      gsap.ticker.remove(tick);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <section className="our_client_home">
      <div className="container">
        <div className="content_container">
          <h2 className="common_heading dark">OUR CLIENTS</h2>
          <p className="common_para dark">
            BRANDS THAT NEVER SETTLED FOR GOOD ENOUGH.
          </p>
        </div>

        <div className="client_logo_slider_wrapper" ref={wrapperRef}>
          <div className="client_logo_slider_container" ref={ringRef}>
            {Array.from({ length: COUNT }).map((_, i) => (
              <div
                key={i}
                className="client_logo_container"
                style={{
                  transform: `translate(-50%, -50%) rotateY(${
                    (360 / COUNT) * i
                  }deg) translateZ(${RADIUS}px)`,
                }}
              >
                <img src={SRC} alt="" draggable="false" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurClient;