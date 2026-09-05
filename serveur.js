const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares indispensables
app.use(cors());
app.use(express.json()); // Pour permettre au serveur de lire les données JSON envoyées par l'ESP32

// Utilisation du port dynamique attribué par Render (ou 3000 par défaut en local)
const port = process.env.PORT || 3000;

// Objet initial pour stocker les dernières mesures reçues des capteurs
let mesureOnline = {}; 

// 1. Route POST : L'ESP32 vient pousser ses données ici
app.post('/update', function(req, res){
    mesureOnline = req.body;
    console.log("Données reçues de l'ESP32 :", mesureOnline);
    res.status(200).send("Données bien reçues");
});

// 2. Route GET : Ton site web (GitHub Pages) vient récupérer les mesures ici
app.get('/mesure', function(req, res){
    res.json(mesureOnline);
});

// Démarrage du serveur
app.listen(port, function(){
    console.log("Serveur lancé sur le port " + port);
});
