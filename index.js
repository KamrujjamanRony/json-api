const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require("cors");

const app = express();
const port = 3000;

// middleware
app.use(cors({
    origin: ["https://json-api-g1y2.onrender.com"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
  }));
app.use(bodyParser.json());


app.get('/api/software', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./software.json', 'utf-8'));
  res.json(data);
});

app.post('/api/software', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./software.json', 'utf-8'));
  const newRecord = req.body;
  newRecord.id = generateUniqueId(); // Implement a function to generate a unique ID
  data.push(newRecord);

  fs.writeFileSync('./software.json', JSON.stringify(data, null, 2));
  res.json(data);
});

// Implement other CRUD operations (PUT, DELETE) similarly

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function generateUniqueId() {
    return ((Math.random() * 9999999999 * Math.random() * 55555) - (Math.random() * 1111111111)).toString().split('.')[0];
}
