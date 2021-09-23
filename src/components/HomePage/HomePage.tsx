import { useEffect, useRef, useState } from "react";
import { UseInfiniteScroll } from "../../customHooks/useInfiniteScroll";
import { getApi } from "../../services/api/api.service";
import { MovieType } from "../../types/types";
import { Header } from "../Header/Header";
import { Loader } from "../Loader/Loader";
import { MovieCard } from "../MovieCard/MovieCard";

import styles from "./HomePage.module.css";

// ToDo
// Debouncing
// No movies

export const HomePage = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [apiInProgress, setApiInProgress] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);

  const rootRef = useRef<HTMLDivElement>(null);

  const [node, entry] = UseInfiniteScroll({
    root: rootRef.current,
    rootMargin: "24px",
    threshold: 0.75,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, [entry?.isIntersecting]);

  const fetchMovieData = async () => {
    setApiInProgress(true);
    try {
      const moviesData = await getApi("/discover/movie", {
        api_key: "55903b004b65252bf433fb4218601d2c",
        language: "en-US",
        sort_by: "popularity.desc",
        page: page,
      });
      if (page === 1) setMovies(moviesData.results);
      else setMovies((prev) => [...prev, ...moviesData.results]);
    } catch (err) {
      console.error(err);
    }
    setApiInProgress(false);
  };

  const search = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  useEffect(() => {
    fetchMovieData();
  }, [page]);

  const filterMovies = (movie: MovieType) => {
    return movie?.title?.toLowerCase().includes(searchValue.toLowerCase());
  };

  const filteredMovieData = movies
    .filter(filterMovies)
    .map((movie, index, arr) => (
      <div
        ref={index === arr.length - 1 && searchValue.length === 0 ? node : null}
        key={movie.id}
      >
        <MovieCard
          name={movie.title}
          imgUrl={movie.backdrop_path}
          rating={movie.vote_average}
          ratingCount={movie.vote_count}
          releaseDate={movie.release_date}
        />
      </div>
    ));

  return (
    <div className={styles.main}>
      <Header onSearch={search} searchValue={searchValue} />
      {searchValue.length > 0 ? (
        <h1>Search Results</h1>
      ) : (
        <h1>Latest Movies</h1>
      )}
      {/* {apiInProgress ? (
        <Loader />
      ) : (
        <div className={styles.movieContainer} ref={rootRef}>
          {filteredMovieData}
        </div>
      )} */}
      <div className={styles.movieContainer} ref={rootRef}>
          {filteredMovieData}
        </div>
        {apiInProgress && <Loader />}
    </div>
  );
};
