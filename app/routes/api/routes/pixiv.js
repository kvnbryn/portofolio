// app/api/routes/pixiv.js
import express from 'express'
const router = express.Router();

// Contoh route sederhana
router.get('/', (req, res) => {
  res.json({ message: 'Pixiv API is working!' });
});

export default router;
