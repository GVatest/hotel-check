import { HotelModel } from "features";
import { ReactComponent as Like } from "assets/icons/like.svg";
import { ReactComponent as Star } from "assets/icons/star.svg";
import { formatDate, getNoun } from "shared";
import { useAppDispatch } from "app/store/hooks";
import { toggleFavourite } from "features";
import styles from "./styles.module.scss";

type HotelProps = {
  hotel: HotelModel;
  iconSrc?: string;
  days: number;
};

function Hotel({ hotel, iconSrc, days }: HotelProps) {
  const dispatch = useAppDispatch();

  function handleToggleFavourite(hotel: HotelModel) {
    dispatch(toggleFavourite(hotel));
  }

  return (
    <div className={styles.hotel}>
      {iconSrc ? (
        <div className={styles.hotel_icon}>
          <img src={iconSrc} alt='hotel icon' />
        </div>
      ) : null}
      <div className={styles.hotel__content}>
        <div className={styles.hotel__header}>
          <h3>{hotel.hotelName}</h3>
          <Like
            color={hotel.isFavourite ? "#E55858" : "white"}
            stroke={hotel.isFavourite ? "#E55858" : "#C4C4C4"}
            onClick={() => handleToggleFavourite(hotel)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <span className={styles.hotel__date_days}>
          {`${formatDate(hotel.checkIn)} - ${days} ${getNoun(
            days,
            "день",
            "дня",
            "дней"
          )}`}
        </span>
        <div className={styles.hotel__stats}>
          <div className={styles.hotel__stats_stars}>
            {[...Array(5)].map((_, i) => (
              <Star color={i < hotel.stars ? "#CDBC1E" : "#c4c3b6"} key={i} />
            ))}
          </div>
          <div className={styles.hotel__stats_price}>
            <span>Price:</span>
            <span className={styles.hotel__stats_price_bold}>
              {hotel.priceFrom} ₽
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hotel;
