/* eslint-disable strict */
'use strict';

const _ = require('lodash');
const path = require('path');
const express = require('express'); //componenti necessari per per la connessione al db
var mysql = require('mysql');//componenti necessari per per la connessione al db
const webpack = require('webpack');
const config = require('./webpack.config.dev');
var cors = require('cors');
var bodyParser = require('body-parser');
const CircularJSON = require('circular-json');

var app = express();

app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());

const compiler = webpack(config);
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
});

var pool      =    mysql.createPool({
  connectionLimit : 1000, //important
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'albo'
});

//richiamo l'endpoint per il login quando viene utilizzato questo url
app.post("/api/login",(req,res) => {
pool.getConnection(function(err,connection){
  if (err) {
    //connection.release();
    console.log(connection);
    return res.json({"code" : 100, "status" : "Error in connection database"});;
  }

  console.log('connected as id ' + connection.threadId);
  console.log('paramters ' + req.param('mail') + req.param('pass'));
  connection.query("(SELECT Mail, Passwd as Password,ID,Token, Token AS Ruolo FROM AccessoForn  WHERE Mail = '"+req.param('mail')+"' AND Passwd = '"+req.param('pass')+"') UNION (SELECT Mail, Passwd as Password,ID, Token,Ruolo FROM AccessoAzienda WHERE Mail = '"+req.param('mail')+"' AND Passwd = '"+req.param('pass')+"')",function(err,rows){
    if(!err) {
      return res.send(JSON.stringify(rows));
    }else{
      console.log('error'+err);
    }
  });

  connection.on('error', function(err) {
        res.json({"code" : 100, "status" : "Error in connection database"});
        res.send({ error: true, data: err });
  });
  connection.release();
});
});

//richiamo l'endpoint per il admin-pannel quando viene utilizzato questo url
app.post("/api/admin-pannel",(req,res) => {
pool.getConnection(function(err,connection){
  if (err) {
    //connection.release();
    console.log(connection);
    return res.json({"code" : 100, "status" : "Error in connection database"});;
  }

  console.log('connected as id ' + connection.threadId);
  console.log('paramters ' + req.param('bandi'));
  connection.query("(SELECT Bando.IdBando AS ID, Bando.NomeBando AS Nome, Bando.Categoria AS Categoria, Bando.DataCreazione AS DataCreazione, Bando.DataApertura AS DataApertura, Bando.DataChiusura AS DataChiusura, Bando.SogliaMax AS SogliaMax, Bando.MinRating AS MinRating, Azienda.NomeAzienda AS Banditore, Bando.Stato AS Stato FROM Bando, Gestione, Azienda, AccessoAzienda  WHERE Bando.IdBando = Gestione.RefBando AND Gestione.RefAzienda = Azienda.IdAzienda AND Azienda.IdAzienda = AccessoAzienda.ID AND Mail = 'admin@lucegas.it')",function(err,rows){
      //connection.release();
      //console.log(err);
      if(!err) {
          console.log('Inizio risposta da server mysql')
          //res = JSON.stringify(res, censor(res));
          console.log('Inizio risposta '+res.res+' oppure '+rows);
          /*if(res['Ruolo']==null){
             res['Ruolo'] = 'Fornitore'; //Setto il ruolo del fornitore a
          }*/
      }
      res.send(JSON.stringify(rows));
  });

  connection.on('error', function(err) {
        res.json({"code" : 100, "status" : "Error in connection database"});
        return res.send({ error: true, data: err });
  });
  connection.release();
});
});

