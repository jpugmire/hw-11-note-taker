//this file controls accessing the info stored in db.json

const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }

    write(entry) {
        return writeFileAsync('db/db.json', JSON.stringify(entry));
    }

    getNotes() {
        return this.read().then((entries) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(entries));
            }  
            catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        });
    }

    addNote(entry) {
        const title = entry.title;
        const content = entry.content;

        if (!title || !content) {
            throw new Error("Note 'title' and 'text' must have a value.");
        }

        const newNote = { title, text, id: uuidv1() };
        const allEntries = this.getNotes().then((entries) => entries.push(newNote));
        this.write(allEntries);
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