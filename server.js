const express = require('express'); //Chamada do framework express

const fs = require('fs'); //Chamada do módulo de manipulação de arquivos

const app = express(); //Iniciando o web app com o express

const multer = require("multer"); //chamada do multer para upload de arquivos

//Configuração de armazenamento do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, "uploads/") //pasta destino
  },
  filename: function(req, file, cb){
    cb(null, file.originalname); //nome do arquivo
  }
});

const upload = multer({storage}); //aplicando configurações

//rota inicial
app.get("/", (req, res) => {
    res.send('Hello World!');
  })

//função de cálculo da distância
function distancia2d(x1, y1, x2, y2){
  var a = x2 - x1;
  var b = y2 - y1;
  var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  return c;
}

//rota da mensagem ao usuário
app.get("/message", (req, res) =>{
  res.send('Olá ' + req.query.name);
})

//função de alteração de arquivo
function changeFile(filename, replace){
  //leitura do arquivo txt
  fs.readFile(`uploads/${filename}`, 'utf-8', function(err, data) {
    if (err) {
      return err;
    }
 
    //replace da palavra indicada pelo usuário
    var newValue = data.replace(`${replace}`, 'sumiu');
    console.log(replace, newValue);
    
    //escrita do arquivo modificado
    fs.writeFile(`uploads/${filename}`, newValue, 'utf-8', function(err, data) {
        if (err) throw err;
        console.log(`Arquivo ${filename} alterado!`);
    })
  })
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

//rota de requisição/alteração de arquivo
app.get('/file', function(req, res){
  let result = changeFile(req.query.filename, req.query.replace);
  if(result)
    res.send("Arquivo corrompido ou não encontrado!")
  else {
    delay(3000).then(() => {
      const file = `${__dirname}/uploads/${req.query.filename}`;
      res.download(file);
    });
  }
});

//rota do cálculo da distância entre dois pontos
app.get('/distance', function(req, res){
  let distance = distancia2d(parseInt(req.query.x1), 
                             parseInt(req.query.y1), 
                             parseInt(req.query.x2), 
                             parseInt(req.query.y2));
  res.send('x1: ' + req.query.x1 + ' | y1: ' + req.query.y1 + ' | x2: ' + req.query.x2 + ' | y2: ' + req.query.y2 + ' | Distance: ' + distance);
});

//rota de envio do arquivo txt a ser modificado
app.post("/upload", upload.single("fileUpload"), (req, res) => {
  res.send('Arquivo recebido!');
})
    
//definição da rota de funcionamento do app
app.listen(process.env.PORT || 4040, () => console.log("Server is running..."));