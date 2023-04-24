import { useAppSelector } from "app/store/hooks";
import {
  selectAllHotels,
  selectFavouriteHotelsCount,
  selectSearchParams,
} from "features";
import { Hotel, Slider } from "entities";
import hotelIcon from "assets/icons/hotel.png";
import { ReactComponent as Arrow } from "assets/icons/arrow-right.svg";
import { Layout, ScrollView, formatDate, getNoun } from "shared";
import styles from "./styles.module.scss";
import "moment/locale/ru";

function View() {
  const { location, checkIn } = useAppSelector(selectSearchParams);
  const hotels = useAppSelector(selectAllHotels);
  const favouriteHotelsCount = useAppSelector(selectFavouriteHotelsCount);

  return (
    <section className={styles.view}>
      <Layout style={{ padding: "50px 32px" }}>
        <div className={styles.header}>
          <div className={styles.header__item}>
            <h2>Отели</h2>
            <Arrow strokeWidth="2" />
            <h2>{location}</h2>
          </div>
          <div className={styles.header__item}>
            <span>{formatDate(checkIn)}</span>
          </div>
        </div>
        <Slider />
        <div className={styles.header__favourites}>
          {`Добавлено в Избранное:  `}
          <span className={styles.header__favourites_count}>
            {favouriteHotelsCount}
          </span>{" "}
          {`${getNoun(favouriteHotelsCount, "отель", "отеля", "отелей")}`}
        </div>
        <ScrollView style={{maxHeight: 533}}>
          {hotels.map((hotel) => (
            <Hotel hotel={hotel} key={hotel.hotelId} iconSrc={hotelIcon} />
          ))}
        </ScrollView>
      </Layout>
    </section>
  );
}

export default View;
