//require express library
var express = require('express');
//require the express router
var router = express.Router();
//require multer for the file uploads
var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = './public/images/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({dest: DIR}).single('photo');

//our file upload function.
router.post('/images', upload, function (req, res) {
  if(req.file !== undefined && req.file.path !== undefined) {
      var path = '';
      // No error occured.
      path = req.file.path;
      path = path.substr(14);
      res.json({"url": path});
  } else {
      // An error occurred when uploading
      // console.log(err);
      res.status(422).send("an Error occured")
  }
});

module.exports = router;