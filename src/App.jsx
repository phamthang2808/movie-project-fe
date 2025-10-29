import NProgress from "nprogress";
import { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";
import Recharge from "./pages/Recharge";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Series from "./pages/Series";
import Watch from "./pages/Watch";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  minimum: 0.1,
});

function App() {
  const HideFooterRoutes = ["/login", "/register"];
  const location = useLocation();
  const shouldHideFooter = HideFooterRoutes.includes(location.pathname);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    NProgress.start();

    const timer = setTimeout(() => {
      setIsLoading(false);
      NProgress.done();
      window.scrollTo(0, 0);
    }, 800);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location.pathname]);

  return (
    <div className="app">
      {isLoading && <Loading />}
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
          <Route path="/account" element={<Account />} />
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
