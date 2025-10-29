import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";
import Recharge from "./pages/Recharge";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Series from "./pages/Series";
import Watch from "./pages/Watch";

function App() {
  const HideFooterRoutes = ["/login", "/register"];
  const location = useLocation();
  const shouldHideFooter = HideFooterRoutes.includes(location.pathname);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<MovieDetail />} />
          <Route path="/phim-bo" element={<Series />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/recharge" element={<Recharge />} />
        </Routes>
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
