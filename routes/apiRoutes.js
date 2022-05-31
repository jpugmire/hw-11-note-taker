const router = require('express').Router();
const store = require('../db/store');

//get api/notes returns all notes
router.get('/notes', (req, res) => {
    let allNotes = store.getNotes();
    return res.json(allNotes);
});

//add new note
router.post('/notes', (req, res) => {
    store.addNote(req.body);
    res.send('note posted');//.catch((err) => res.status(500).json(err));
});

router.delete('/notes/:id', (req, res) => {
    store.removeNote(req.params.id)
    .then(res.send('note deleted')).catch((err) => res.status(500).json(err));
})

module.exports = router;