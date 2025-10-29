import { ArrowLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VideoPlayer = ({ videoUrl, backdrop, title, movie }) => {
  const [showVideo, setShowVideo] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="video-player-section">
      {/* Movie Header Info */}
      <div className="video-header-info">
        <div className="container-video">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            <span>Quay lại</span>
          </button>

          <div className="header-movie-info">
            <h1 className="header-movie-title">{movie?.title}</h1>
          </div>
        </div>
      </div>
      {/* Video Wrapper with Container */}
      <div className="video-wrapper">
        <div className="container-video">
          {/* Skip Intro Button */}
          <button className="skip-intro-btn">
            Bỏ qua <ChevronRight size={16} />
          </button>

          {/* Video Container */}
          <div className="video-container">
            {showVideo ? (
              <iframe
                src={videoUrl}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-iframe"
              ></iframe>
            ) : (
              <div
                className="video-backdrop"
                style={{ backgroundImage: `url(${backdrop})` }}
              >
                <button
                  className="play-overlay-btn"
                  onClick={() => setShowVideo(true)}
                >
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="40" cy="40" r="40" fill="rgba(0,0,0,0.7)" />
                    <path
                      d="M32 25L55 40L32 55V25Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
