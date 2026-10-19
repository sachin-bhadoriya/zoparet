import smallVectorIcon from '../assets/svg/small_vector_icon.svg';
import SvgIcon from "./SvgIcon";

const CommonHeadingBigText = () => {
    return (
        <>
            <div className="section_top_elem">
                <div className="top_left_text">
                    <img src={`${smallVectorIcon}`} alt="" />
                    <span>Section</span>
                </div>
                <div className="top_right_text">
                    <SvgIcon name="banner_blink" className="banner_blink" />
                    <span className="top_tag_line"> Innovation Beyond Limits </span>
                </div>
            </div>
           <h2 className="common_big_text_heading_main_container">
                <p className="first_line">WE</p> 
                <p className="second_line">BUILD BRANDS.</p> 
                <p className="third_line">THEN WE GIVE THEM</p> 
                <p className="forth_line">SOMEWHERE TO LIVE</p> 
           </h2>
        </>
    )
}

export default CommonHeadingBigText