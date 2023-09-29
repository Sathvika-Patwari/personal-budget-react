// Budget API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3004;
const BudgetDataJSON = require('./budgetData.json');

app.use('/heyo',express.static('public'));

app.use(cors());

app.get('/budget', (req, res) => {
    res.json(BudgetDataJSON);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});