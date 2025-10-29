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

## Lưu ý

- Tất cả components đều sử dụng class CSS từ `MovieDetail.scss`
- State quản lý tabs được đặt trong `MovieTabs` component
- Có thể mở rộng thêm các component khác như `MovieBackdrop`, `MovieComments`, v.v.
