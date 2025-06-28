import React, { useState, useRef, useEffect } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import Swal from "sweetalert2";
import { io } from "socket.io-client";
import "./AIChatBox.css";

const socket = io("http://localhost:3001");

const AIChatBox = ({ onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const chatRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        type: "bot",
        content: "👋 Xin chào! 🤖 Tôi có thể hỗ trợ gì cho bạn hôm nay?",
      },
    ]);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  useEffect(() => {
    socket.on("receive_message", (reply) => {
      setMessages((prev) => [...prev, { type: "bot", content: reply }]);
      setLoading(false);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const handleSend = () => {
    if (!message.trim() && !fileData) return;

    const newMessage = {
      type: "user",
      content: message.trim(),
      file: fileData || null,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    setFileData(null);
    setLoading(true);

    socket.emit("send_message", message.trim());
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      Swal.fire("Lỗi", "Chỉ chấp nhận file ảnh!", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      setFileData({ data: base64, mime_type: file.type });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <span className="chatbot-header-icon">⚡</span>
        <span>Trợ lý điện tử</span>
        <button className="chatbot-close-btn" onClick={onClose}>
          ✖
        </button>
      </div>

      <div ref={chatRef} className="chatbot-body">
        {messages.map((msg, i) => (
          <div key={i} className={`chatbot-msg ${msg.type}`}>
            {msg.content.split("\n").map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                <br />
              </React.Fragment>
            ))}
            {msg.file && (
              <img
                src={`data:${msg.file.mime_type};base64,${msg.file.data}`}
                alt="attachment"
                style={{ marginTop: 8, maxWidth: 150, borderRadius: 8 }}
              />
            )}
          </div>
        ))}
        {loading && (
          <div className="chatbot-loading">🤖 AI đang trả lời...</div>
        )}
      </div>

      <div className="chatbot-footer">
        <div className="chatbot-input-row">
          <label className="chatbot-icon-btn" title="Gửi ảnh">
            📎
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>

          <div className="chatbot-input-wrapper">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập tin nhắn..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              ref={inputRef}
            />
            <button
              className="chatbot-emoji-inside"
              onClick={() => setShowEmoji(!showEmoji)}
            >
              😊
            </button>
          </div>

          <button
            className="chatbot-send-btn"
            onClick={handleSend}
            disabled={loading}
          >
            ➤
          </button>
        </div>

        {showEmoji && (
          <div className="chatbot-emoji-picker">
            <Picker
              data={data}
              onEmojiSelect={(emoji) => setMessage((prev) => prev + emoji.native)}
              theme="light"
            />
          </div>
        )}
      </div>



    </div>
  );
};

export default AIChatBox;
