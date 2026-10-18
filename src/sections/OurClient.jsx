const COUNT = 6;
const SRC =
  "https://framerusercontent.com/images/0ndH7w2SEWXEtmeKP0sza0Drs.svg?width=371&height=52";

const OurClient = () => {
  return (
    <section className="our_client_home" >
      <div className="container">
        <div className="content_container">
          <h2 className="common_heading dark">OUR CLIENTS</h2>
          <p className="common_para dark">BRANDS THAT NEVER SETTLED FOR GOOD ENOUGH.</p>
        </div>

        <div className="client_logo_slider_wrapper">
          <div className="client_logo_slider_container">
            {Array.from({ length: COUNT }).map((_, i) => (
              <div
                key={i}
                className="client_logo_container"
                style={{
                  transform: `translate(-50%, -50%) rotateY(${
                    (360 / COUNT) * i
                  }deg) translateZ(260px)`,
                }}
              >
                <img src={SRC} alt="" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default OurClient