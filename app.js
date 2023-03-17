const express = require('express');
const { runNmapWorker } = require('./nmapWorker');

const app = express();
const port = 3001;

app.use(express.json());

app.post('/api/nmap', (req, res) => {
  const { target } = req.body;
  runNmapWorker(target, (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send(result);
    }
  })
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
