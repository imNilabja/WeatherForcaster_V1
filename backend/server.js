import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

app.use(cors());

// Serve static files from the 'public/songs' directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/songs', express.static(path.resolve(__dirname, '..', 'public', 'songs')));

app.get('/cloudy', (req, res) => {
  const directoryPath = path.resolve(__dirname, '..', 'public', 'songs', 'cloudy');
  console.log('directoryPath:', directoryPath);

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).send('Unable to scan directory: ' + err.message);
    }
    res.send(files);
  });
});

app.get('/rainy', (req, res) => {
  const directoryPath = path.resolve(__dirname, '..', 'public', 'songs', 'rainy');
  console.log('directoryPath:', directoryPath);

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).send('Unable to scan directory: ' + err.message);
    }
    res.send(files);
  });
});

app.get('/sunny', (req, res) => {
  const directoryPath = path.resolve(__dirname, '..', 'public', 'songs', 'sunny');
  console.log('directoryPath:', directoryPath);

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).send('Unable to scan directory: ' + err.message);
    }
    res.send(files);
  });
});

app.get('/snowy', (req, res) => {
  const directoryPath = path.resolve(__dirname, '..', 'public', 'songs', 'snowy');
  console.log('directoryPath:', directoryPath);

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).send('Unable to scan directory: ' + err.message);
    }
    res.send(files);
  });
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
