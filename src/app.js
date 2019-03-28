var express = require('express');
var app = express();
const path=require('path');
const hbs=require('hbs');
const bodyParser=require('body-parser');

require('../helpers/helper');


const directorioPublico=path.join(__dirname,'../public');
const directorioPartials=path.join(__dirname,'../partials');
hbs.registerPartials(directorioPartials);

//app.use(express.static(__dirname+'/public'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(directorioPublico));
app.set('view engine','hbs');


app.get('/',(req,res)=>{
    res.render('index');
})


app.get('/coordinador',(req,res)=>{
    res.render('coordinador');
})

app.post('/registrarCurso',(req,res)=>{
    res.render('registrarCurso',{id:req.body.id,nombre:req.body.nombre,descripcion:req.body.descripcion,valor:req.body.valor,estado:req.body.estado});
})


app.get('/verCurso',(req,res)=>{
    res.render('verCurso',{id:req.query.id});
})

app.get('/interesado',(req,res)=>{
    res.render('interesado');
})

app.get('/inscripcion',(req,res)=>{
    res.render('inscripcion',{id:req.query.id});
})

app.post('/registrarInscripcion',(req,res)=>{
    res.render('registrarInscripcion',{idCurso:req.body.idCurso,documento:req.body.documento,nombre:req.body.nombre,correo:req.body.correo,telefono:req.body.telefono});
})


app.get('/cerrarCurso',(req,res)=>{
    res.render('cerrarCurso',{id:req.query.id});
})


app.get('/verInscritos',(req,res)=>{
    res.render('verInscritos',{id:req.query.id});
})

console.log(__dirname);


 
app.listen(3000,()=>{ console.log('Escuchando en el puerto 3000')});