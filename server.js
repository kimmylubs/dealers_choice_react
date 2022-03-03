const {syncAndSeed, models:{Boba}} = require('./db');
const express = require('express');
const path = require('path');
const app = express();

// app.use('/dist', express.static(path.join(__dirname,'dist')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname,'index.html')));

app.get('/api/bobas', async(req, res, next) => {
    try{
        res.send(await Boba.findAll())
    } catch(e) {
        next(e)
    }
});


app.get('/api/bobas/:id', async(req, res, next) => {
    try{
        res.send(await Boba.findByPk(req.params.id))
    } catch(e) {
        next(e)
    }
});

const init = async() => {
    try {
        await syncAndSeed();
    } catch(e) {
        next(e)
    }
};

init();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));