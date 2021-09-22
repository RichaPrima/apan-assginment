import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { getApi } from "../../services/api/api.service";
import { MovieType } from "../../types/types";
import { Header } from "../Header/Header";
import { MovieCard } from "../MovieCard/MovieCard";

import styles from "./HomePage.module.css";

export const HomePage = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [apiInProgress, setApiInProgress] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
    fetchData();
  }, [page]);

  const fetchData = async () => {
    // setApiInProgress(true);
    // return axios
    //   .get(
    //     `https://api.themoviedb.org/3/discover/movie?api_key=55903b004b65252bf433fb4218601d2c&la
    //     nguage=en-US&sort_by=popularity.desc&page=${page}`
    //   )
    //   .then((response) => {
    //     console.log("J", response.data);
    //     setMovies(response.data.results);
    //     setApiInProgress(false);
    //   });
    try {
      setApiInProgress(true);
      const moviesData = await getApi("/movie", {
        api_key: "55903b004b65252bf433fb4218601d2c",
        language: "en-US",
        sort_by: "popularity.desc",
        page: page,
      });
      setMovies(moviesData.results);
      setApiInProgress(false);
    } catch (err) {
      setApiInProgress(false);
    }
  };

  const search = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  const filterMovies = (movie: MovieType) => {
    return movie.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
  };

  return (
    <div className={styles.main}>
      <Header onSearch={search} />
      {apiInProgress ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.movieContainer}>
          {/* {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              name={movie.title}
              imgUrl={movie.backdrop_path}
              rating={movie.vote_average}
              ratingCount={movie.vote_count}
              releaseDate={movie.release_date}
            />
          ))} */}
          {movies.filter(filterMovies).map((movie) => (
            <MovieCard
              key={movie.id}
              name={movie.title}
              imgUrl={movie.backdrop_path}
              rating={movie.vote_average}
              ratingCount={movie.vote_count}
              releaseDate={movie.release_date}
            />
          ))}
        </div>
      )}
    </div>
  );
};
