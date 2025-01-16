const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const countersFile = path.join(__dirname, '../counters.json');
const historyFile = path.join(__dirname, '../history.json');
const usersFile = path.join(__dirname, '../users.json');

// Initialize counters if the file doesn't exist
if (!fs.existsSync(countersFile)) {
    fs.writeFileSync(countersFile, JSON.stringify({
        "11": 0,
        "12": 0,
        "21": 0,
        "31": 0,
        "32": 0,
        "51": 0,
        "52": 0,
        "59": 0
    }));
}

// Initialize history if the file doesn't exist
if (!fs.existsSync(historyFile)) {
    fs.writeFileSync(historyFile, JSON.stringify([]));
}

app.get('/users', (req, res) => {
    fs.readFile(usersFile, (err, data) => {
        if (err) {
            res.status(500).send('Error reading users file');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.get('/counters', (req, res) => {
    const counters = JSON.parse(fs.readFileSync(countersFile));
    res.json(counters);
});

app.post('/counters', (req, res) => {
    const counters = req.body;
    fs.writeFileSync(countersFile, JSON.stringify(counters));
    res.status(200).send('Counters updated');
});

app.get('/history', (req, res) => {
    const history = JSON.parse(fs.readFileSync(historyFile));
    res.json(history);
});

app.post('/history', (req, res) => {
    const history = req.body;
    fs.writeFileSync(historyFile, JSON.stringify(history));
    res.sendStatus(200);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ipnWebsite.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});