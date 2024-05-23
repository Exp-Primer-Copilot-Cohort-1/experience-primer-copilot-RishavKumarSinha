// Create web server
// Use express to create web server
const express = require('express');
const app = express();
const port = 3000;

// Use body-parser to parse request body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Comments data
var comments = [
  { id: 1, author: 'John', content: 'Hello' },
  { id: 2, author: 'Jane', content: 'Hi' },
  { id: 3, author: 'Alice', content: 'Good morning' }
];

// GET /comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// GET /comments/:id
app.get('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.find(comment => comment.id === id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

// POST /comments
app.post('/comments', (req, res) => {
  const id = comments.length + 1;
  const comment = { id, ...req.body };
  comments.push(comment);
  res.status(201).json(comment);
});

// PUT /comments/:id
app.put('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.find(comment => comment.id === id);
  if (comment) {
    Object.assign(comment, req.body);
    res.json(comment);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = comments.findIndex(comment => comment.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});