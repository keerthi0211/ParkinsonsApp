// server/server.js
const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const cors = require('cors');
const translateText = require('./translation');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/ask', async (req, res) => {
  const { question, language } = req.body;
  const translatedQuestion = await translateText(question, 'en');
  // Code to search through Google Drive documents and find relevant answers
  res.json({ answer: 'Relevant answer from documents' });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
