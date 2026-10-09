
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(
    ".our_project_index_image_grid"
  );

  const cards = gsap.utils.toArray(
    ".image_project_grid",
    grid
  );

  const images = cards.map((card) =>
    card.querySelector("img")
  );

  const mm = gsap.matchMedia();

  mm.add("(min-width: 769px)", () => {
    // Initial grid layout
    gsap.set(grid, {
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "1fr 1fr",
    });

    // Smooth default image scale
    gsap.set(images, {
      scale: 1,
    });

    cards.forEach((card, index) => {
      const image = images[index];

      card.addEventListener("mouseenter", () => {
        // Expand the hovered column
        const columns = ["1fr", "1fr", "1fr"];
        columns[index % 3] = "2fr";

        // Expand the hovered row
        const rows =
          index < 3
            ? "0.7fr 0.3fr"
            : "0.3fr 0.7fr";

        gsap.to(grid, {
          gridTemplateColumns: columns.join(" "),
          gridTemplateRows: rows,
          duration: 0.65,
          ease: "power3.out",
          overwrite: "auto",
        });

        // Zoom the hovered image
        gsap.to(image, {
          scale: 1.06,
          duration: 0.7,
          ease: "power2.out",
          overwrite: "auto",
        });

        // Reset other images
        images.forEach((otherImage) => {
          if (otherImage !== image) {
            gsap.to(otherImage, {
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        });
      });
    });

    // Restore the original grid when leaving
    grid.addEventListener("mouseleave", () => {
      gsap.to(grid, {
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        duration: 0.65,
        ease: "power3.out",
        overwrite: "auto",
      });

      gsap.to(images, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  });
});