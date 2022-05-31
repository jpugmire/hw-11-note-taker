//this file controls accessing the info stored in db.json

const util = require('util');
const fs = require('fs');
const { v1: uuidv1} = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }

    write(entry) {
        return writeFileAsync('db/db.json', JSON.stringify(entry));
    }

    //function to get all notes from json
    getNotes() {
        let json = fs.readFileSync('./db/db.json', 'utf8');
        return JSON.parse(json);
        // fs.readFileSync('./db/db.json', 'utf8', (err, data) => {
        //     if(err){
        //         console.log(err);
        //     }
        //     else {
        //         _callback
        //     }
        // });
    }

    addNote(entry) {
        const title = entry.title;
        const content = entry.content;

        if (!title || !content) {
            throw new Error("Note 'title' and 'text' must have a value.");
        }

        //create new note
        const newNote = { title, content, id: uuidv1() };
        //get all notes
        let allEntries = this.getNotes();
        //add new note to list
        allEntries.push(newNote);
        //write list to json
        fs.writeFileSync('./db/db.json', JSON.stringify(allEntries, null, 3));
        return newNote;
    }

    removeNote(id) {
        //get notes
        let notes = this.getNotes();
        //remove matching note from array
        for(i = 0; i < notes.size; i++){
            if(notes[i].id === id){
                notes.splice(i, 1);
            }
        }
        this.write(notes);
    }
}

module.exports = new Store();