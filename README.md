# MovieBox - Website Xem Phim Online

Website xem phim hiện đại được xây dựng với React, JavaScript, và SCSS.

## Tính năng

- 🎬 Xem danh sách phim phổ biến
- ⭐ Xem phim đánh giá cao nhất
- 🚀 Xem phim sắp ra mắt
- 🔍 Tìm kiếm phim theo tên
- 📱 Responsive design, hoạt động tốt trên mọi thiết bị
- 🎨 Giao diện đẹp, hiện đại

## Công nghệ sử dụng

- **React 18** - UI library
- **JavaScript** - Programming language
- **Vite** - Build tool
- **React Router** - Routing
- **SCSS** - Styling
- **Lucide React** - Icons
- **Axios** - API calls
- **TMDB API** - Movie data

## Cài đặt

1. Cài đặt dependencies:

```bash
npm install
```

2. Chạy development server:

```bash
npm run dev
```

3. Mở browser và truy cập: `http://localhost:5173`

## Build for production

```bash
npm run build
```

## API Key

Project này sử dụng TMDB API. API key demo đã được bao gồm trong code. Để lấy API key riêng của bạn:

1. Đăng ký tại [TMDB](https://www.themoviedb.org/)
2. Tạo API key từ settings
3. Thay thế API key trong `src/services/movieService.js`

## Cấu trúc thư mục

```
src/
├── components/    # Reusable components
├── pages/        # Page components
├── services/     # API services
└── App.jsx       # Main app component
```

## License

MIT
"# movie-project-fe" 
