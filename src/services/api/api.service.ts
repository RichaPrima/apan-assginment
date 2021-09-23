import httpClient from "../httpClient";
import {AxiosResponse} from "axios";
import {MoviesResponse} from "../../types/apiTypes";

export const getMovies = async (page: number = 1): Promise<AxiosResponse<MoviesResponse> | undefined> => {
    try {
        return await httpClient.get("/discover/movie", {
            params: {
                api_key: "55903b004b65252bf433fb4218601d2c",
                language: "en-US",
                sort_by: "popularity.desc",
                page: page,
            }
        });
    } catch (err) {
        console.error(err);
        return undefined
    }
}
