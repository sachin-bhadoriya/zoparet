import smallVectorIcon from '../assets/svg/small_vector_icon.svg';

const CommonHeadingBigText = () => {
    return (
        <>
            <div className="section_top_elem">
                <div className="top_left_text">
                    <img src={`${smallVectorIcon}`} alt="" />
                    <span>Section</span>
                </div>
                <div className="top_right_text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="auto" viewBox="0 0 1512 1177" fill="none">
                        <circle cx="1053.5" cy="588.5" r="458.5" fill="#97A87A"/>
                        <circle cx="588.5" cy="588.5" r="523.5" fill="#000" stroke="white" stroke-width="130"/>
                    </svg>
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