// server.js
const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// ─── Part A: In‑Memory Cart ─────────────────────────────────────────
let cart = {};

// Get the entire cart
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// Add one item to the cart
app.post('/api/cart/add', (req, res) => {
  const { productId } = req.body;
  cart[productId] = (cart[productId] || 0) + 1;
  console.log(`/add/${productId} → ${productId} count: ${cart[productId]}`);
  res.json({ quantity: cart[productId] });
});

// Remove one item from the cart
app.post('/api/cart/remove', (req, res) => {
  const { productId } = req.body;
  cart[productId] = Math.max((cart[productId] || 0) - 1, 0);
  console.log(`/remove/${productId} → ${productId} count: ${cart[productId]}`);
  res.json({ quantity: cart[productId] });
});


// ─── Part B & C: Task Management (MongoDB) ──────────────────────────
let tasks = [];

// Return current list of tasks
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json({ tasks });
});


app.get('/api/add/:task', (req, res) => {
  const t = req.params.task;
  tasks.push(t);
  console.log(tasks);
  res.json({ tasks });
});

// Connect to MongoDB “test” database
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser:    true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Mongo connection error:', err));

// Define Task schema & model
const TaskSchema = new mongoose.Schema({
  title:   String,
  content: String
});
const Task = mongoose.model('Task', TaskSchema);

// Add a task
app.get('/api/add/:title/:content', async (req, res) => {
  const { title, content } = req.params;
  await Task.create({ title, content });
  const tasks = await Task.find();
  console.log('Tasks after add:', tasks);
  res.json({ tasks });
});

// Clear all tasks
app.get('/api/clear', async (req, res) => {
  await Task.deleteMany({});
  console.log('all tasks cleared');
  res.json({ message: 'all tasks cleared', tasks: [] });
});

// Delete a single task by title
app.get('/api/delete/:title', async (req, res) => {
  await Task.deleteOne({ title: req.params.title });
  const tasks = await Task.find();
  console.log('Tasks after delete:', tasks);
  res.json({ tasks });
});

// Update a task
app.get('/api/update/:oldTitle/:newTitle/:newContent', async (req, res) => {
  const { oldTitle, newTitle, newContent } = req.params;
  await Task.updateOne(
    { title: oldTitle },
    { title: newTitle, content: newContent }
  );
  const tasks = await Task.find();
  console.log('Tasks after update:', tasks);
  res.json({ tasks });
});


// ─── Start the server ────────────────────────────────────────────────
const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
