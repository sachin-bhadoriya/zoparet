import React, { useEffect, useRef, useState } from 'react'
import CommonHeadingBigText from '../components/CommonHeadBigText'
import gsap from "gsap";

const carouselData = [
  {id: 1, data: "Product Design", image: "https://images.unsplash.com/photo-1789758385692-a1cbfb57417e", listItem: ["Website Design", "CMS", "UI Animation"]},
  {id: 2, data: "Brand Design", image: "https://plus.unsplash.com/premium_photo-1792462144755-d96956948fbd", listItem: ["Logo Design", "Visual Design", "UI Animation"]},
  {id: 3, data: "UI Animate", image: "https://images.unsplash.com/photo-1791114942763-11b3375aaa86", listItem: ["Logo Design", "Optimisation", "UI Animation"]},
]

const ServicesHome = () => {
  const sectionRef = useRef(null)
  const [selectedIndexData, setSelectedIndexData] = useState(1)

  const totalIndex = carouselData.length;
  
  const timer = setTimeout(() => {
    if(selectedIndexData < totalIndex){
      setSelectedIndexData(selectedIndexData+1)
    } else{
      setSelectedIndexData(1)
    }
    // console.log(selectedIndexData)
  }, 5000);

  const selectedItem = carouselData.find(
    (elem) => elem.id === selectedIndexData
  );
  
  useEffect(() => {
    const mainImageContainer = sectionRef.current.querySelector('.carousel_image_container .main_image_container img')

    gsap.set(mainImageContainer, {width: 0})

    gsap.to(mainImageContainer, {width: "100%", duration: 2, ease: "power1.inOut"})
  }, [timer])
  

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