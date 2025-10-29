# Services API Documentation

## 📁 Cấu trúc thư mục

```
src/services/
├── api.config.js      # Cấu hình Axios, Headers, Interceptors
└── movieService.js    # Tất cả API calls (Backend)
```

## 🔧 Cấu hình API

### File: `api.config.js`

**Chức năng:**

- Cấu hình Backend URL (từ biến môi trường `.env`)
- Tạo Axios instance với baseURL: `{BACKEND_URL}/api/v1`
- **Request Interceptor**: Tự động thêm `Authorization: Bearer <token>` vào header
- **Response Interceptor**: Xử lý lỗi 401 (Token hết hạn) → Redirect về `/login`

**Exports:**

```javascript
export default instance; // Axios instance cho Backend
export { BACKEND_URL }; // Backend URL
```

---

## 📡 API Calls

### File: `movieService.js`

### 🎬 **MOVIES API** (Database riêng)

#### Lấy danh sách phim với filters

```javascript
import { fetchMoviesAPI } from "../services/movieService";

// Phim phổ biến
const response = await fetchMoviesAPI({ type: "popular", page: 1, limit: 20 });
const movies = response.data.result;

// Phim đánh giá cao
const response = await fetchMoviesAPI({
  type: "top_rated",
  page: 1,
  limit: 20,
});

// Phim sắp chiếu
const response = await fetchMoviesAPI({ type: "upcoming", page: 1, limit: 20 });

// Phim đang chiếu
const response = await fetchMoviesAPI({
  type: "now_playing",
  page: 1,
  limit: 20,
});

// Phim theo thể loại
const response = await fetchMoviesAPI({ genre: "action", page: 1, limit: 20 });
```

#### Chi tiết phim

```javascript
import {
  fetchMovieByIdAPI,
  fetchMovieVideosAPI,
  fetchMovieCastAPI,
  fetchSimilarMoviesAPI,
  fetchRecommendedMoviesAPI,
} from "../services/movieService";

// Thông tin phim
const response = await fetchMovieByIdAPI(movieId);
const movie = response.data;

// Video trailer
const response = await fetchMovieVideosAPI(movieId);
const videos = response.data.result;

// Diễn viên
const response = await fetchMovieCastAPI(movieId);
const cast = response.data.result;

// Phim tương tự
const response = await fetchSimilarMoviesAPI(movieId);
const similar = response.data.result;

// Phim đề xuất
const response = await fetchRecommendedMoviesAPI(movieId);
const recommended = response.data.result;
```

#### Tìm kiếm phim

```javascript
import { searchMoviesAPI } from "../services/movieService";

const response = await searchMoviesAPI("Spider-Man", page, limit);
const results = response.data.result;
```

#### Thể loại

```javascript
import {
  fetchGenresAPI,
  fetchMoviesByGenreAPI,
} from "../services/movieService";

// Danh sách thể loại
const response = await fetchGenresAPI();
const genres = response.data.result;

// Phim theo thể loại
const response = await fetchMoviesByGenreAPI(genreId, page, limit);
const movies = response.data.result;
```

---

### 🔐 **AUTH API** (Đăng nhập, Đăng ký)

```javascript
import {
  registerUserAPI,
  loginUserAPI,
  getAccountAPI,
  logOutAPI,
  forgotPasswordAPI,
  resetPasswordAPI,
} from "../services/movieService";

// Đăng ký
await registerUserAPI(fullName, email, password, phone);

// Đăng nhập
await loginUserAPI(email, password);

// Lấy thông tin tài khoản
const response = await getAccountAPI();
const user = response.data;

// Đăng xuất
await logOutAPI();

// Quên mật khẩu
await forgotPasswordAPI(email);

// Reset mật khẩu
await resetPasswordAPI(token, newPassword);
```

---

### 👤 **USER API** (Profile, Avatar)

```javascript
import {
  getUserProfileAPI,
  updateUserProfileAPI,
  changePasswordAPI,
} from "../services/movieService";

// Lấy profile
const response = await getUserProfileAPI();
const profile = response.data;

// Cập nhật profile
await updateUserProfileAPI(userId, fullName, phone, avatar);

// Đổi mật khẩu
await changePasswordAPI(oldPassword, newPassword);
```

---

### 📤 **FILE UPLOAD API**

```javascript
import { handleUploadFile } from "../services/movieService";

// Upload avatar
const file = e.target.files[0];
const response = await handleUploadFile(file, "avatar");
const avatarUrl = response.data.fileUrl;
```

---

### 💬 **COMMENT API** (Bình luận phim)

