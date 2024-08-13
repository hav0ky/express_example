const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Nothing to see here' });
});

app.post('/api/deploy', (req, res) => {
  const { repoUrl } = req.body;

  // SSH and deployment commands
  const command = `
    ssh user@your-vm-ip 'docker run -d --name my-app -v /var/www:/var/www -w /var/www node:14 git clone ${repoUrl} . && npm install && npm start'
  `;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error deploying repo: ${stderr}`);
      return res.status(500).json({ error: 'Deployment failed' });
    }
    console.log(`Deployment output: ${stdout}`);
    res.status(200).json({ message: 'Deployment started' });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
