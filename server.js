const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require("./db/db.json");

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// pull note.html
app.get( '/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// show note.html
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// go back to main page
app.get( '/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});



// save notes! 
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    const saveNote = JSON.parse(fs.readFileSync("./db/db.json"));
    const newId = saveNote.length.toString();
    newNote.id = newId;
    saveNote.push(newNote);
    
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(saveNote)
    );
    console.log(saveNote);
    res.json(saveNote)
});

// delete notes 




app.listen(PORT, () => { 
    console.log(`API server now on port ${PORT}!`);
})
