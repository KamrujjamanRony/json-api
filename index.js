const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;
// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json("Welcome to my World!");
});

app.get('/api/software', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./software.json', 'utf-8'));
  res.json(data);
});

app.get('/api/software/:id', (req, res) => {
  const id = req.params.id;
  const data = JSON.parse(fs.readFileSync('./software.json', 'utf-8'));
  const record = data.find(record => record.id == id);

  if (record) {
    res.json(record);
  } else {
    res.status(404).json({ error: 'Record not found' });
  }
});

app.post('/api/software', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./software.json', 'utf-8'));
  const newRecord = req.body;
  newRecord.id = generateUniqueId();
  data.push(newRecord);

  fs.writeFileSync('./software.json', JSON.stringify(data, null, 2));
  res.json(newRecord);
});

app.put('/api/software/:id', (req, res) => {
  const id = req.params.id;
  const data = JSON.parse(fs.readFileSync('./software.json', 'utf-8'));
  const updatedRecord = req.body;
  updatedRecord.id = id;

  const index = data.findIndex(record => record.id == id);

  if (index !== -1) {
    data[index] = updatedRecord;
    fs.writeFileSync('./software.json', JSON.stringify(data, null, 2));
    res.json(updatedRecord);
  } else {
    res.status(404).json({ error: 'Record not found' });
  }
});

app.delete('/api/software/:id', (req, res) => {
  const id = req.params.id;
  const data = JSON.parse(fs.readFileSync('./software.json', 'utf-8'));
  const index = data.findIndex(record => record.id == id);

  if (index !== -1) {
    const deletedRecord = data.splice(index, 1)[0];
    fs.writeFileSync('./software.json', JSON.stringify(data, null, 2));
    res.json(deletedRecord);
  } else {
    res.status(404).json({ error: 'Record not found' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
function generateUniqueId() {
  return ((Math.random() * 9999999999 * Math.random() * 55555) - (Math.random() * 1111111111)).toString().split('.')[0];
}