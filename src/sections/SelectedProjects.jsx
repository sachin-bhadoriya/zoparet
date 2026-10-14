import { useEffect, useRef } from "react";
import gsap from "gsap";

const imageArr = [
  { img: "/holes-plate/bg_image.png", title: "Project One" },
  { img: "/holes-plate/bg_image.png", title: "Project Two" },
  { img: "/holes-plate/bg_image.png", title: "Project Three" },
  { img: "/holes-plate/bg_image.png", title: "Project Four" },
  { img: "/holes-plate/bg_image.png", title: "Project Five" },
  { img: "/holes-plate/bg_image.png", title: "Project Six" }
];

const SelectedProjects = () => {

  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const rows = gsap.utils.toArray(".selected_project_row", section);
      const cards = gsap.utils.toArray(".selected_project_image", section);

      const images = cards.map(card => card.querySelector("img"));
      const imageInfo = cards.map(card => card.querySelector(".selected_project_info"));

      gsap.set(rows, { display: "flex" });
      gsap.set(cards, { flex: "1 1 0%", minWidth: 0 });
      gsap.set(images, { scale: 1 });
      gsap.set(imageInfo, {opacity: 0,})

      const handlers = cards.map(card => {
        const row = card.parentElement;
        const rowCards = Array.from(row.children);
        const image = card.querySelector("img");
        
        const enter = () => {
          rowCards.forEach(item => {
            gsap.to(item, {
              flexGrow: item === card ? 2 : 1,
              duration: 0.65,
              ease: "elastic.out(0.5,0.3)",
              overwrite: "auto"
            });
          });

          gsap.to(rowCards.map(item => item.querySelector("img")), {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto"
          });

          gsap.to(image, {
            scale: 1.06,
            duration: 0.7,
            ease: "power2.out",
            overwrite: "auto"
          });

          // Hide all info elements in the current row
          gsap.to(rowCards.map(item =>
            item.querySelector(".selected_project_info")
          ), {
            opacity: 0,
            duration: 0.2,
            overwrite: "auto"
          });

          // Show only the hovered card's info
          gsap.to(card.querySelector(".selected_project_info"), {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto"
          });
        };
        const leave = () => {
          rowCards.forEach(item => gsap.to(item, { flexGrow: 1, duration: .65, ease: "elastic.out(0.5,0.3)", overwrite: "auto" }));
          gsap.to(rowCards.map(item => item.querySelector("img")), { scale: 1, duration: .5, ease: "power2.out", overwrite: "auto" });
          imageInfo.forEach(item => gsap.to(item, { opacity: 0, }));
        };
        card.addEventListener("mouseenter", enter);
        row.addEventListener("mouseleave", leave);
        return () => {
          card.removeEventListener("mouseenter", enter);
          row.removeEventListener("mouseleave", leave);
        };
      });
      return () => {
        handlers.forEach(cleanup => cleanup());
        gsap.killTweensOf([...cards, ...images]);
      };
    });
    mm.add("(max-width: 768px)", () => {
      const rows = gsap.utils.toArray(".selected_project_row", section);
      gsap.set(rows, { display: "flex" });
      gsap.set(gsap.utils.toArray(".selected_project_image", section), { flex: "1 1 0%" });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="selected_projects_section" ref={sectionRef}>
      <div className="container">
        <div className="content_container">
          <h2 className="common_heading">SELECTED PROJECTS</h2>
          <p className="common_para">A curated selection of narrative-driven client work.</p>
        </div>
        <div className="selected_project_grid_image_container">
          {[0,1].map(row=>
            <div className="selected_project_row" key={row}>{imageArr.slice(row*3,row*3+3).map((project,i)=>
              <div key={row*3+i} className="selected_project_image">
                <img src={project.img} alt={project.title}/>
                <div className="selected_project_info">
                  <h3>{project.title}</h3>
                  <p>Selected Projects</p>
                </div>
              </div>)}
            </div>
          )}
        </div>
        <a href="" className="common_bottom_text cmn_txt_bg">MORE PROJECTS</a>
      </div>
    </section>
  )
};
export default SelectedProjects;