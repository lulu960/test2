import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import axios from 'axios';
import auth from '../middleware/authMiddleware.js';
import Summary from '../models/Summary.js';

const router = express.Router();
const upload = multer();

router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    const data = await pdfParse(req.file.buffer);
    const text = data.text;
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      { inputs: text },
      { headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` } }
    );
    const summaryText = response.data[0]?.summary_text || '';
    const summary = new Summary({
      userId: req.user,
      text,
      summary: summaryText
    });
    await summary.save();
    res.json({ summary: summaryText });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
