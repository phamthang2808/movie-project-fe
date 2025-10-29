import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="spinner-wrapper">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <div className="loading-text">Đang tải...</div>
      </div>
    </div>
  );
};

export default Loading;
