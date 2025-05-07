import express from 'express';
import chatRoom from './chatroom.js'; // adjust if your router file is named differently

const app = express();

app.use(express.json());

// Mount your chat room routes
app.use('/send', chatRoom);

app.get('/', (req, res) => {
  res.send('Welcome to the main server!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
