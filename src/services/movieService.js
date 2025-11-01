import axiosInstance from "./api/config";

// ==========================================
// MOVIES API - Lấy thông tin phim từ Backend
// ==========================================

/**
 * Lấy danh sách phim với filters
 * @param {Object} params - { type, genre, page, limit, sort }
 * type: 'popular' | 'top_rated' | 'upcoming' | 'now_playing'
 */
export const fetchMoviesAPI = (params = {}) => {
    const URL = "/movies";
    return axiosInstance.get(URL, {
        params
    });
};

/**
 * Lấy chi tiết phim theo ID
 */
export const fetchMovieByIdAPI = (movieId) => {
    const URL = `/movies/${movieId}`;
    return axiosInstance.get(URL);
};

/**
 * Tìm kiếm phim
 */
export const searchMoviesAPI = (query, page = 1, limit = 20) => {
    const URL = "/movies/search";
    return axiosInstance.get(URL, {
        params: {
            query,
            page,
            limit
        }
    });
};

/**
 * Lấy danh sách thể loại
 */
export const fetchGenresAPI = () => {
    const URL = "/genres";
    return axiosInstance.get(URL);
};

/**
 * Lấy phim theo thể loại
 */
export const fetchMoviesByGenreAPI = (genreId, page = 1, limit = 20) => {
    const URL = `/movies/genre/${genreId}`;
    return axiosInstance.get(URL, {
        params: {
            page,
            limit
        }
    });
};

/**
 * Lấy video/trailer của phim
 */
export const fetchMovieVideosAPI = (movieId) => {
    const URL = `/movies/${movieId}/videos`;
    return axiosInstance.get(URL);
};

/**
 * Lấy danh sách diễn viên
 */
export const fetchMovieCastAPI = (movieId) => {
    const URL = `/movies/${movieId}/cast`;
    return axiosInstance.get(URL);
};

/**
 * Lấy phim tương tự
 */
export const fetchSimilarMoviesAPI = (movieId) => {
    const URL = `/movies/${movieId}/similar`;
    return axiosInstance.get(URL);
};

/**
 * Lấy phim đề xuất
 */
export const fetchRecommendedMoviesAPI = (movieId) => {
    const URL = `/movies/${movieId}/recommendations`;
    return axiosInstance.get(URL);
};

// ==========================================
// AUTH API - Đăng nhập, đăng ký
// ==========================================

export const registerUserAPI = (fullName, email, password, phone) => {
    const URL = "/auth/register";
    const data = {
        fullName,
        email,
        password,
        phone
    };
    return axiosInstance.post(URL, data);
};

export const loginUserAPI = (email, password) => {
    const URL = "/auth/login";
    const data = {
        email: email,
        password
    };
    return axiosInstance.post(URL, data);
};

export const getAccountAPI = () => {
    const URL = "/auth/account";
    return axiosInstance.get(URL);
};

export const logOutAPI = () => {
    const URL = "/auth/logout";
    return axiosInstance.post(URL);
};

export const forgotPasswordAPI = (email) => {
    const URL = "/auth/forgot-password";
    return axiosInstance.post(URL, {
        email
    });
};

export const resetPasswordAPI = (token, newPassword) => {
    const URL = "/auth/reset-password";
    return axiosInstance.post(URL, {
        token,
        newPassword
    });
};

// ==========================================
// USER API - Profile, Avatar
// ==========================================

export const getUserProfileAPI = () => {
    const URL = "/user/profile";
    return axiosInstance.get(URL);
};

export const updateUserProfileAPI = (userId, fullName, phone, avatar) => {
    const URL = "/user";
    const data = {
        _id: userId,
        fullName,
        phone,
        avatar
    };
    return axiosInstance.put(URL, data);
};

export const changePasswordAPI = (oldPassword, newPassword) => {
    const URL = "/user/change-password";
    const data = {
        oldPassword,
        newPassword
    };
    return axiosInstance.post(URL, data);
};

// ==========================================
// FILE UPLOAD API
// ==========================================

export const handleUploadFile = (file, folder) => {
    const URL = "/file/upload";
    const config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data",
        },
    };

    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file);

    return axiosInstance.post(URL, bodyFormData, config);
};

// ==========================================
// COMMENT API - Bình luận phim
// ==========================================

export const fetchMovieCommentsAPI = (movieId, current = 1, pageSize = 10) => {
    const URL = `/comments/${movieId}?current=${current}&pageSize=${pageSize}`;
    return axiosInstance.get(URL);
};

export const createCommentAPI = (movieId, content, isSpoiler = false) => {
    const URL = `/comments/${movieId}`;
    const data = {
        content,
        isSpoiler
    };
    return axiosInstance.post(URL, data);
};

export const replyToCommentAPI = (commentId, content) => {
    const URL = `/comments/${commentId}/reply`;
    const data = {
        content
    };
    return axiosInstance.post(URL, data);
};

export const likeCommentAPI = (commentId) => {
    const URL = `/comments/${commentId}/like`;
    return axiosInstance.post(URL);
};

export const dislikeCommentAPI = (commentId) => {
    const URL = `/comments/${commentId}/dislike`;
    return axiosInstance.post(URL);
};

export const deleteCommentAPI = (commentId) => {
    const URL = `/comments/${commentId}`;
    return axiosInstance.delete(URL);
};

export const hideCommentAPI = (commentId) => {
    const URL = `/comments/${commentId}/hide`;
    return axiosInstance.post(URL);
};

export const reportCommentAPI = (commentId, reason) => {
    const URL = `/comments/${commentId}/report`;
    const data = {
        reason
    };
    return axiosInstance.post(URL, data);
};

// ==========================================
// WATCHLIST API - Danh sách xem sau
// ==========================================

export const getWatchlistAPI = (current = 1, pageSize = 10) => {
    const URL = `/watchlist?current=${current}&pageSize=${pageSize}`;
    return axiosInstance.get(URL);
};

export const addToWatchlistAPI = (movieId, movieData) => {
    const URL = "/watchlist/add";
    const data = {
        movieId,
        ...movieData
    };
    return axiosInstance.post(URL, data);
};

export const removeFromWatchlistAPI = (movieId) => {
    const URL = `/watchlist/${movieId}`;
    return axiosInstance.delete(URL);
};

export const checkInWatchlistAPI = (movieId) => {
    const URL = `/watchlist/check/${movieId}`;
    return axiosInstance.get(URL);
};

// ==========================================
// FAVORITES API - Danh sách yêu thích
// ==========================================

export const getFavoritesAPI = (current = 1, pageSize = 10) => {
    const URL = `/favorites?current=${current}&pageSize=${pageSize}`;
    return axiosInstance.get(URL);
};

export const addToFavoritesAPI = (movieId, movieData) => {
    const URL = "/favorites/add";
    const data = {
        movieId,
        ...movieData
    };
    return axiosInstance.post(URL, data);
};

export const removeFromFavoritesAPI = (movieId) => {
    const URL = `/favorites/${movieId}`;
    return axiosInstance.delete(URL);
};

// ==========================================
// WATCH HISTORY API - Lịch sử xem
// ==========================================

export const getWatchHistoryAPI = (current = 1, pageSize = 10) => {
    const URL = `/history?current=${current}&pageSize=${pageSize}`;
    return axiosInstance.get(URL);
};

export const addToWatchHistoryAPI = (movieId, movieData) => {
    const URL = "/history/add";
    const data = {
        movieId,
        ...movieData
    };
    return axiosInstance.post(URL, data);
};

export const clearWatchHistoryAPI = () => {
    const URL = "/history/clear";
    return axiosInstance.delete(URL);
};