//richiamo l'endpoint per l'inserimento di un bando una volta cliccato su Salva nel modal di inserimento
app.post("/api/insBando",(req,res) => {
pool.getConnection(function(err,connection){
  if (err) {
    //connection.release();
    console.log(connection);
    return res.json({"code" : 100, "status" : "Error in connection database"});
  }

  console.log('connected as id ' + connection.threadId);
  console.log('paramters ' + req.param('nome'));

  //query per inserire il nuovo bando nella tabella dei bandi con i suoi vari dati esso verrà poi collegato all'autore tramite un record presente nella tabella gestione

  connection.query("INSERT INTO Bando (IdBando, NomeBando, Categoria, Descr, DataCreazione, DataApertura, DataChiusura, SogliaMax, MinRating,Stato) VALUES (null,'"+req.param('nome')+"','"+req.param('categoria')+"','"+req.param('descr')+"','"+req.param('dataCreazione')+"', '"+req.param('dataApertura')+"', '"+req.param('dataChiusura')+"', '"+req.param('sogliaMax')+"', '"+req.param('minRating')+"','"+req.param('stato')+"')",function(err,rows){
      //connection.release();
      console.log(err);
      if(!err) {
          console.log('Inizio risposta da server mysql1')
          //res = JSON.stringify(res, censor(res));
          console.log('Inizio risposta '+res.res+' oppure '+rows);
          //query per completare l'inserimento di un nuovo bando con la creazione di un nuovo record in gestione
  
          connection.query("INSERT INTO Gestione (RefBando, RefAzienda) VALUES ((SELECT IdBando FROM Bando WHERE NomeBando = '"+req.param('nome')+"' AND Categoria = '"+req.param('categoria')+"' AND Descr = '"+req.param('descr')+"' AND DataCreazione = '"+req.param('dataCreazione')+"' AND DataApertura = '"+req.param('dataApertura')+"' AND DataChiusura = '"+req.param('dataChiusura')+"' AND SogliaMax = '"+req.param('sogliaMax')+"' LIMIT 1), (SELECT Azienda.IdAzienda AS RefAzienda FROM Azienda, AccessoAzienda WHERE Azienda.IdAzienda = AccessoAzienda.ID AND Mail = '"+req.param('mailBand')+"'))",function(err,rows){
            //connection.release();
            console.log(err);
            if(!err) {
                console.log('Inizio risposta da server mysql2')
                //res = JSON.stringify(res, censor(res));
                console.log('Inizio risposta '+res.res+' oppure '+rows);
            }
            res.send(JSON.stringify(rows));
          });

          connection.on('error', function(err) {
                res.json({"code" : 100, "status" : "Error in connection database"});
                return res.send({ error: true, data: err });
          });
      }
  });

  connection.on('error', function(err) {
        res.json({"code" : 100, "status" : "Error in connection database"});
        return res.send({ error: true, data: err });
  });

  connection.release();
});
});

