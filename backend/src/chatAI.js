const axios = require("axios");

// Đảm bảo bạn đã gọi dotenv ở index.js
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

function setupChatAI(io) {
    io.on("connection", (socket) => {
        console.log("🟢 User connected:", socket.id);

        socket.on("send_message", async (message) => {
            try {
                const contents = [{ role: "user", parts: [{ text: message }] }];
                const result = await axios.post(API_URL, { contents }, {
                    headers: { "Content-Type": "application/json" },
                });

                const reply = result.data.candidates?.[0]?.content?.parts?.[0]?.text || "Không có phản hồi.";
                socket.emit("receive_message", reply);
            } catch (err) {
                console.error("❌ Lỗi gọi Gemini:", err.response?.data || err.message);
                socket.emit("receive_message", "Lỗi khi gọi Gemini API.");
            }
        });


        socket.on("disconnect", () => {
            console.log("🔴 User disconnected:", socket.id);
        });
    });
}

module.exports = setupChatAI;
