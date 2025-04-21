const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// ─── Connect to MongoDB "store" database ─────────────────────────────────
const dbName = 'store';
const mongoURI = `mongodb://localhost:27017/${dbName}`;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB database: ${dbName}"))
.catch(err => console.error('MongoDB connection error:', err));

// ─── Define Schemas & Models ────────────────────────────────────────────
const TaskSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  content: { type: String, required: true }
});
const Task = mongoose.model('Task', TaskSchema);

const CartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  quantity:  { type: Number, default: 0 }
});
const CartItem = mongoose.model('CartItem', CartItemSchema);

// ─── Part A: Cart Persistence in MongoDB ─────────────────────────────────

// Get the entire cart
app.get('/api/cart', async (req, res) => {
  const items = await CartItem.find();
  // transform to key:quantity
  const cart = items.reduce((acc, i) => {
    acc[i.productId] = i.quantity;
    return acc;
  }, {});
  res.json(cart);
});

// Add one item to the cart
app.post('/api/cart/add', async (req, res) => {
  const { productId } = req.body;
  const item = await CartItem.findOneAndUpdate(
    { productId },
    { $inc: { quantity: 1 } },
    { upsert: true, new: true }
  );
  res.json({ quantity: item.quantity });
});

// Remove one item from the cart
app.post('/api/cart/remove', async (req, res) => {
  const { productId } = req.body;
  const item = await CartItem.findOne({ productId });
  if (item) {
    item.quantity = Math.max(item.quantity - 1, 0);
    await item.save();
    return res.json({ quantity: item.quantity });
  }
  res.json({ quantity: 0 });
});

// ─── Part B: Task Management ─────────────────────────────────────────────

// Return current list of tasks
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json({ tasks });
});

// Add a task
app.post('/api/tasks', async (req, res) => {
  const { title, content } = req.body;
  const task = await Task.create({ title, content });
  res.status(201).json(task);
});

// Clear all tasks
app.delete('/api/tasks', async (req, res) => {
  await Task.deleteMany({});
  res.json({ message: 'All tasks cleared' });
});

// Delete a single task by title
app.delete('/api/tasks/:title', async (req, res) => {
  const { title } = req.params;
  await Task.deleteOne({ title });
  res.json({ message: "Task '${title}' deleted" });
});

// Update a task by title
app.put('/api/tasks/:oldTitle', async (req, res) => {
  const { oldTitle } = req.params;
  const { newTitle, newContent } = req.body;
  const result = await Task.findOneAndUpdate(
    { title: oldTitle },
    { title: newTitle, content: newContent },
    { new: true }
  );
  res.json(result);
});

// ─── Start the server ───────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server listening on http://localhost:${PORT}"));
