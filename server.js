const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.post('/collect', async (req, res) => {
    const data = req.body;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = path.join(__dirname, 'data', `${timestamp}.json`);
    await fs.writeFile(filename, JSON.stringify(data, null, 2));
    res.sendStatus(200);
});
app.listen(3000, () => console.log('Server running on port 3000'));