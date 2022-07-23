const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
var fetchuser = require("../middleware/fetchuser");
//Route no1 : Get all notes : GET "/api/notes/fetchuser". login Required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internel server error");
  }
});

//Route no2 : Add a new note : Post "/api/notes/addnote". login Required

router.post("/addnote",fetchuser,[
    body("title", "title must be atleast 3 characters").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internel server error");
    }
  });
  //Route no3 : Update an existing note using : PUT "/api/notes/updatenote". login Required
  router.put("/updatenote/:id",fetchuser,async (req, res) => {
    const {title, description, tag} = req.body ;
    // Create a newNote 
    try {
  
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // Find the note to be updated and update it 
    let note = await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed")
    }
    note = await Note.findByIdAndUpdate(req.params.id , {$set : newNote}, {new :true})
    res.json({note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internel server error");
  }
})
    

    //Route no4 : Delete an existing note using : DELETE "/api/notes/deletenote". login Required
  router.delete("/deletenote/:id",fetchuser,async (req, res) => {
    // Find the note to be Deleted and delete it 
    try {
      
    let note = await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not Found")}

    //Allow deletion only if user owns this Note
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed")
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success" : "Note has been deleted" , note : note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internel server error");
  }
})

module.exports = router;