const express = require('express');
const cors = require('cors');
const port = 3000;
const app = express();
app.use(cors());
let mesureOnline = ""
function actualiserMesures(){
   
    fetch(' http://172.20.61.44/capteur' ,
        {
            method:'GET'
        }
    )
    .then(response => response.json())
    .then(data =>{
        mesureOnline = data ;
         console.log(data);
       
    })
    .catch(error =>{
        console.log("erreur de communication !!!!!") ;
    })
};

 app.get('/mesure' ,function(req , res){
    res.json(mesureOnline) ;
 })
app.listen(port , function(){
    console.log(`Serveur lancer sur le port ${port}`) ;
})

// Lancer la récupération automatique toutes les 3 secondes (3000 ms)
setInterval(actualiserMesures, 3000);