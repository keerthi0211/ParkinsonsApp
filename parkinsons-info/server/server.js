// server.js
const fs = require('fs');
const readline = require('readline');
const express = require('express');
const { google } = require('googleapis');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const translateText = require('./translation');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const upload = multer({ dest: 'uploads/' });

let oAuth2Client;
fs.readFile('client_secret.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  const credentials = JSON.parse(content);
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  fs.readFile('token.json', (err, token) => {
    if (err) return getAccessToken(oAuth2Client);
    oAuth2Client.setCredentials(JSON.parse(token));
  });
});

function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive.file'],
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      fs.writeFile('token.json', JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', 'token.json');
      });
    });
  });
}

app.post('/upload', upload.single('file'), (req, res) => {
  const drive = google.drive({ version: 'v3', auth: oAuth2Client });
  const fileMetadata = {
    name: req.file.originalname,
  };
  const media = {
    mimeType: req.file.mimetype,
    body: fs.createReadStream(req.file.path),
  };
  drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id',
  }, (err, file) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      console.log('File Id: ', file.id);
      res.status(200).send('File uploaded successfully');
    }
  });
});

app.post('/ask', async (req, res) => {
  const { question, language } = req.body;
  const translatedQuestion = await translateText(question, 'en');
  // Code to search through Google Drive documents and find relevant answers
  res.json({ answer: 'Relevant answer from documents' });
});

app.listen(3001, () => {
  console.log('Server started on http://localhost:3001');
});
