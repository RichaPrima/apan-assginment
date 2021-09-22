import React from "react";
import star from "./../../assests/images/star.svg";
import user from "./../../assests/images/user.svg";
import calendar from "./../../assests/images/calendar.svg";

// import "./MovieCard.css";
import styles from "./MovieCard.module.css";

export type MovieCardProps = {
  name: string;
  imgUrl: string;
  rating: number;
  ratingCount: number;
  releaseDate: string;
};

export const MovieCard: React.FC<MovieCardProps> = ({
  name,
  imgUrl,
  rating,
  ratingCount,
  releaseDate,
}) => {
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getFullDate = (date: string) => {
    const originalDate = new Date(date);
    const formattedDate = `${
      months[originalDate.getMonth()]
    } ${originalDate.getDate()}, ${originalDate.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div className={styles.main}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${imgUrl}`}
        alt={"Movie's Poster"}
        // width={"380px"}
        // height={"380px"}
        className={styles.moviePoster}
      />
      <div className={styles.movieInfo}>
        <div className={styles.movieName}>{name}</div>
        <div className={styles.movieReview}>
          <span className={styles.movieRatings}>
            <img src={star} alt={styles.YellowStar} />
            {rating}
          </span>
          <span className={styles.movieReviewSeparator}>|</span>
          <span className={styles.movieVotes}>
            {ratingCount}
            <img src={user} alt={"User Icon"} />
          </span>
        </div>
        <div className={styles.movieReleased}>
          <img src={calendar} alt={"Calendar's Icon"} />
          <span>Released: </span>
          <span className={styles.movieDate}>{getFullDate(releaseDate)}</span>
        </div>
      </div>
    </div>
  );
};
