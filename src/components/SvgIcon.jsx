const svgFiles = import.meta.glob("../assets/svg/*.svg", {
  eager: true,
  query: "?react",
  import: "default",
});

const svgSources = import.meta.glob("../assets/svg/*.svg", {
  eager: true,
  query: "?raw",
  import: "default",
});

const scaleDimension = (value, factor) =>
  Number.isFinite(Number(value))
    ? Number(value) * factor
    : `calc(${value} * ${factor})`;

// Cache SVG aspect ratios instead of parsing on every render
const svgRatios = {};

Object.entries(svgSources).forEach(([path, source]) => {
  const svg = new DOMParser()
    .parseFromString(source, "image/svg+xml")
    .documentElement;

  const viewBox = svg
    .getAttribute("viewBox")
    ?.trim()
    .split(/[\s,]+/)
    .map(Number);

  const nativeWidth = viewBox?.[2] ?? parseFloat(svg.getAttribute("width"));
  const nativeHeight = viewBox?.[3] ?? parseFloat(svg.getAttribute("height"));

  svgRatios[path] =
    nativeWidth > 0 && nativeHeight > 0
      ? nativeWidth / nativeHeight
      : 1;
});

const SvgIcon = ({
  name,
  size = 24,
  width,
  height,
  color,
  className = "",
  ...props
}) => {
  const path = `../assets/svg/${name}.svg`;

  const Icon = svgFiles[path];
  const ratio = svgRatios[path] ?? 1;

  if (!Icon) {
    console.warn(`SVG icon not found: ${name}`);
    return null;
  }

  const iconHeight =
    height ?? (width != null ? scaleDimension(width, 1 / ratio) : size);

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