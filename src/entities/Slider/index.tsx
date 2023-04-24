import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./styles.module.scss";
import hotel1 from "assets/hotels/1.webp";
import hotel2 from "assets/hotels/3.webp";
import hotel3 from "assets/hotels/3.webp";
import hotel4 from "assets/hotels/4.webp";
import hotel5 from "assets/hotels/5.webp";
import hotel6 from "assets/hotels/6.webp";

const sliderSettings = {
  infinite: true,
  autoplaySpeed: 1500,
  speed: 700,
  arrows: false,
  autoplay: true,
  variableWidth: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  swipeToSlide: true,
} as Settings;

function HotelsSlider() {
  return (
    <div className={styles.wrapper}>
      <Slider {...sliderSettings}>
        <div className={styles.item}>
          <img src={hotel1} alt='hotel preview' />
        </div>
        <div className={styles.item}>
          <img src={hotel2} alt='hotel preview' />
        </div>
        <div className={styles.item}>
          <img src={hotel3} alt='hotel preview' />
        </div>
        <div className={styles.item}>
          <img src={hotel4} alt='hotel preview' />
        </div>
        <div className={styles.item}>
          <img src={hotel5} alt='hotel preview' />
        </div>
        <div className={styles.item}>
          <img src={hotel6} alt='hotel preview' />
        </div>
      </Slider>
    </div>
  );
}

export default HotelsSlider;
