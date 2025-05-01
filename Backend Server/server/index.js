const express = require('express');
const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Real-time chat server is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
