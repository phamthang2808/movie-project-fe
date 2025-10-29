import axios from "axios";

const API_KEY = "cdf2af64302763e61b5739b22c39e997"; // Public demo key - replace with your own
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: "vi-VN", // Vietnamese
    },
});

export const fetchPopularMovies = async () => {
    try {
        const response = await api.get("/movie/popular");
        return response.data.results;
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        throw error;
    }
};

export const fetchTopRatedMovies = async () => {
    try {
        const response = await api.get("/movie/top_rated");
        return response.data.results;
    } catch (error) {
        console.error("Error fetching top rated movies:", error);
        throw error;
    }
};

export const fetchUpcomingMovies = async () => {
    try {
        const response = await api.get("/movie/upcoming");
        return response.data.results;
    } catch (error) {
        console.error("Error fetching upcoming movies:", error);
        throw error;
    }
};

export const fetchMovieDetails = async (id) => {
    try {
        const response = await api.get(`/movie/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
};

export const fetchMovieVideos = async (id) => {
    try {
        const response = await api.get(`/movie/${id}/videos`);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching movie videos:", error);
        throw error;
    }
};

export const fetchMovieCast = async (id) => {
    try {
        const response = await api.get(`/movie/${id}/credits`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie cast:", error);
        throw error;
    }
};

export const searchMovies = async (query) => {
    try {
        const response = await api.get("/search/movie", {
            params: {
                query,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error("Error searching movies:", error);
        throw error;
    }
};






