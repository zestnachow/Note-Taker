// Importing modules
const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");
const db = require("./db/db.json");

// Setting up server object and PORT variable
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// HTML routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

// API routes
app.get("/api/notes", (req, res) => {
    res.json(db);
});

app.post("/api/notes", (req, res) => {
    console.info(`Successful ${req.method} request created!`);
    const { title, text } = req.body;
    if (title && text) {
        let createdNote = {
            title,
            text,
            id: uniqid(),
        };
        db.push(createdNote);
        fs.writeFileSync(
            path.join(__dirname, "./db/db.json"),
            JSON.stringify(db, null, 2),
        );
        const response = {
            status: "success",
            body: createdNote,
        }
        res.json(response);
    }
})

app.delete("/api/notes/:id", (req, res) => {
    const { id } = req.params;
    const deletedNote = db.findIndex((note) => {
        note.id === id;
    })
    let splicedDb = db.splice(deletedNote, 1);
    const finalizedDb = JSON.stringify(splicedDb, null, 2);
    fs.writeFileSync("./db/db.json", finalizedDb);
    res.json(finalizedDb);
})


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})


