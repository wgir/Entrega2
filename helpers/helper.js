const hbs=require('hbs');
const fs=require('fs');
const path=require('path');
const archivoJSON=path.join(__dirname,'../listadoCursos.json');
listaCursos=[];
hbs.registerHelper('registrarCurso',(_id,_nombre,_descripcion,_valor)=>{
    listaCursos= require(archivoJSON);
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

hbs.registerHelper('listarCursos',()=>{
    listaCursos= require(archivoJSON);
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
        texto=texto+"<tr><td>"+element.id+"</td>"+
                     "<td>"+element.nombre+"</td>"+
                     "<td>"+element.descripcion+"</td>"+
                     "<td>"+element.valor+"</td>"+
                     "<td>"+element.estado+"</td>";

    });
                texto=texto+"</tbody>              </table>"
    
    return texto;
});

const guardarCursosEnJSON=()=>{
    let datos=JSON.stringify(listaCursos);
    console.log("guardando "+datos);
    fs.writeFile(archivoJSON,datos,(err)=>{
        if(err) throw (err);
        console.log('Archivo creado con exito');
    })

}