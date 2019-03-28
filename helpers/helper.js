const hbs=require('hbs');
const fs=require('fs');
const path=require('path');
const archivoCursosJSON=path.join(__dirname,'../listadoCursos.json');
const archivoInscripcionJSON=path.join(__dirname,'../listadoInscripciones.json');
listaCursos=[];
listaInscripciones=[];

hbs.registerHelper('registrarCurso',(_id,_nombre,_descripcion,_valor)=>{
    listaCursos= require(archivoCursosJSON);
    //listaCursos= JSON.parse(fs.readFileSync('../listadoCursos.json'));
    if(_id!='' && _nombre!='' && _descripcion!='' && _valor!='')
    {
        if(!listaCursos.find(l=>l.id==parseInt(_id)))
        {
            let curso={id:_id,nombre:_nombre,descripcion:_descripcion,valor:_valor,estado:'Disponible'}
            listaCursos.push(curso);
            guardarCursosEnJSON();
            return 'Curso registrado exitosamente!!';
        }else
            return 'El id del curso ya se encuentra registrado :(';
    }else
        return 'El id, nombre, descripcion y valor son obligatorios';
});


hbs.registerHelper('verCurso',(id)=>{
    listaCursos= require(archivoCursosJSON);

    //listaCursos= JSON.parse(fs.readFileSync('../listadoCursos.json'));
    let texto="<table> \
                <thead> \
                    <th>Id</th> \
                    <th>Nombre</th> \
                    <th>Descripcion</th> \
                    <th>Valor</th> \
                    <th>Estado</th> \
                </thead> \
                <tbody>";

                listaCursos.forEach(element => {
                    if(element.id==parseInt(id))
                    {
                      texto=texto+"<tr><td>"+element.id+"</td>"+
                     "<td>"+element.nombre+"</td>"+
                     "<td>"+element.descripcion+"</td>"+
                     "<td>"+element.valor+"</td>"+
                     "<td>"+element.estado+"</td></tr>";
                    }

    });
                texto=texto+"</tbody>              </table>"
    
    return texto;
});

hbs.registerHelper('listarCursos',()=>{
    listaCursos= require(archivoCursosJSON);
    //listaCursos= JSON.parse(fs.readFileSync('../listadoCursos.json'));
    let texto="<table> \
                <thead> \
                    <th>Id</th> \
                    <th>Nombre</th> \
                    <th>Descripcion</th> \
                    <th>Valor</th> \
                    <th>Estado</th> \
                    <th>Cerrar</th> \
                    <th>Ver Inscritos</th> \
                </thead> \
                <tbody>";

                listaCursos.forEach(element => {
        texto=texto+"<tr><td>"+element.id+"</td>"+
                     "<td>"+element.nombre+"</td>"+
                     "<td>"+element.descripcion+"</td>"+
                     "<td>"+element.valor+"</td>"+
                     "<td>"+element.estado+"</td>";
                     if(element.estado=='Disponible')
                        texto=texto+ "<td><a href='/cerrarCurso?id="+element.id+"'>Cerrar</a></td>";
                     else
                        texto=texto+ "<td></td>";
                    texto=texto+ "<td><a href='/verInscritos?id="+element.id+"'>Ver</a></td></tr>";

    });
                texto=texto+"</tbody>              </table>"
    
    return texto;
});


hbs.registerHelper('listarCursosInteresados',()=>{
    listaCursos= require(archivoCursosJSON);
    //listaCursos= JSON.parse(fs.readFileSync('../listadoCursos.json'));
    let texto="<table> \
                <thead> \
                    <th>Nombre</th> \
                    <th>Descripcion</th> \
                    <th>Valor</th> \
                    <th>Ver Detalles</th> \
                    <th>Inscripcion</th> \
                </thead> \
                <tbody>";

                listaCursos.forEach(element => {
                    if(element.estado=='Disponible')
                    {
                        texto=texto+
                        "<tr><td>"+element.nombre+"</td>"+
                        "<td>"+element.descripcion+"</td>"+
                        "<td>"+element.valor+"</td>"+
                        "<td><a href='/verCurso?id="+element.id+"'>Ver Detalles</a></td>"+
                        "<td><a href='/inscripcion?id="+element.id+"'>Inscribirse</a></td></tr>";
                    }

    });
                texto=texto+"</tbody>              </table>"
    
    return texto;
});



hbs.registerHelper('registrarInscripcion',(_idCurso,_documento,_nombre,_correo,_telefono)=>{
    listaInscripciones= require(archivoInscripcionJSON);
    //listaCursos= JSON.parse(fs.readFileSync('../listadoCursos.json'));
    if(_documento!='' && _nombre!='' && _correo!='' && _telefono!='')
    {
        existe=listaInscripciones.filter(l=>l.idCurso===parseInt(_idCurso) && l.documento===parseInt(_documento));
        
        console.log('existe:'+JSON.stringify(existe));
        if(existe.length<=0)
        {
            let inscripcion={idCurso:parseInt(_idCurso),documento:parseInt(_documento),nombre:_nombre,correo:_correo,telefono:_telefono}
            listaInscripciones.push(inscripcion);
            guardarInscripcionesEnJSON();
            return 'Curso registrado exitosamente!!';
        }else
            return 'La persona ya se encuntra registrada en el curso solicitado :(';
    }else
        return 'El nombre, correo  y telefono son obligatorios';
});



hbs.registerHelper('cerrarCurso',(_idCurso)=>{
    listaCursos= require(archivoCursosJSON);
    //listaCursos= JSON.parse(fs.readFileSync('../listadoCursos.json'));
    if(_idCurso!='')
    {
        registro=listaCursos.find(l=>l.id===_idCurso);
        if(registro)
           registro.estado='Cerrado';
        else
         console.log('Curso no encontrado');
        
         guardarCursosEnJSON();
        
    }else
        return 'El id del curso es obligatorio';
});



hbs.registerHelper('verInscritos',(_idCurso)=>{
    listaInscripciones= require(archivoInscripcionJSON);
    //listaCursos= JSON.parse(fs.readFileSync('../listadoCursos.json'));
    let texto="<table> \
                <thead> \
                    <th>Documento</th> \
                    <th>Nombre</th> \
                    <th>Correo</th> \
                    <th>Telefono</th> \
                </thead> \
                <tbody>";

                listaInscripciones.forEach(element => {
                    if(element.idCurso===parseInt(_idCurso) && element.estado==='Disponible')
                    {
                        texto=texto+
                        "<tr><td>"+element.documento+"</td>"+
                        "<td>"+element.nombre+"</td>"+
                        "<td>"+element.correo+"</td>"+
                        "<td>"+element.Telefono+"</td>"+
                        "<td><a href='/eliminarEstudiante?idCurso="+_idCurso+"&documento="+element.documento+"'>Eliminar</a></td>";
                        
                    }

    });
                texto=texto+"</tbody>              </table>"
    
    return texto;
});

const guardarCursosEnJSON=()=>{
    let datos=JSON.stringify(listaCursos);
    console.log("guardando "+datos);
    fs.writeFile(archivoCursosJSON,datos,(err)=>{
        if(err) throw (err);
        console.log('Archivo creado con exito');
    })
}


const guardarInscripcionesEnJSON=()=>{
    let datos=JSON.stringify(listaInscripciones);
    console.log("guardando "+datos);
    fs.writeFile(archivoInscripcionJSON,datos,(err)=>{
        if(err) throw (err);
        console.log('Archivo creado con exito');
    })
}