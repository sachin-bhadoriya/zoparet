import { useEffect, useRef } from 'react';
import gsap from "gsap";
import smallVectorIcon from '../assets/svg/small_vector_icon.svg';
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const CommonHeadingBigText = (props) => {
    const topLineRef = useRef(null)
    const headingRef = useRef(null)

    useEffect(() => {
        const topRightTextSVG = topLineRef.current.querySelector('.top_right_text svg')
        const topRightTextTagLine = topLineRef.current.querySelector('.top_right_text .top_tag_line')
        const topLeftTextImg = topLineRef.current.querySelector('.top_left_text img')
        const topLeftTextSpan = topLineRef.current.querySelector('.top_left_div_text span')

        const firstLine = headingRef.current.querySelector('.first_line span')
        const secondLine = headingRef.current.querySelector('.second_line span')
        const thirdLine = headingRef.current.querySelector('.third_line span')
        const forthLine = headingRef.current.querySelector('.forth_line span')

        gsap.set(topLeftTextImg, {scale: 0.3, rotate: "135deg"})
        gsap.set(topLeftTextSpan, {bottom: -25, opacity: 0, position: "relative"});
        gsap.set(topRightTextSVG, {bottom: -25, opacity: 0, position: "relative"});
        gsap.set(topRightTextTagLine, {bottom: -25, opacity: 0, position: "relative"});

        gsap.set(firstLine, {right: -100, opacity: 0, position: "relative"})
        gsap.set(secondLine, {right: -100, opacity: 0, position: "relative"})
        gsap.set(thirdLine, {right: -100, opacity: 0, position: "relative"})
        gsap.set(forthLine, {right: -100, opacity: 0, position: "relative"})
        
        
        gsap.to(topLeftTextImg, {scrollTrigger: { trigger: topLineRef.current, start: "top 90%", }, scale: 1, rotate: "0deg", duration: 1,})
        gsap.to(topLeftTextSpan, {scrollTrigger: { trigger: topLineRef.current, start: "top 90%", }, bottom: 0, opacity:1, ease: "power4.inOut", duration: 0.8,});
        
        
        gsap.to(topRightTextSVG, {scrollTrigger: { trigger: topLineRef.current, start: "top 90%", }, bottom: 0, opacity:1, stagger:0.2, ease: "power4.inOut", duration: 1,});
        gsap.to(topRightTextTagLine, {scrollTrigger: { trigger: topLineRef.current, start: "top 90%", }, bottom: 0, opacity:1, stagger:0.2, ease: "power4.inOut", duration: 1.2,});
        
        
        gsap.to(firstLine, { scrollTrigger: { trigger: firstLine, start: "top 95%", }, right: 0, opacity:1, ease: "power4.inOut", duration: 1,});
        gsap.to(secondLine, { scrollTrigger: { trigger: secondLine, start: "top 95%", }, right: 0, opacity:1, ease: "power4.inOut", duration: 1.2,});
        gsap.to(thirdLine, { scrollTrigger: { trigger: thirdLine, start: "top 95%", }, right: 0, opacity:1, ease: "power4.inOut", duration: 1.4,});
        gsap.to(forthLine, { scrollTrigger: { trigger: forthLine, start: "top 95%", }, right: 0, opacity:1, ease: "power4.inOut", duration: 1.2,});

    }, [])
    
    return (
        <>
            <div ref={topLineRef} className="section_top_elem">
                <div className="top_left_text">
                    <img src={`${smallVectorIcon}`} alt={props.sectionName} />
                    <div className='top_left_div_text'><span>{props.sectionName}</span></div>
                </div>
                <div className="top_right_text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 1512 1177" fill="none">
                        <circle cx="1053.5" cy="588.5" r="458.5" fill="#97A87A"/>
                        <circle cx="588.5" cy="588.5" r="523.5" fill="#000" stroke="white" strokeWidth="130"/>
                    </svg>
                    <span className="top_tag_line"> {props.tagLine} </span>
                </div>
            </div>
           <h2 ref={headingRef} className="common_big_text_heading_main_container">
                <p className="first_line"><span>{props.firstLine}</span></p> 
                <p className="second_line"><span>{props.secondLine}</span></p> 
                <p className="third_line"><span>{props.thirdLine}</span></p> 
                <p className="forth_line"><span>{props.forthLine}</span></p> 
           </h2>
        </>
    )
}

export default CommonHeadingBigText