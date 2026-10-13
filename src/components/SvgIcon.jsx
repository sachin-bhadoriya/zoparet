/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

const svgFiles = import.meta.glob(
  "../assets/svg/*.svg",
  {
    query: "?react",
    import: "default",
  }
);

const SvgIcon = ({
  name,
  size = 24,
  width,
  height,
  color,
  className = "",
  ...props
}) => {
  const [Icon, setIcon] = useState(null);

  useEffect(() => {
    let active = true;

    setIcon(null);

    const loader = svgFiles[`../assets/svg/${name}.svg`];

    if (loader) {
      loader().then((module) => {
        if (active) {
          setIcon(() => module);
        }
      });
    } else {
      console.warn(`SVG icon not found: ${name}`);
    }

    return () => {
      active = false;
    };
  }, [name]);

  if (!Icon) return null;

  return (
    <Icon
      width={width ?? size}
      height={height ?? size}
      color={color}
      className={className}
      {...props}
    />
  );
};

export default SvgIcon;