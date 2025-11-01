import NProgress from "nprogress";
import { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.scss";
import AdminLayout from "./components/Admin/AdminLayout";
import ChatBox from "./components/ChatBox";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import StaffLayout from "./components/Staff/StaffLayout";
import Account from "./pages/Account";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminMovies from "./pages/Admin/Movies";
import AdminUsers from "./pages/Admin/Users";
import GoogleCallback from "./pages/Auth/GoogleCallback";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Recharge from "./pages/Recharge";
import VnpayReturn from "./pages/Recharge/VnpayReturn";
import Search from "./pages/Search";
import Series from "./pages/Series";
import StaffComments from "./pages/Staff/Comments";
import StaffDashboard from "./pages/Staff/Dashboard";
import StaffMovies from "./pages/Staff/Movies";
import StaffReports from "./pages/Staff/Reports";
import Watch from "./pages/Watch";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  minimum: 0.1,
});

function App() {
  const HideFooterRoutes = [
    "/login",
    "/register",
    "/verify-email",
    "/auth/google/callback",
  ];
  const location = useLocation();
  const shouldHideFooter = HideFooterRoutes.includes(location.pathname);
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isStaffRoute = location.pathname.startsWith("/staff");
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
      {!isAdminRoute && !isStaffRoute && <Header />}
      <main className={isAdminRoute || isStaffRoute ? "" : "main-content"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<MovieDetail />} />
          <Route path="/phim-bo" element={<Series />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/recharge" element={<Recharge />} />
          <Route path="/vnpay/return" element={<VnpayReturn />} />
          <Route path="/account" element={<Account />} />

          {/* Staff Routes - Chỉ staff mới vào được */}
          <Route
            path="/staff"
            element={
              <ProtectedRoute allowedRoles={["staff"]}>
                <StaffLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StaffDashboard />} />
            <Route path="movies" element={<StaffMovies />} />
            <Route path="comments" element={<StaffComments />} />
            <Route path="reports" element={<StaffReports />} />
          </Route>

          {/* Admin Routes - Chỉ admin mới vào được */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="movies" element={<AdminMovies />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </main>
      {!shouldHideFooter && !isAdminRoute && !isStaffRoute && <Footer />}
      {!isAdminRoute && !isStaffRoute && <ChatBox />}
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
