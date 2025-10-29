# MovieDetail Components

Các component con được tách ra từ trang `MovieDetail` để dễ quản lý và tái sử dụng.

## Cấu trúc

```
MovieDetail/
├── index.js              # Export tất cả components
├── MovieSidebar.jsx      # Sidebar bên trái với poster và thông tin phim
├── MovieActions.jsx      # Các nút hành động (Play, Yêu thích, Chia sẻ,...)
├── MovieRating.jsx       # Phần đánh giá phim
├── MovieTabs.jsx         # Tabs và nội dung tabs (Tập phim, Gallery,...)
├── MovieComments.jsx     # Phần bình luận chính
├── CommentInput.jsx      # Input để nhập bình luận
├── CommentItem.jsx       # Từng item bình luận
└── README.md            # File này
```

## Cách sử dụng

### Import tất cả components

```jsx
import {
  MovieActions,
  MovieRating,
  MovieSidebar,
  MovieTabs,
} from "../components/MovieDetail";
```

### Hoặc import riêng lẻ

```jsx
import MovieSidebar from "../components/MovieDetail/MovieSidebar";
import MovieActions from "../components/MovieDetail/MovieActions";
```

## Components

### 1. MovieSidebar

Hiển thị thông tin chi tiết phim ở sidebar bên trái.

**Props:**

- `movie` (object): Đối tượng chứa thông tin phim
  - `posterUrl`: URL ảnh poster
  - `title`: Tên phim
  - `originalTitle`: Tên gốc
  - `imdb`: Điểm IMDb
  - `rating`: Phân loại độ tuổi
  - `quality`: Chất lượng video
  - `duration`: Thời lượng
  - `genres`: Mảng thể loại
  - `overview`: Mô tả phim
  - `fullDuration`: Thời lượng đầy đủ
  - `country`: Quốc gia
  - `production`: Nhà sản xuất
  - `director`: Đạo diễn

**Ví dụ:**

```jsx
<MovieSidebar movie={movieData} />
```

### 2. MovieActions

Hiển thị các nút hành động.

**Props:** Không có

**Ví dụ:**

```jsx
<MovieActions />
```

### 3. MovieRating

Hiển thị đánh giá và nút đánh giá.

**Props:**

- `ratingScore` (number): Điểm đánh giá
- `ratingCount` (number): Số lượng đánh giá

**Ví dụ:**

```jsx
<MovieRating ratingScore={6.5} ratingCount={120} />
```

### 4. MovieTabs

Hiển thị tabs và nội dung tương ứng.

**Props:**

- `movie` (object): Đối tượng chứa thông tin phim (dùng cho tab Episodes)

**Ví dụ:**

```jsx
<MovieTabs movie={movieData} />
```

### 5. MovieComments

Hiển thị phần bình luận với input và danh sách comments.

**Props:**

- `commentCount` (number): Số lượng bình luận (mặc định: 52)

**Ví dụ:**

```jsx
<MovieComments commentCount={120} />
```

### 6. CommentInput

Component input để viết bình luận (được sử dụng bên trong MovieComments).

**Props:** Không có

### 7. CommentItem

Component hiển thị từng bình luận (được sử dụng bên trong MovieComments).

**Props:**

- `comment` (object): Đối tượng bình luận
  - `id`: ID bình luận
  - `author`: Tên người bình luận
  - `badge`: Badge của user (∞, 👑, v.v.)
  - `badgeType`: Loại badge (infinity, vip)
  - `avatar`: URL avatar
  - `time`: Thời gian bình luận
  - `text`: Nội dung bình luận

**Ví dụ:**

```jsx
<CommentItem
  comment={{
    id: 1,
    author: "User Name",
    badge: "∞",
    badgeType: "infinity",
    avatar: "https://...",
    time: "2 giờ trước",
    text: "Phim hay quá!",
  }}
/>
```

## Lưu ý

- Tất cả components đều sử dụng class CSS từ `MovieDetail.scss`
- State quản lý tabs được đặt trong `MovieTabs` component
- Dữ liệu comments mẫu được đặt trong `MovieComments.jsx`
- Có thể mở rộng thêm các component khác như `MovieBackdrop`, v.v.
