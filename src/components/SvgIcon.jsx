/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

const svgFiles = import.meta.glob(
  "../assets/svg/*.svg",
  {
    query: "?react",
    import: "default",
  }
);

const svgSources = import.meta.glob("../assets/svg/*.svg", {
  query: "?raw",
  import: "default",
});

const scaleDimension = (value, factor) =>
  Number.isFinite(Number(value))
    ? Number(value) * factor
    : `calc(${value} * ${factor})`;

const SvgIcon = ({
  name,
  size = 24,
  width,
  height,
  color,
  className = "",
  ...props
}) => {
  const [loaded, setLoaded] = useState(null);

  useEffect(() => {
    let active = true;

    setLoaded(null);

    const loader = svgFiles[`../assets/svg/${name}.svg`];

    if (loader) {
      Promise.all([loader(), svgSources[`../assets/svg/${name}.svg`]()]).then(([Icon, source]) => {
        const svg = new DOMParser().parseFromString(source, "image/svg+xml").documentElement;
        const viewBox = svg.getAttribute("viewBox")?.trim().split(/[\s,]+/).map(Number);
        const nativeWidth = viewBox?.[2] ?? parseFloat(svg.getAttribute("width"));
        const nativeHeight = viewBox?.[3] ?? parseFloat(svg.getAttribute("height"));
        const ratio = nativeWidth > 0 && nativeHeight > 0 ? nativeWidth / nativeHeight : 1;
        if (active) {
          setLoaded({ Icon, ratio });
        }
      });
    } else {
      console.warn(`SVG icon not found: ${name}`);
    }

    return () => {
      active = false;
    };
  }, [name]);

  if (!loaded) return null;

  const { Icon, ratio } = loaded;
  const iconHeight = height ?? (width != null ? scaleDimension(width, 1 / ratio) : size);
  const iconWidth = width ?? scaleDimension(iconHeight, ratio);

  return (
    <Icon
      width={iconWidth}
      height={iconHeight}
      color={color}
      className={`zopa_svg ${className}`}
      {...props}
    />
  );
};

export default SvgIcon;
