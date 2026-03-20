import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const port = 3001;

app.use(cors());

// store file in memory (simple for now)
const upload = multer({ storage: multer.memoryStorage() });

app.get("/", (_req, res) => {
  res.json({ message: "Ad Oracle backend is running" });
});

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  console.log("Received file:", file.originalname);

  res.json({
    message: "File received successfully",
    filename: file.originalname,
    size: file.size,
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
