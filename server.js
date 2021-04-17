const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express()
const port = process.env.PORT || 5000

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/favicon.ico', (req, res) => {
    res.end();
})

app.get('/notes', (req, res) => {
    console.log('notes loaded')
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.delete('/api/notes/:id', (req, res) => {
    const dbOld = fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf-8', e => {if(e) console.error(e)})
    let id = req.params.id;
    let objVer = {};
    JSON.parse(dbOld).forEach(e => {
        objVer[e.id] = e;
    })
    delete objVer[id]
    dbNew = Object.values(objVer);
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(dbNew))

    res.json(dbNew)
})

app.get('/api/notes', (req, res) => {
    const db = fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf-8', e => {if(e) console.error(e)})
    res.json(JSON.parse(db));
})

app.post('/api/notes', (req, res) => {
    const dbOld = fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf-8', e => {if(e) console.error(e)})
    let database = JSON.parse(dbOld);
    let note = req.body;
    note.id = note.title + "_" + Math.floor(Math.random()*100000);
    database.push(note);
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(database), e => {if(e) console.error(e);})
    res.end();
})


app.get('*', (req, res) => {
    console.log('index sent')
    res.sendFile(path.join(__dirname, '/public/index.html'))
})





app.listen(port, () => console.log(`App listening on port ${port}!`))