const express = require('express');
const cors = require('cors');  // Optional: Helps with testing
const app = express();
const port = 3000;

// Middleware to parse JSON bodies (must come before routes)
app.use(express.json());
app.use(cors());  // Optional: Allows cross-origin requests

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
    res.send('Hello, World');
});

// About route
app.get('/about', (req, res) => {
    res.send('About Us');
});

// In-memory items list (resets on server restart)
const items = ['Apple', 'Banana', 'Orange'];

// GET /items - Retrieve all items
app.get('/items', (req, res) => {
    res.json(items);
});

// POST /items - Add new item
app.post('/items', (req, res) => {
    const newItem = req.body.item;
    if (!newItem) {
        return res.status(400).json({ error: 'Item is required' });
    }
    items.push(newItem);
    res.json(items);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