```javascript
import {
  fetchMovieCommentsAPI,
  createCommentAPI,
  replyToCommentAPI,
  likeCommentAPI,
  dislikeCommentAPI,
  deleteCommentAPI,
  hideCommentAPI,
  reportCommentAPI,
} from "../services/movieService";

// Lấy danh sách bình luận
const response = await fetchMovieCommentsAPI(movieId, current, pageSize);
const comments = response.data.result;

// Tạo bình luận
await createCommentAPI(movieId, content, isSpoiler);

// Trả lời bình luận
await replyToCommentAPI(commentId, content);

// Like/Dislike
await likeCommentAPI(commentId);
await dislikeCommentAPI(commentId);

// Xóa bình luận
await deleteCommentAPI(commentId);

// Ẩn bình luận
await hideCommentAPI(commentId);

// Báo cáo bình luận
await reportCommentAPI(commentId, reason);
```

---

### 📋 **WATCHLIST API** (Danh sách xem sau)

```javascript
import {
  getWatchlistAPI,
  addToWatchlistAPI,
  removeFromWatchlistAPI,
  checkInWatchlistAPI,
} from "../services/movieService";

// Lấy danh sách
const response = await getWatchlistAPI(current, pageSize);
const watchlist = response.data.result;

// Thêm phim
await addToWatchlistAPI(movieId, movieData);

// Xóa phim
await removeFromWatchlistAPI(movieId);

// Kiểm tra phim có trong danh sách
const response = await checkInWatchlistAPI(movieId);
const isInWatchlist = response.data.inWatchlist;
```

---

### ❤️ **FAVORITES API** (Danh sách yêu thích)

```javascript
import {
  getFavoritesAPI,
  addToFavoritesAPI,
  removeFromFavoritesAPI,
} from "../services/movieService";

// Lấy danh sách
const response = await getFavoritesAPI(current, pageSize);
const favorites = response.data.result;

// Thêm phim
await addToFavoritesAPI(movieId, movieData);

// Xóa phim
await removeFromFavoritesAPI(movieId);
```

---

### 📜 **WATCH HISTORY API** (Lịch sử xem)

```javascript
import {
  getWatchHistoryAPI,
  addToWatchHistoryAPI,
  clearWatchHistoryAPI,
} from "../services/movieService";

// Lấy lịch sử
const response = await getWatchHistoryAPI(current, pageSize);
const history = response.data.result;

// Thêm phim vào lịch sử
await addToWatchHistoryAPI(movieId, movieData);

// Xóa toàn bộ lịch sử
await clearWatchHistoryAPI();
```

---

## 🔐 Authentication Flow

### Request Flow với Token:

1. **User đăng nhập** → Backend trả về `token`
2. **Lưu token vào localStorage**: `localStorage.setItem("token", token)`
3. **Mọi request tiếp theo** → Request Interceptor tự động thêm token vào header:
   ```
   Authorization: Bearer <token>
   ```
4. **Nếu token hết hạn** (401) → Response Interceptor tự động:
   - Xóa token khỏi localStorage
   - Redirect về `/login`

### Không cần thêm header thủ công!

❌ **KHÔNG CẦN:**

```javascript
axios.get("/user/profile", {
  headers: { Authorization: `Bearer ${token}` },
});
```

✅ **CHỈ CẦN:**

```javascript
getUserProfileAPI(); // Token tự động được thêm!
```

---

## 🌍 Environment Variables

### File: `.env.development` (Development)

```env
VITE_BACKEND_URL=http://localhost:8080
```

### File: `.env.production` (Production)

```env
VITE_BACKEND_URL=http://localhost:8080
```

**Cách sử dụng:**

- Vite tự động load file `.env.development` khi chạy `npm run dev`
- Vite tự động load file `.env.production` khi chạy `npm run build`
- Truy cập biến môi trường: `import.meta.env.VITE_BACKEND_URL`

---

## 🎯 Best Practices

### 1. **Sử dụng try-catch**

```javascript
try {
  const response = await fetchPopularMovies();
  setMovies(response.data.results);
} catch (error) {
  console.error("Error:", error);
  setError("Không thể tải phim");
}
```

### 2. **Xử lý loading state**

```javascript
const [loading, setLoading] = useState(false);

try {
  setLoading(true);
  const response = await fetchPopularMovies();
  setMovies(response.data.results);
} catch (error) {
  console.error(error);
} finally {
  setLoading(false);
}
```

### 3. **Lưu token sau khi đăng nhập**

```javascript
const handleLogin = async () => {
  try {
    const response = await loginUserAPI(email, password);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    navigate("/home");
  } catch (error) {
    console.error(error);
  }
};
```

---

## ⚙️ Cấu trúc API Response

### TMDB API Response:

```javascript
{
  data: {
    results: [...],
    page: 1,
    total_pages: 500,
    total_results: 10000
  }
}
```

### Backend API Response:

```javascript
{
  data: {
    result: [...],
    meta: {
      current: 1,
      pageSize: 10,
      total: 100
    }
  }
}
```

---

## 🚀 Quick Start

```javascript
// 1. Import API functions
import { fetchPopularMovies } from "../services/movieService";

// 2. Call API
const response = await fetchPopularMovies();
const movies = response.data.results;

// 3. Done! Token tự động được thêm vào header nếu cần
```
