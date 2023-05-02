import { useAppSelector } from "app/store/hooks";
import { selectFavourites } from "features";
import { ReactComponent as Arrow } from "assets/icons/arrow-right.svg";
import { useMemo, useState } from "react";
import { Layout } from "shared";
import { Hotel } from "entities";
import { ScrollView } from "shared";
import styles from "./styles.module.scss";

function Favourites() {
  const hotels = useAppSelector(selectFavourites);
  const [isRate, setIsRate] = useState(true);
  const [isDescend, setIsDescend] = useState(true);

  const filteredHotels = useMemo(() => {
    return [...hotels].sort((hotelPrev, hotelNext) => {
      if (isRate) {
        return isDescend
          ? hotelPrev.stars - hotelNext.stars
          : hotelPrev.stars + hotelNext.stars;
      } else {
        return isDescend
          ? hotelPrev.priceFrom - hotelNext.priceFrom
          : hotelPrev.priceFrom + hotelNext.priceFrom;
      }
    });
  }, [hotels, isRate, isDescend]);

  function toggleRate() {
    if (isRate) {
      setIsDescend(!isDescend);
    } else {
      setIsRate(!isRate);
    }
  }

  function togglePrice() {
    if (!isRate) {
      setIsDescend(!isDescend);
    } else {
      setIsRate(!isRate);
    }
  }

  return (
    <section className={styles.favourites}>
      <Layout>
        <h2 className={styles.favourites__header}>Избранное</h2>
        <div className={styles.favourites__filters}>
          <button
            onClick={toggleRate}
            className={`${styles.filter} ${
              isRate ? styles.filter__active : null
            }`}
          >
            <span>Рейтинг</span>
            <div className={styles.filter__arrows}>
              <Arrow
                strokeWidth='5'
                width={9}
                height={6}
                color={isDescend && isRate ? "#41522E" : "#A7A7A7"}
                className={`${styles.arrow} ${styles.arrow_top}`}
              />
              <Arrow
                strokeWidth='5'
                width={9}
                height={6}
                color={!isDescend && isRate ? "#41522E" : "#A7A7A7"}
                className={`${styles.arrow} ${styles.arrow_bottom}`}
              />
            </div>
          </button>
          <button
            onClick={togglePrice}
            className={`${styles.filter} ${
              !isRate ? styles.filter__active : null
            }`}
          >
            <span>Цена</span>
            <div className={styles.filter__arrows}>
              <Arrow
                strokeWidth='5'
                width={9}
                height={6}
                color={isDescend && !isRate ? "#41522E" : "#A7A7A7"}
                className={`${styles.arrow} ${styles.arrow_top}`}
              />
              <Arrow
                strokeWidth='5'
                width={9}
                height={6}
                color={!isDescend && !isRate ? "#41522E" : "#A7A7A7"}
                className={`${styles.arrow} ${styles.arrow_bottom}`}
              />
            </div>
          </button>
        </div>
        <ScrollView style={{ maxHeight: 288 }}>
          {filteredHotels.map((hotel) => (
            <Hotel hotel={hotel} key={hotel.hotelId} />
          ))}
        </ScrollView>
      </Layout>
    </section>
  );
}

export default Favourites;
