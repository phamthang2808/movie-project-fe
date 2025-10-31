import { MessageCircle, Minimize2, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import chatBg from "../../assets/images/main.svg";
import { chatApi } from "../../services/api/chatApi";
import "./ChatBox.scss";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "bot",
      content: "Xin chào! Tôi có thể giúp gì cho bạn?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus vào input khi mở chat
      setTimeout(() => inputRef.current?.focus(), 100);
      // Thêm class vào body để ẩn nút scroll to top
      document.body.classList.add("chatbox-open");
    } else {
      // Xóa class khi đóng chatbox
      document.body.classList.remove("chatbox-open");
    }
    return () => {
      document.body.classList.remove("chatbox-open");
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await chatApi.sendMessage(userMessage.content);

      // Response đã là string từ chatApi.sendMessage()
      const botMessage = {
        id: Date.now() + 1,
        role: "bot",
        content: response || "Xin lỗi, tôi không thể trả lời lúc này.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      let errorMessage =
        "Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau!";

      // apiRequest có thể throw error.response.data hoặc error
      // Kiểm tra cả 2 trường hợp: axios error và error data
      const errorData = error?.response?.data || error;
      const errorStatus = error?.response?.status;

      // Xử lý trường hợp error là array [{ error: {...} }]
      let parsedError = errorData;
      if (Array.isArray(errorData) && errorData.length > 0) {
        parsedError = errorData[0];
      }

      // Xử lý lỗi 429 - Rate limit (quá nhiều request)
      if (
        errorStatus === 429 ||
        parsedError?.error?.code === 429 ||
        parsedError?.error?.status === "RESOURCE_EXHAUSTED"
      ) {
        errorMessage =
          "⚠️ API đã vượt quá giới hạn lượt truy cập. Vui lòng đợi một chút và thử lại sau!";
      } else if (parsedError) {
        if (typeof parsedError === "string") {
          errorMessage = parsedError;
        } else if (parsedError?.error?.message) {
          // Nếu backend trả về format { error: { message: "..." } }
          errorMessage = parsedError.error.message;
        } else if (parsedError?.message) {
          errorMessage = parsedError.message;
        }
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (
        error?.code === "ECONNABORTED" ||
        error?.message?.includes("timeout")
      ) {
        errorMessage = "Request timeout. Vui lòng thử lại!";
      } else if (error?.code === "ERR_NETWORK" || !error?.response) {
        errorMessage =
          "Không thể kết nối đến server. Vui lòng kiểm tra backend có đang chạy không!";
      }

      const errorMsg = {
        id: Date.now() + 1,
        role: "bot",
        content: errorMessage,
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          className="chatbox-toggle-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Mở chat"
        >
          <MessageCircle size={24} />
          <span className="chatbox-badge">Chat</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="chatbox-container"
          style={{ "--chat-bg-image": `url(${chatBg})` }}
        >
          {/* Header */}
          <div className="chatbox-header">
            <div className="chatbox-header-info">
              <div className="chatbox-avatar">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="chatbox-title">Trợ lý của Thắng cá chép</h3>
                <p className="chatbox-subtitle">
                  Chúng tôi sẽ phản hồi trong giây lát
                </p>
              </div>
            </div>
            <div className="chatbox-header-actions">
              <button
                className="chatbox-icon-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Thu nhỏ"
              >
                <Minimize2 size={18} />
              </button>
              <button
                className="chatbox-icon-btn"
                onClick={() => {
                  setIsOpen(false);
                  setMessages([
                    {
                      id: 1,
                      role: "bot",
                      content: "Xin chào! Tôi có thể giúp gì cho bạn?",
                      timestamp: new Date(),
                    },
                  ]);
                }}
                aria-label="Đóng"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbox-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chatbox-message ${message.role} ${
                  message.isError ? "error" : ""
                }`}
              >
                <div className="chatbox-message-content">
                  {message.role === "bot" && (
                    <div className="chatbox-message-avatar">
                      <MessageCircle size={16} />
                    </div>
                  )}
                  <div className="chatbox-message-bubble">
                    <p>{message.content}</p>
                    <span className="chatbox-message-time">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chatbox-message bot">
                <div className="chatbox-message-content">
                  <div className="chatbox-message-avatar">
                    <MessageCircle size={16} />
                  </div>
                  <div className="chatbox-message-bubble loading">
                    <div className="chatbox-typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form className="chatbox-input-form" onSubmit={handleSendMessage}>
            <div className="chatbox-input-wrapper">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập tin nhắn của bạn..."
                className="chatbox-input"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="chatbox-send-btn"
                disabled={!inputMessage.trim() || isLoading}
                aria-label="Gửi tin nhắn"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBox;
