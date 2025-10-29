/**
 * Movie API Service
 * Xử lý movie/film CRUD operations
 */

import { apiRequest } from "./config";

export const movieApi = {
    /**
     * Get all movies
     */
    getAllMovies: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/movies?${queryString}`, {
            method: "GET",
        });
    },

    /**
     * Get movie by ID
     */
    getMovieById: async (movieId) => {
        return apiRequest(`/movies/${movieId}`, {
            method: "GET",
        });
    },

    /**
     * Search movies
     */
    searchMovies: async (query) => {
        return apiRequest(`/movies/search?q=${encodeURIComponent(query)}`, {
            method: "GET",
        });
    },

    /**
     * Get trending movies
     */
    getTrendingMovies: async () => {
        return apiRequest("/movies/trending", {
            method: "GET",
        });
    },

    /**
     * Get top movies of the week
     */
    getTopMoviesWeek: async () => {
        return apiRequest("/movies/top-week", {
            method: "GET",
        });
    },

    /**
     * Get movies by category
     */
    getMoviesByCategory: async (categoryId) => {
        return apiRequest(`/movies/category/${categoryId}`, {
            method: "GET",
        });
    },

    /**
     * Get movie comments
     */
    getMovieComments: async (movieId) => {
        return apiRequest(`/movies/${movieId}/comments`, {
            method: "GET",
        });
    },

    /**
     * Add comment to movie
     */
    addComment: async (movieId, commentData) => {
        return apiRequest(`/movies/${movieId}/comments`, {
            method: "POST",
            body: JSON.stringify(commentData),
        });
    },

    /**
     * Rate movie
     */
    rateMovie: async (movieId, rating) => {
        return apiRequest(`/movies/${movieId}/rate`, {
            method: "POST",
            body: JSON.stringify({ rating }),
        });
    },

    /**
     * Add to favorites
     */
    addToFavorites: async (movieId) => {
        return apiRequest(`/movies/${movieId}/favorite`, {
            method: "POST",
        });
    },

    /**
     * Remove from favorites
     */
    removeFromFavorites: async (movieId) => {
        return apiRequest(`/movies/${movieId}/favorite`, {
            method: "DELETE",
        });
    },

    /**
     * Get user's favorite movies
     */
    getFavoriteMovies: async () => {
        return apiRequest("/movies/favorites", {
            method: "GET",
        });
    },

    /**
     * Add to watchlist
     */
    addToWatchlist: async (movieId) => {
        return apiRequest(`/movies/${movieId}/watchlist`, {
            method: "POST",
        });
    },

    /**
     * Get watchlist
     */
    getWatchlist: async () => {
        return apiRequest("/movies/watchlist", {
            method: "GET",
        });
    },

    /**
     * Get watch history
     */
    getWatchHistory: async () => {
        return apiRequest("/movies/history", {
            method: "GET",
        });
    },

    /**
     * Update watch progress
     */
    updateWatchProgress: async (movieId, progress) => {
        return apiRequest(`/movies/${movieId}/progress`, {
            method: "POST",
            body: JSON.stringify({ progress }),
        });
    },
};

