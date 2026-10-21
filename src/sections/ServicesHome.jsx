import React from 'react'
import CommonHeadingBigText from '../components/CommonHeadBigText'

const carouselData = [
  {id: 1, data: "Product Design", image: "https://images.unsplash.com/photo-1789758385692-a1cbfb57417e", listItem: ["Website Design", "CMS", "UI Animation"]},
  {id: 2, data: "Product Design", image: "https://plus.unsplash.com/premium_photo-1792462144755-d96956948fbd", listItem: ["Logo Design", "Visual Design", "UI Animation"]},
  {id: 3, data: "Product Design", image: "https://images.unsplash.com/photo-1791114942763-11b3375aaa86", listItem: ["Logo Design", "Optimisation", "UI Animation"]},
]

const ServicesHome = () => {
  return (
    <>
    <section className="common_padding">
        <div className="second_container">
            <CommonHeadingBigText sectionName={"Services"} tagLine={"Turning Ideas into form."} firstLine={"WE"} secondLine={"BUILD BRANDS."} thirdLine={"THEN WE GIVE THEM"} forthLine={"SOMEWHERE TO LIVE"} />

            <div className="service_home_carousel_container">
              <div className="content_container">
                <ul>
                  <li>Brand Identity</li>
                  <li>Product Design</li>
                  <li>Web Systems</li>
                  <li>Development</li>
                  <li>Content & Messaging</li>
                  <li>Motion & Interaction</li>
                </ul>
              </div>
              <div className="carousel_image_container">
                <div className="carousel">
                  {carouselData.map((i) =>{
                    const title = i.data
                    const titleArr = title.split(" ")
                    // console.log(titleArr)
                    return (
                      <div key={i.id} className={`main_car_container main_car_container${i.id}`}>
                        <div className="data">{titleArr.map((t, index) => (
                          <span key={index}><span>{t}</span><br /></span>
                        ))}</div>
                        <div className="main_container">
                          <img src={i.image} alt={i.data} />
                          <ul>
                            {i.listItem.map((e, index) => (
                              <li key={index}>{e}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default ServicesHome