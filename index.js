const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

const feedbacks = [];

app.use(cors());
app.use(express.json());

// 모든 피드백 조회
app.get("/feedback", (req, res) => {
  res.json(feedbacks);
});

// 피드백 저장
app.post("/feedback", (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: "이름과 메시지를 입력하세요." });
  }
  const id = Date.now().toString(); // 고유 ID 생성
  const newFeedback = { id, name, message, createdAt: new Date().toISOString() };
  feedbacks.push(newFeedback);
  console.log("📬 새 피드백 등록:", newFeedback); // 요청 확인 로그 추가
  res.status(201).json({ success: true });
});

// 피드백 삭제
app.delete("/feedback/:id", (req, res) => {
  const { id } = req.params;
  const index = feedbacks.findIndex((fb) => fb.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "피드백을 찾을 수 없습니다." });
  }

  feedbacks.splice(index, 1); // 해당 피드백 삭제
  res.status(200).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`✅ Express 서버가 포트 ${PORT}에서 실행 중입니다.`);
});
