# Watch Components

Components cho trang xem phim (Watch page).

## Components

### 1. VideoPlayer

Hiển thị video player với các tính năng:

- Iframe video player
- Skip intro button
- Play overlay khi dùng backdrop
- Responsive aspect ratio 16:9

**Props:**

- `videoUrl` (string): URL của video
- `backdrop` (string): URL ảnh backdrop
- `title` (string): Tiêu đề phim

### 2. WatchInfo

Hiển thị thông tin phim dưới video player:

- Action buttons (Yêu thích, Thêm vào, Bỏ qua intro, etc.)
- Tabs (Tập phim, Gallery, Diễn viên)
- Movie info với poster nhỏ
- Meta information (IMDb, rating, năm, thời lượng)
- Genres
- Description với nút "Thông tin phim"
- Rating và link bình luận

**Props:**

- `movie` (object): Object chứa thông tin phim
  - `title`: Tên phim
  - `originalTitle`: Tên gốc
  - `imdb`: Điểm IMDb
  - `rating`: Phân loại (T16, T18, etc.)
  - `year`: Năm phát hành
  - `duration`: Thời lượng
  - `genres`: Mảng thể loại
  - `description`: Mô tả phim

### 3. RecommendedMovies

Sidebar hiển thị danh sách phim đề xuất:

- List các phim tương tự
- Hover effect với play overlay
- Meta info cho mỗi phim
- Load more button

**Props:**

- `currentMovieId` (number): ID phim đang xem (để filter)

## Usage

```jsx
import { VideoPlayer, WatchInfo, RecommendedMovies } from "../components/Watch";
import { MovieComments } from "../components/MovieDetail";

const Watch = () => {
  const movieData = {
    id: 1,
    title: "Tài Xế Giao Hàng",
    // ... other fields
  };

  return (
    <div className="watch-page">
      <VideoPlayer
        videoUrl={movieData.videoUrl}
        backdrop={movieData.backdrop}
        title={movieData.title}
      />

      <div className="watch-content">
        <div className="watch-main">
          <WatchInfo movie={movieData} />
          <MovieComments commentCount={52} />
        </div>

        <aside className="watch-sidebar">
          <RecommendedMovies currentMovieId={movieData.id} />
        </aside>
      </div>
    </div>
  );
};
```

## Layout

```
┌─────────────────────────────────────────┐
│         VIDEO PLAYER (16:9)             │
│         [Skip Intro Button]             │
└─────────────────────────────────────────┘
┌──────────────────────┬──────────────────┐
│ WATCH INFO           │ RECOMMENDED      │
│ - Action Buttons     │ MOVIES           │
│ - Tabs               │ - Movie 1        │
│ - Movie Details      │ - Movie 2        │
│ - Rating             │ - Movie 3        │
│                      │ - Movie 4        │
│ COMMENTS             │ - Movie 5        │
│ - Input              │ [Load More]      │
│ - Comment List       │                  │
└──────────────────────┴──────────────────┘
```

## Responsive

- **Desktop (> 968px)**: 2 columns (main + sidebar)
- **Tablet/Mobile (< 968px)**: 1 column, sidebar dưới main
- **Mobile (< 640px)**: Compact UI với smaller fonts và padding

## Styling

File SCSS: `src/pages/Watch.scss`

Các biến màu:

- Primary: `#ff8c00`
- Background: `#0b1220`, `#151f30`
- Text: `#ffffff`, `#9ca3af`
