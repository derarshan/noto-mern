const Note = require("../models/Note.js");

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.userId }).sort({ createdAt: -1}) // -1 will sort in desc. order (newest first)
        res.status(200).json(notes);
    } catch (error) {
        console.error("🔴 Fetching notes error: ", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

const getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, userId: req.userId })
        if(!note){
            return res.status(404).json({ message: "😵 Note not found." });
        }
        res.status(200).json(note);
    } catch (error) {   
        console.error("🔴 Fetching note error: ", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content, userId: req.userId })
        await newNote.save()
        res.status(201).json({ message: "Note created successfully."})        
    } catch (error) {
        console.error("🔴 Creating note error: ", error);
        res.status(500).json({ message: "Internal server error." });
    }

}

const editNote = async (req, res) => {
    try {
        const { title, content } = req.body
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            { title, content },
            { new: true }
        );
        res.status(200).json({ message: "Note edited successfully."})
    } catch (error) {
        console.error("🔴 Editing note error: ", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

const deleteNote = async (req, res) => {
    try {
        await Note.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        res.status(200).json({ message: "Note deleted successfully."})
    } catch (error) {
        console.error("🔴 Deleting note error: ", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = {
    getAllNotes,
    getNoteById,
    createNote,
    editNote,
    deleteNote
};