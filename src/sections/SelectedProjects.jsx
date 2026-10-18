import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight } from "react-icons/fa";

gsap.registerPlugin( ScrollTrigger);

const imageArr = [
  { img: "https://framerusercontent.com/images/yFq1hEIGI4Fa9Ku0ZGzjrQ1hue0.jpg?width=712&height=549", title: "Project One" },
  { img: "https://framerusercontent.com/images/uTMpgfqdqyzGJrPIR55FV0pbqI.jpg?width=894&height=674", title: "Project Two" },
  { img: "https://framerusercontent.com/images/R8Jxht81smjKYyLQuxtF8TzJpzk.jpg?width=596&height=449", title: "Project Three" },
  { img: "https://framerusercontent.com/images/aOq0ruSInv3tVbZ8lHAnEwJOKw.jpg?width=630&height=474", title: "Project Four" },
  { img: "https://framerusercontent.com/images/jvdk89zl6RqytV9HJMdgZRdnM.jpg?width=1058&height=797", title: "Project Five" },
  { img: "https://framerusercontent.com/images/6ymL5FuLDt0uC2MJXYyn3x7CDZs.jpg?width=712&height=547", title: "Project Six" },
];

const SelectedProjects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mm = gsap.matchMedia();
    const contentContainer = sectionRef.current.querySelector('.content_container')
    const projectGridContainer = sectionRef.current.querySelector('.selected_project_grid_image_container')
    const commonTxtBtn = sectionRef.current.querySelector('.common_bottom_text')

    // const tl = gsap.timeline()


    gsap.set(contentContainer,{yPercent: 50, opacity: 0})
    gsap.set(projectGridContainer,{yPercent: 50, opacity: 0, scale: 0,})
    gsap.set(commonTxtBtn,{yPercent: 50, opacity: 0})

    gsap.to(contentContainer, {scrollTrigger: {trigger: contentContainer, start: "top 90%", }, yPercent: 0, opacity: 1, duration: 1.5, })
    gsap.to(projectGridContainer, {scrollTrigger: {trigger: contentContainer, start: "top 80%", }, yPercent: 0, opacity: 1, duration: 1.5, scale: 1, })
    gsap.to(commonTxtBtn, {scrollTrigger: {trigger: commonTxtBtn, start: "top 90%", }, yPercent: 0, opacity: 1, duration: 1, })
    // tl.to(contentPara, { yPercent: 0, opacity: 1, duration: 1,  })

    mm.add("(min-width: 769px)", () => {
      const rows = gsap.utils.toArray(".selected_project_row", section);
      const cards = gsap.utils.toArray(".selected_project_image", section);
      const images = cards.map((card) => card.querySelector("img"));
      const infos = cards.map((card) => card.querySelector(".selected_project_info"));

      gsap.set(rows, { display: "flex", flexGrow: 1 });
      gsap.set(cards, { flex: "1 1 0%", minWidth: 0 });
      gsap.set(images, { scale: 1 });
      gsap.set(infos, { opacity: 0 });

      const ease = "elastic.out(2,1.9)";
      // const ease2 = "elastic.out(1,0.3)";
      // const cardDuration = 1

      const cleanups = cards.map((card) => {
        const row = card.parentElement;
        const rowCards = Array.from(row.children);

        const enter = () => {
          // Width: hovered card grows within its row
          rowCards.forEach((item) => {
            gsap.to(item, {
              flexGrow: item === card ? 1.8 : 1,
              duration: 1,
              ease: "elastic.out(1,0.9)",
              overwrite: "auto",
            });
          });

          // Height: hovered row grows, other rows shrink
          rows.forEach((r) => {
            gsap.to(r, {
              flexGrow: r === row ? 2 : 1,
              duration: 1,
              ease: "elastic.out(1,0.9)",
              overwrite: "auto",
            });
          });

          // Image zoom
          gsap.to(images, { scale: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" });
          gsap.to(card.querySelector("img"), { scale: 1.06, duration: 0.7, ease: "power2.out", overwrite: "auto" });

          // Info: hide all, show hovered
          gsap.to(infos, { opacity: 0, duration: 0.2, overwrite: "auto" });
          gsap.to(card.querySelector(".selected_project_info"), { opacity: 1, duration: 0.3, ease: "power2.out", overwrite: "auto", });
        };

        const leaveRow = () => {
          // Reset widths
          rowCards.forEach((item) =>
            gsap.to(item, { flexGrow: 1, duration: 0.65, ease, overwrite: "auto" })
          );
          // Reset all row heights
          gsap.to(rows, { flexGrow: 1, duration: 0.65, ease: "power3.out", overwrite: "auto" });
          gsap.to(images, { scale: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" });
          gsap.to(infos, { opacity: 0, duration: 0.2, overwrite: "auto" });
        };

        card.addEventListener("mouseenter", enter);
        row.addEventListener("mouseleave", leaveRow);

        return () => {
          card.removeEventListener("mouseenter", enter);
          row.removeEventListener("mouseleave", leaveRow);
        };
      });

      return () => {
        cleanups.forEach((fn) => fn());
        gsap.killTweensOf([...rows, ...cards, ...images, ...infos]);
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
          {[0, 1].map((row) => (
            <div className="selected_project_row" key={row}>
              {imageArr.slice(row * 3, row * 3 + 3).map((project, i) => (
                <div key={row * 3 + i} className="selected_project_image">
                  <img src={project.img} alt={project.title} />
                  <div className="selected_project_info">
                    <h3>{project.title}</h3>
                    <p>Selected Projects</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <a href="#" className="common_bottom_text cmn_txt_bg">More Projects <FaArrowRight /> </a>
      </div>
    </section>
  );
};

export default SelectedProjects;