import React, { useEffect, useRef, useState } from 'react'
import CommonHeadingBigText from '../components/CommonHeadBigText'
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const dataOne = [
  {id: 1, title: "D&AD Awards", desc: "Shortlist -- Brand Identity", tag: "Hailden"},
  {id: 2, title: "D&AD Awards", desc: "Shortlist -- Brand Identity", tag: "Hailden"},
  {id: 3, title: "D&AD Awards", desc: "Shortlist -- Brand Identity", tag: "Hailden"},
]

const RecongnisationHome = () => {
    const sectionRef = useRef(null)

  return (
    <>
    <section ref={sectionRef} className="common_padding">
        <div className="third_container">
            <CommonHeadingBigText sectionName={"Recongnition"} tagLine={"Trust Continue."} firstLine={"WE DIDN'T CHASE"} secondLine={"THE RECOGNITION"} thirdLine={"THE WORK"} forthLine={"DID THAT FOR US."} />

            <div className="recognition_main_container">
                <div className="recognition_left_container">
                    <div className="recognition_left_content_container">

                    </div>
                    <div className="recognition_left_image_container">
                        <img src="" alt="" />
                    </div>
                </div>
                <div className="recognition_right_container">
                    {dataOne.map((item) => (
                        <div className="content_container">
                        <h4 className='color_black font24 fw500'>{item.title}</h4>
                        <div className='inside_content_container'>
                            <h5 className='color_second font15 fw400'>{item.desc}</h5>
                            <h5 className='color_second font15 fw400'>{item.tag}</h5>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default RecongnisationHome