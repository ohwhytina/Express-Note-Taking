const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require("./db/db.json");

const PORT = process.env.PORT || 3005;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// pull note.html
app.get( '/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// save notes! 
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    const listNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    const newId = listNotes.length.toString();
    newNote.id = newId;
    listNotes.push(newNote);
    
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(listNotes)
    );
console.log(listNotes);
    res.json(listNotes)

});


app.listen(PORT, () => { 
    console.log(`API server now on port ${PORT}!`);
})
