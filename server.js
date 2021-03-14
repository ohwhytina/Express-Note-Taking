const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require("./db/db.json");

const PORT = process.env.PORT || 3006;
const app = express();

var saveNote = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// pull note.html
app.get( '/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


// show note.html
app.get("/api/notes", (req, res) => {
    return res.json(saveNote)
    
});


// go back to main page
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});



// save notes! 
app.post('/api/notes', (req, res) => {
    var newNote = req.body;
    newNote.id = saveNote.length.toString()
    saveNote.push(newNote);
    
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(saveNote)
    );
    console.log(saveNote);
    res.json(saveNote)
});

// delete notes 
app.delete('/api/notes/:id', (req, res) => {
    var noteId = req.params.id;
    var newId = 0;
    saveNote = saveNote.filter(List => {
        return List.id != noteId
    })
    for (List of saveNote) {
        List.id = newId.toString();
        newId++;
    }

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(saveNote)
    );
    console.log(saveNote);
    res.json(saveNote)
})



app.listen(PORT, () => { 
    console.log(`API server now on port ${PORT}!`);
})
