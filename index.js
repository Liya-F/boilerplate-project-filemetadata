var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config()

var app = express();

app.use(cors());

// Set up the multer middleware for file upload
const upload = multer();

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res)=>{
  if(!req.file){
    console.log("No file uploaded!")
  }else{
    console.log(req.file)
    const { originalname, mimetype, size } = req.file;
    res.json({ name: originalname, type: mimetype, size: size });
  }
});

// Move the express.static middleware here
app.use('/public', express.static(process.cwd() + '/public'));

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});