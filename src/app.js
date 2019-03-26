var express = require('express');
var app = express();
const path=require('path');
const hbs=require('hbs');

const directorioPublico=path.join(__dirname,'../public');
const directorioPartials=path.join(__dirname,'../partials');
hbs.registerPartials(directorioPartials);
//app.use(express.static(__dirname+'/public'))
app.use(express.static(directorioPublico));
app.set('view engine','hbs');
app.get('/',(req,res)=>{
    res.render('index',{nombre:'William'});
})
console.log(__dirname);


 
app.listen(3000,()=>{ console.log('Escuchando en el puerto 3000')});