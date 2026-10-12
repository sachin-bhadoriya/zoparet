import { FaCircleRadiation } from "react-icons/fa6";

const Hero = () => {
  return (
    <section className="hero_section_main_container" style={{backgroundImage: `url(/hero_image.png)`}}>
        <div className="hero_content_container">
            <div className="hero_top_content">
                <div className="hero_top_left">
                    <span className="top_tag_line"><FaCircleRadiation />  汉语; 漢語;</span>
                    <div className="design_ag">Design Agency</div>
                </div>
                <div className="hero_top_right">
                    <span>Y2K26</span>
                    <div>Brand <br /> Product <br /> Web <br /> Motion</div>
                </div>
            </div>
            <h1 className="hero_bottom_left_content">
                <span className="playfair_font">OUR BRANDS</span> <br /> <span className="playfair_font">JUST REFUSE</span> <br /> <span className="playfair_font">TO BLEND IN</span>
            </h1>
        </div>
    </section>
  )
}

export default Hero