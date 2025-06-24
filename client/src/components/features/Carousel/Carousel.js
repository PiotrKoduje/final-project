import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from './Carousel.module.scss';
import NextArrow from "../NextArrow/NextArrow";
import PrevArrow from "../PrevArrow/PrevArrow";

import Slider from "react-slick";

const Carusel = ({ images = [] }) => {
  
  const settings = {
    customPaging: function(i) {
      return (
        <button
          type="button"
          className="focus:outline-none"
        >
          <img src={images[i]} alt={`miniaturka ${i}`} style={{ width: 50, height: 100, objectFit: "contain", marginTop: 20 }} />
        </button>
      );
    },
    dots: true,
    dotsClass: styles.customDots,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="slider-container" style={{ maxWidth: 300, margin: "40px auto" }}>
      <Slider {...settings}>
        { images.map((src, index) => (
            <div key={index} className={styles.mainImage}>
              <img
                src={src}
                alt={`Zdjęcie ${ index + 1 }`}
                className="w-full h-[300px] md:h-[400px] object-contain rounded"
              />
            </div>
          ))
         }
      </Slider>
    </div>
  );
}
export default Carusel;