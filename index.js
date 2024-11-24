var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


//API ENDPOINT 
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res){
  const output = {
    name: '',
    type: '',
    size: 0
  }

  output.name = req.file.originalname;
  output.type = req.file.mimetype;
  output.size = Number(req.file.size);

  return res.json(output);
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
