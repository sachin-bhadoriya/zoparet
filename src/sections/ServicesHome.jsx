import React, { useEffect, useRef, useState } from 'react'
import CommonHeadingBigText from '../components/CommonHeadBigText'
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const carouselData = [
  {id: 1, data: "Product Design", image: "https://images.unsplash.com/photo-1789758385692-a1cbfb57417e", listItem: ["Website Design", "CMS", "UI Animation"]},
  {id: 2, data: "Brand Design", image: "https://plus.unsplash.com/premium_photo-1792462144755-d96956948fbd", listItem: ["Logo Design", "Visual Design", "UI Animation"]},
  {id: 3, data: "UI Animate", image: "https://images.unsplash.com/photo-1791114942763-11b3375aaa86", listItem: ["Logo Design", "Optimisation", "UI Animation"]},
]

const ServicesHome = () => {
  const sectionRef = useRef(null)
  const [selectedIndexData, setSelectedIndexData] = useState(1)

  const totalIndex = carouselData.length

  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedIndexData((prev) => (prev < totalIndex ? prev + 1 : 1))
    }, 5000)

    return () => clearTimeout(timer)
  }, [selectedIndexData, totalIndex])

  // Image reveal animation: runs only when the selected item changes
  useEffect(() => {
    const imageContainer = sectionRef.current.querySelector(".main_image_container img");
    const dataEl = sectionRef.current.querySelector(".data");

    let split;

    const ctx = gsap.context(() => {

      gsap.fromTo(imageContainer, { width: "50%" }, { width: '100%', duration: 1, ease: 'power1.inOut' }

        
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [selectedIndexData])

  const selectedItem = carouselData.find((elem) => elem.id === selectedIndexData)

  return (
    <>
    <section ref={sectionRef} className="common_padding">
        <div className="second_container">
            <CommonHeadingBigText sectionName={"Services"} tagLine={"Turning Ideas into form."} firstLine={"WE"} secondLine={"BUILD BRANDS."} thirdLine={"THEN WE GIVE THEM"} forthLine={"SOMEWHERE TO LIVE"} />

            <div className="service_home_carousel_container">
              <div className="content_container">
                <ul>
                  {carouselData.map((elem) => (
                    <li key={elem.id} data={selectedIndexData} onClick={(e) => {e.preventDefault(); setSelectedIndexData(elem.id)}} ><a data-image={elem.image} data-key={elem.listItem}>{elem.data}</a></li>
                  ))}
                </ul>
              </div>
              <div className="carousel_image_container">
                <div className="carousel">
                  <div className={`main_car_container main_car_container`}>
                    <div className="data">{selectedItem.data}</div>
                    <div className="main_container">
                      <div className="main_image_container">
                        <img src={selectedItem.image} alt={selectedItem.data} />
                      </div>
                      <ul>
                        {selectedItem.listItem.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default ServicesHome