//richiamo l'endpoint per il formBando l quando viene utilizzato questo url
app.post("/api/register",(req,res) => {
  pool.getConnection(function(err,connection){
    if (err) {
      //connection.release();
      console.log(connection);
      return res.json({"code" : 100, "status" : "Error in connection database"});
    }

    console.log('connected as id ' + connection.threadId);
    console.log('paramters ' + req.param('nome') + req.param('categoria'));
    connection.query("INSERT INTO Fornitore (NomeForn, IVAForn, FGiurid, ATECO, ProvinciaCCIAA, NumeroREA, SitoWeb, PEC, AreaServizio,SLStato, SLRegione, SLProvincia, SLCAP, SLIndirizzo, SLFAX, SAmmStato, SAmmRegione, SAmmProvincia, SAmmCAP, SAmmIndirizzo, SAmmFAX, Categoria, SottoCategoria, FattAnnuo, CapSociale, NDipendenti, NStabilimenti, Nome, Cognome, Ruolo, Lingua, Telefono) VALUES ('Rossi Ristorazione', '12345678901', 'SNC', '12345678901234567', 'CO', '123456', 'www.rossiristorazione.it', 'pec@rossiristorazione.it','CO,RO','Italia','Lombardia','CO','22100','Via Roma, 1','0314567890','Italia','Lazio','RO','00118','Via Alessandria, 10','067890547',2,'NAS in borghese',100000,70000,52,3,'Franco','Rossi','Titolare','Italiana','3381234567');",function(err,rows){
        //connection.release();
        console.log(err);
        if(!err) {
            console.log('Inizio risposta da server mysql')
            //res = JSON.stringify(res, censor(res));
            console.log('Inizio risposta '+res.res+' oppure '+rows);
            /*if(res['Ruolo']==null){
               res['Ruolo'] = 'Fornitore'; //Setto il ruolo del fornitore a
            }*/
        }
        res.send(JSON.stringify(rows));
    });

    connection.on('error', function(err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return res.send({ error: true, data: err });
    });
    connection.release();
  });
  });

  //richiamo l'endpoint per prendere i dettagli del fornitore
  app.get("/api/getForn",(req,res) => {
    pool.getConnection(function(err,connection){
      if (err) {
        //connection.release();
        console.log(connection);
        return res.json({"code" : 100, "status" : "Error in connection database"});;
      }

      console.log('connected as id ' + connection.threadId);
      console.log('paramters ' + req.param('mail') + req.param('pass'));
      connection.query("SELECT Fornitore.IdForn, Fornitore.Nome,Fornitore.Cognome,Fornitore.Ruolo,AccessoForn.Mail,Fornitore.Telefono,Fornitore.NomeForn,Fornitore.IVAForn,Fornitore.FGiurid,Fornitore.PEC,Fornitore.SitoWeb,Fornitore.ATECO,Fornitore.ProvinciaCCIAA,Fornitore.NumeroREA FROM Fornitore INNER JOIN AccessoForn ON Fornitore.IdForn = AccessoForn.ID;",function(err,rows){
        if(!err) {
          console.log(rows);
          return res.send(JSON.stringify(rows));
        }else{
          console.log('error'+err);
        }
      });

      connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            res.send({ error: true, data: err });
      });
      connection.release();
    });
  });

  //richiamo l'endpoint per prendere i dettagli del fornitore
  app.post("/api/getPartecip",(req,res) => {
    pool.getConnection(function(err,connection){
      if (err) {
        //connection.release();
        console.log(connection);
        return res.json({"code" : 100, "status" : "Error in connection database"});
      }

      console.log('connected as id ' + connection.threadId);
      console.log('paramters ' + req.param('Mail') + req.param('pass'));
      connection.query("SELECT Fornitore.IdForn, Fornitore.NomeForn, Fornitore.IVAForn, Bando.NomeBando AS Bando, Categoria.NomeCat AS Categoria, Partecipazione.DataIscr AS DataIscrizione, Partecipazione.Rating AS Voto, Partecipazione.Candidatura FROM AccessoForn, Fornitore, Partecipazione, Bando, Gestione, Azienda, Categoria WHERE AccessoForn.ID = Fornitore.IdForn AND Fornitore.IdForn = Partecipazione.RefForn AND Partecipazione.RefBando = Bando.IdBando AND Bando.IdBando = Gestione.RefBando AND Gestione.RefAzienda = Azienda.IdAzienda AND Bando.Categoria = Categoria.IdCat AND AccessoForn.Mail = '"+req.param('Mail')+"';",function(err,rows){
        if(!err) {
          console.log(rows);
          return res.send(JSON.stringify(rows));
        }else{
          console.log('error'+err);
        }
      });

      connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            res.send({ error: true, data: err });
      });
      connection.release();
    });
  });

  //richiamo l'endpoint per prendere i dettagli dei Banditori
  app.get("/api/visBanditori",(req,res) => {
    pool.getConnection(function(err,connection){
      if (err) {
        //connection.release();
        console.log(connection);
        return res.json({"code" : 100, "status" : "Error in connection database"});
      }

      console.log('connected as id ' + connection.threadId);
      console.log('paramters ' + req.param('mail') + req.param('pass'));
      connection.query("SELECT Azienda.IdAzienda AS ID, Azienda.NomeAzienda AS Nome, Azienda.MailBando AS email, AccessoAzienda.Ruolo AS Ruolo FROM Azienda, AccessoAzienda WHERE  Azienda.IdAzienda = AccessoAzienda.ID AND AccessoAzienda.Ruolo = 'Banditore';",function(err,rows){
        if(!err) {
          console.log(rows);
          return res.send(JSON.stringify(rows));
        }else{
          console.log('error'+err);
        }
      });

      connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            res.send({ error: true, data: err });
      });
      connection.release();
    });
  });

  //richiamo l'endpoint per prendere i dettagli delle Categorie
  app.get("/api/visCategorie",(req,res) => {
    pool.getConnection(function(err,connection){
      if (err) {
        //connection.release();
        console.log(connection);
        return res.json({"code" : 100, "status" : "Error in connection database"});
      }

      console.log('connected as id ' + connection.threadId);
      connection.query("SELECT Categoria.IdCat AS ID, Categoria.NomeCat AS Nome FROM Categoria;",function(err,rows){
        if(!err) {
          console.log(rows);
          return res.send(JSON.stringify(rows));
        }else{
          console.log('error'+err);
        }
      });

      connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            res.send({ error: true, data: err });
      });
      connection.release();
    });
  });

  //richiamo l'endpoint per prendere i dettagli delle Categorie
  app.get("/api/allBandi",(req,res) => {
    pool.getConnection(function(err,connection){
      if (err) {
        //connection.release();
        console.log(connection);
        return res.json({"code" : 100, "status" : "Error in connection database"});
      }

      console.log('connected as id ' + connection.threadId);
      connection.query("SELECT Bando.IdBando AS ID, Bando.NomeBando AS Nome, Bando.Categoria AS Categoria, Bando.Descr AS Descr, Bando.DataCreazione AS Creazione, Bando.DataApertura AS Apertura, Bando.DataChiusura AS Chiusura, Bando.SogliaMax AS SogliaMax, Bando.Stato AS Stato,Bando.MinRating AS MinRating FROM Fornitore, Bando WHERE Fornitore.Categoria = Bando.Categoria AND Bando.Stato != 'Nascosto';",function(err,rows){
        if(!err) {
          console.log(rows);
          return res.send(JSON.stringify(rows));
        }else{
          console.log('error'+err);
        }
      });

      connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            res.send({ error: true, data: err });
      });
      connection.release();
    });
  });

  //richiamo l'endpoint per prendere i dettagli delle Categorie
  app.post("/api/allBandiBanditore",(req,res) => {
    pool.getConnection(function(err,connection){
      if (err) {
        //connection.release();
        console.log(connection);
        return res.json({"code" : 100, "status" : "Error in connection database"});
      }

      console.log('connected as id ' + connection.threadId);
      connection.query("SELECT Bando.IdBando AS ID, Bando.NomeBando AS Nome, Categoria.NomeCat AS Categoria, Bando.DataCreazione AS DataCreazione, Bando.DataApertura AS Apertura, Bando.DataChiusura AS Chiusura, Bando.SogliaMax AS OffertaMassima, Bando.Stato AS Stato, Bando.MinRating AS MinRating FROM Bando, Gestione, Azienda, AccessoAzienda, Categoria WHERE Bando.IdBando = Gestione.RefBando AND Gestione.RefAzienda = Azienda.IdAzienda AND Bando.Categoria = Categoria.IdCat AND Azienda.IdAzienda = AccessoAzienda.ID AND Mail = '"+req.param('Mail')+"';",function(err,rows){
        if(!err) {
          console.log(rows);
          return res.send(JSON.stringify(rows));
        }else{
          console.log('error'+err);
        }
      });

      connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            res.send({ error: true, data: err });
      });
      connection.release();
    });
  });

  //richiamo l'endpoint per prendere i dettagli di tutti i fornitori che hanno aderito a bandi indetti da questo banditore
  app.post("/api/allFornOfBand",(req,res) => {
    pool.getConnection(function(err,connection){
      if (err) {
        //connection.release();
        console.log(connection);
        return res.json({"code" : 100, "status" : "Error in connection database"});
      }

      console.log('connected as id ' + req.param('Mail'));
      connection.query("SELECT Fornitore.NomeForn AS Nome,Fornitore.IdForn AS ID, Fornitore.IVAForn, Bando.NomeBando, Partecipazione.Candidatura, Fornitore.Rating FROM Fornitore, Partecipazione, Bando, Gestione, Azienda, AccessoAzienda WHERE Fornitore.IdForn = Partecipazione.RefForn AND Partecipazione.RefBando = Bando.IdBando AND Bando.IdBando = Gestione.RefBando AND Gestione.RefAzienda = Azienda.IdAzienda AND Azienda.IdAzienda = AccessoAzienda.ID AND AccessoAzienda.Mail = '"+req.param('Mail')+"';",function(err,rows){
        if(!err) {
          console.log(rows);
          return res.send(JSON.stringify(rows));
        }else{
          console.log('error'+err);
        }
      });

      connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            res.send({ error: true, data: err });
      });
      connection.release();
    });
  });

  //richiamo l'endpoint per prendere i dettagli delle Categorie
  app.post("/api/deleteBando",(req,res) => {
    pool.getConnection(function(err,connection){
      if (err) {
        //connection.release();
        console.log(connection);
        return res.json({"code" : 100, "status" : "Error in connection database"});
      }

      console.log('connected as id ' + connection.threadId);
      connection.query("SELECT Bando.IdBando AS ID, Bando.NomeBando AS Nome, Categoria.NomeCat AS Categoria, Bando.DataCreazione AS DataCreazione, Bando.DataApertura AS Apertura, Bando.DataChiusura AS Chiusura, Bando.SogliaMax AS OffertaMassima, Bando.Stato AS Stato, Bando.MinRating AS MinRating FROM Bando, Gestione, Azienda, AccessoAzienda, Categoria WHERE Bando.IdBando = Gestione.RefBando AND Gestione.RefAzienda = Azienda.IdAzienda AND Bando.Categoria = Categoria.IdCat AND Azienda.IdAzienda = AccessoAzienda.ID AND Mail = '"+req.param('Mail')+"';",function(err,rows){
        if(!err) {
          console.log(rows);
          return res.send(JSON.stringify(rows));
        }else{
          console.log('error'+err);
        }
      });

      connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            res.send({ error: true, data: err });
      });
      connection.release();
    });
  });

  //richiamo l'endpoint per prendere i dettagli delle Categorie
  app.post("/api/updateBando",(req,res) => {
    pool.getConnection(function(err,connection){
      if (err) {
        //connection.release();
        console.log(connection);
        return res.json({"code" : 100, "status" : "Error in connection database"});
      }

      
      console.log('connected as id ' + connection.threadId);
      connection.query("UPDATE Bando SET NomeBando = '"+req.param('nome')+"', Categoria = '"+req.param('categoria')+"', Descr = '"+req.param('descr')+"', DataApertura = '"+req.param('dataApertura')+"', DataChiusura = '"+req.param('dataChiusura')+"', SogliaMax = '"+req.param('sogliaMax')+"', MinRating = '"+req.param('minRating')+"',Stato = '"+req.param('stato')+"' WHERE IdBando = '"+req.param('ID')+"'",function(err,rows){
        if(!err) {
          console.log(rows);
          return res.send(JSON.stringify(rows));
        }else{
          console.log('error'+err);
        }
      });

      connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            res.send({ error: true, data: err });
      });
      connection.release();
    });
  });

  //richiamo l'endpoint per prendere i dettagli del fornitore
  app.post("/api/getBand",(req,res) => {
    pool.getConnection(function(err,connection){
      if (err) {
        //connection.release();
        console.log(connection);
        return res.json({"code" : 100, "status" : "Error in connection database"});;
      }

      console.log('connected as id ' + connection.threadId);
      connection.query("SELECT * FROM Bando WHERE IdBando = '"+req.param('ID')+"'",function(err,rows){
        if(!err) {
          console.log(rows);
          return res.send(JSON.stringify(rows));
        }else{
          console.log('error'+err);
        }
      });

      connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            res.send({ error: true, data: err });
      });
      connection.release();
    });
  });

app.use(devMiddleware);
app.use(require('webpack-hot-middleware')(compiler));

app.use(function(req, res, next) {
  const reqPath = req.url;
  // find the file that the browser is looking for
  const file = _.last(reqPath.split('/'));
  if (['index.html'].indexOf(file) !== -1) {
    res.end(devMiddleware.fileSystem.readFileSync(path.join(config.output.path, file)));
  } else if (file.indexOf('.') === -1) {
    // if the url does not have an extension, assume they've navigated to something like /home and want index.html
    res.end(devMiddleware.fileSystem.readFileSync(path.join(config.output.path, 'index.html')));
  } else {
    next();
  }
});




//avviamo il server sulla porta 8080
/* eslint-disable no-console */
app.listen(process.env.WEBPACK_PORT, '10.60.110.31', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:' + process.env.WEBPACK_PORT);
});
/* eslint-enable no-console */
