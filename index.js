const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Nothing to see here' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
