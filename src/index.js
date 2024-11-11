require('dotenv').config();  // 이 코드가 서버 시작 전에 최상단에 있어야 합니다.
const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the VR API' });
});

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
