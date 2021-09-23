import {useEffect, useMemo, useRef, useState} from "react";
import {useInfiniteScroll} from "../../customHooks/useInfiniteScroll";
import {getMovies} from "../../services/api/api.service";
import {MovieType} from "../../types/types";
import {Header} from "../Header/Header";
import {Loader} from "../Loader/Loader";
import {MovieCard} from "../MovieCard/MovieCard";

import styles from "./HomePage.module.css";
import {debounce} from "../../utils/common";

export const HomePage = () => {
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [apiInProgress, setApiInProgress] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);

    const rootRef = useRef<HTMLDivElement>(null);

    const [node, entry] = useInfiniteScroll({
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
        const res = await getMovies(page)
        if (res?.data) {
            if (page === 1) {
                setMovies(res.data.results)
            } else {
                setMovies((prev) => [...prev, ...res.data.results])
            }
        }

        setApiInProgress(false);
    };

    const handleSearchChange = debounce((searchValue: string) => {
        setSearchValue(searchValue);
    }, 300);

    useEffect(() => {
        fetchMovieData();
    }, [page]);

    const filteredMovies = useMemo(() => {
        return movies.filter((movie) => {
            return movie?.title?.toLowerCase().includes(searchValue.toLowerCase());
        }).map((movie) => <MovieCard
            name={movie.title}
            imgUrl={movie.backdrop_path}
            rating={movie.vote_average}
            ratingCount={movie.vote_count}
            releaseDate={movie.release_date}
        />);
    }, [searchValue])

    const allMovies = useMemo(() => movies
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
        )), [movies, node, searchValue.length])

    return (
        <div className={styles.main}>
            <Header onSearchTextChanged={handleSearchChange}/>
            {searchValue.length > 0 ? (
                <h1>Search Results</h1>
            ) : (
                <h1>Latest Movies</h1>
            )}

            <div className={styles.movieContainer} ref={rootRef}>
                {searchValue?.length === 0 ? allMovies : filteredMovies}
            </div>

            {searchValue?.length > 0 && filteredMovies.length === 0 && "No results"}
            {apiInProgress && <Loader/>}
        </div>
    );
};
