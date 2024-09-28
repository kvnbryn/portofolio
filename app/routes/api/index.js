// app/api/index.js
import express from 'express'
import pixivRouter from './routes/pixiv.js'; // Pastikan ini sesuai path

const app = express();
const port = process.env.PORT || 5000;

// Middleware untuk menangani JSON
app.use(express.json());

// Routes
app.use('/api/pixiv', pixivRouter);

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
