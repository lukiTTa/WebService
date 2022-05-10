const express = require('express');

const app = express();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, "uploads/")
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

const upload = multer({storage});

app.get("/", (req, res) => {
    res.send('Hello World!');
  })

app.post("/upload", upload.single("fileUpload"), (req, res) => {
  res.send('Arquivo recebido!');
})
    
app.listen(process.env.PORT || 4040, () => console.log("Server is running..."));