import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import "./MouseTextFollower.scss";

gsap.registerPlugin(ScrambleTextPlugin);

const DEFAULT_WORDS = ["Brand", "Product", "Web", "Motion"];

const MouseTextFollower = ({
  words = DEFAULT_WORDS,
  followEase = 0.1,
  changeDistance = 40,
  scrambleDuration = 0.45,
  offsetX = -20,
  offsetY = -40,
  fontSize = 18,
  color = "#ffffff",
  background = "transparent",
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const labels = words.map((w) => w.toUpperCase()).filter((word) => typeof word === "string" && word.length);
    if (!labels.length) return;

    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.1, 10);
    camera.position.z = 1;

    // ScrambleText animates this detached element; redraw its text into one
    // reusable texture instead of allocating GPU resources during movement.
    const textTarget = document.createElement("span");
    textTarget.textContent = labels[0];
    const surface = document.createElement("canvas");
    const context = surface.getContext("2d");
    const font = `300 ${fontSize}px Arial, sans-serif`;
    context.font = font;
    const maxLength = Math.max(...labels.map((label) => Array.from(label).length));
    const label = {
      width: Math.ceil(Math.max(
        ...labels.map((text) => context.measureText(text).width),
        context.measureText("W".repeat(maxLength)).width,
      ) + 36),
      height: Math.ceil(fontSize + 26),
    };
    surface.width = label.width * 2;
    surface.height = label.height * 2;
    context.scale(2, 2);
    const texture = new THREE.CanvasTexture(surface);
    texture.colorSpace = THREE.SRGBColorSpace;
    let lastText;
    const drawText = () => {
      const text = textTarget.textContent;
      if (text === lastText) return;
      lastText = text;
      context.clearRect(0, 0, label.width, label.height);
      context.font = font;
      const textWidth = Math.min(label.width, context.measureText(text).width + 36);
      context.fillStyle = background;
      context.beginPath();
      context.roundRect((label.width - textWidth) / 2, 0, textWidth, label.height, label.height / 2);
      context.fill();
      context.fillStyle = color;
      context.textAlign = "left";
      context.textBaseline = "middle";
      context.fillText(text, 18, label.height / 2 + 1);
      texture.needsUpdate = true;
    };
    drawText();
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0,
      depthTest: false,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.center.set(0, 1);
    scene.add(sprite);

    const current = new THREE.Vector2();
    const target = new THREE.Vector2();
    const previous = new THREE.Vector2();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1;
    let height = 1;
    let index = 0;
    let distance = 0;
    let scrambleTween;
    let active = false;
    let frame;
    let lastTime = performance.now();

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      renderer.setSize(width, height, false);
      camera.right = width;
      camera.top = height;
      camera.updateProjectionMatrix();
    };

    const move = (event) => {
      if (event.pointerType === "touch") return;
      const bounds = container.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      if (active) {
        distance += Math.hypot(x - previous.x, y - previous.y);
        const threshold = Math.max(1, changeDistance);
        if (distance >= threshold) {
          const nextIndex = (index + Math.floor(distance / threshold)) % labels.length;
          distance %= threshold;
          if (nextIndex !== index) {
            index = nextIndex;
            scrambleTween?.kill();
            if (reducedMotion.matches || scrambleDuration <= 0) {
              textTarget.textContent = labels[index];
              drawText();
            } else {
              scrambleTween = gsap.to(textTarget, {
                duration: scrambleDuration,
                scrambleText: { text: labels[index], chars: "upperCase", speed: 0.7 },
                ease: "none",
                onUpdate: drawText,
              });
            }
          }
        }
      }
      previous.set(x, y);
      target.set(
        THREE.MathUtils.clamp(x + offsetX, 0, Math.max(0, width - label.width)),
        THREE.MathUtils.clamp(y + offsetY, 0, Math.max(0, height - label.height)),
      );
      if (!active) current.copy(target);
      active = true;
    };
    const leave = () => {
      active = false;
      distance = 0;
    };

    const animate = (time) => {
      const elapsed = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      // Normalize lerp to 60 Hz so the trail feels consistent across displays.
      const alpha = reducedMotion.matches ? 1 : 1 - Math.pow(1 - THREE.MathUtils.clamp(followEase, 0.001, 1), elapsed * 60);
      current.lerp(target, alpha);
      sprite.position.set(current.x, height - current.y, 0);
      sprite.scale.set(label.width, label.height, 1);
      material.opacity = THREE.MathUtils.lerp(material.opacity, active ? 1 : 0, reducedMotion.matches ? 1 : 1 - Math.exp(-16 * elapsed));
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    container.addEventListener("pointerenter", move);
    container.addEventListener("pointermove", move);
    container.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    window.addEventListener("scroll", leave, true);
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      container.removeEventListener("pointerenter", move);
      container.removeEventListener("pointermove", move);
      container.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
      window.removeEventListener("scroll", leave, true);
      scrambleTween?.kill();
      texture.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [words, followEase, changeDistance, scrambleDuration, offsetX, offsetY, fontSize, color, background]);

  return <canvas ref={canvasRef} className="mouse_text_follower" aria-hidden="true" />;
};

export default MouseTextFollower;
