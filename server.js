const fs = require('fs');
const path = require('path');
const express = require('express');


const PORT = process.env.PORT || 8000;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// pull note.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


// show note.html
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
})


// go back to main page
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


// save notes! 
app.post("/api/notes", (req, res) => {
    var saveNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    var newNote = req.body;
    newNote.id = saveNote.length.toString()
    saveNote.push(newNote);
    
    fs.writeFileSync("./db/db.json", JSON.stringify(saveNote));
    console.log(saveNote);
    res.json(saveNote);
});

// delete notes 
app.delete("/api/notes/:id", (req, res) => {
    var saveNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    var noteId = req.params.id.toString();
    saveNote = saveNote.filter(List => {
        return List.id != noteId
    });

    fs.writeFileSync("./db/db.json", JSON.stringify(saveNote));
    console.log(saveNote);
    res.json(saveNote)
});



app.listen(PORT, () => { 
    console.log(`API server now on port ${PORT}!`);
});
