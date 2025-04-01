const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

const feedbacks = [];

app.use(cors());
app.use(express.json());

app.get("/feedback", (req, res) => {
  res.json(feedbacks);
});

app.post("/feedback", (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: "이름과 메시지를 입력하세요." });
  }
  const newFeedback = { name, message, createdAt: new Date().toISOString() };
  feedbacks.push(newFeedback);
  console.log("📬 새 피드백 등록:", newFeedback); // 요청 확인 로그 추가
  res.status(201).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`✅ Express 서버가 포트 ${PORT}에서 실행 중입니다.`);
});