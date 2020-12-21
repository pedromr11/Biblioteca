window.onload = function() {
    let si = document.getElementById("si").addEventListener("click", literaturaInfantil);
    let no = document.getElementById("no").addEventListener("click", literaturaInfantil);
    crearFormulario();
    let select = document.getElementById("literatura").addEventListener("change", seccionDos);
    seccionTres();
    setInterval(seccionTres, 60000);
}

 //Creo un array para meter los libros
 var ArrayLibros = [];


class Libro {
    constructor(Literatura, Nombre, Identificador, FechaPublicacion, NumeroCopias, EdadRecomendada, Observaciones, Modificacion){
        this.Literatura = Literatura;
        this.Nombre = Nombre;
        this.Identificador = Identificador;
        this.FechaPublicacion = FechaPublicacion;
        this.NumeroCopias = NumeroCopias;
        this.EdadRecomendada = EdadRecomendada;
        this.Observaciones = Observaciones;
        this.Modificacion = Modificacion;
    }
}




function crearFormulario(){
    
    //Cosas utiles
    let IdObjetos = [];
    let identificadorAuxiliar;

    //Recoger todos los valores del formulario
     let literatura = document.getElementById("literatura");
     let nombreLibro = document.getElementById("nombreLibro");
     let identificador = document.getElementById("identificador");
     let añoPublicacion = document.getElementById("añoPublicacion");
     let numeroCopias = document.getElementById("numeroCopias");
     let edadRecomendada = document.getElementById("edadR");
     let observaciones = document.getElementById("observaciones");
     let textoVentana;
     let todoCorrecto = "";


    let boton = document.getElementById("submit");
    boton.addEventListener("click", event => {
        todoCorrecto = true;
    
    //Comprobar que esos datos son validos
    
    //Literatura
    if(literatura.value == "vacio"){
        todoCorrecto = false;
        event.preventDefault();
        literatura.style.borderColor = "red";
        textoVentana += "Selecciona una categoria";
    }else{
        literatura.style.borderColor = "black"
        textoVentana="";
    }


    //Nombre del libro
    if (!nombreLibro.validity.valid) {
        todoCorrecto = false;
        event.preventDefault();
        nombreLibro.style.borderColor = "red"
        textoVentana += "Falta el nombre del libro";
    }else{
        nombreLibro.style.borderColor = "black"
        textoVentana="";
    }

    //Identificador
    if (identificador.validity.patternMismatch) {
        todoCorrecto = false;
        event.preventDefault();
        identificador.style.borderColor = "red"
        textoVentana += "Formato incorrecto";

    }else if (!identificador.validity.valid) {
        todoCorrecto = false;
        event.preventDefault();
        identificador.style.borderColor = "red"
        textoVentana += "Falta el identificador";
    }else{
        identificador.style.borderColor = "black"
        textoVentana="";
        
    }    

    //Número de copias
    if (numeroCopias.value.length > 2) {
        todoCorrecto = false;
        event.preventDefault();
        numeroCopias.style.borderColor = "red";
        textoVentana += "Necesita menos de 2 cifras.";   
    }else if(!numeroCopias.validity.valid){
        todoCorrecto = false;
        event.preventDefault();
        numeroCopias.style.borderColor = "red"
        textoVentana += "Falta el número de copias";
    }else{
        numeroCopias.style.borderColor = "black"
        textoVentana="";
    }

    //Edad recomendada
    if (edadRecomendada.value < 1 && edadRecomendada.value > 10) {
        todoCorrecto = false;
        event.preventDefault();
        edadRecomendada.style.borderColor = "red";
        textoVentana += "Necesita un número entre 1 y 10.";   
    }else if(!edadRecomendada.validity.valid){
        todoCorrecto = false;
        event.preventDefault();
        edadRecomendada.style.borderColor = "red"
        textoVentana += "Falta la edad recomendada";
    }else{
        edadRecomendada.style.borderColor = "black"
        textoVentana="";
    }

    //Obervaciones
    if (observaciones.value.length > 150) {
        todoCorrecto = false;
        event.preventDefault();
        observaciones.style.borderColor = "red";
        textoVentana += "Se ha superado el límite de 150 caracteres.";
    }else if(!observaciones.validity.valid){
        todoCorrecto = false;
        event.preventDefault();
        observaciones.style.borderColor = "red"
        textoVentana += "Falta la edad recomendada";
    }else{
        observaciones.style.borderColor = "black"
        textoVentana="";
    }

     //Si son validos creo un objeto y si no, se lo notifico al usuario
     if(todoCorrecto == true){           
        
        let libro = {
             Literatura: literatura.value,
             Nombre: nombreLibro.value,
             Identificador: identificador.value,
             FechaPublicacion: añoPublicacion.value,
             NumeroCopias: numeroCopias.value,
             EdadRecomendada: edadRecomendada.value,
             Observaciones: observaciones.value,
             Modificacion: new Date()
         }         


        if(ArrayLibros.length == 0){
            ArrayLibros.push(libro);
        }else{
            for (let index = 0; index < ArrayLibros.length; index++) {             
                IdObjetos.push(ArrayLibros[index].Identificador);
            }
        

            if (IdObjetos.includes(identificador.value)) {
                
                identificadorAuxiliar = IdObjetos.indexOf(identificador.value);
                ArrayLibros[identificadorAuxiliar].NumeroCopias = parseInt(ArrayLibros[identificadorAuxiliar].NumeroCopias) + parseInt(numeroCopias.value);
                ArrayLibros[identificadorAuxiliar].Modificacion = new Date();
            }else{
                ArrayLibros.push(libro);
            }
        }        
        
     }

     //console.log(ArrayLibros);

    } );

}

function literaturaInfantil(){
   
    let visibilidad;

    if(document.getElementById("si").checked){
        visibilidad = document.getElementById("invisible").className = "visible";
        document.getElementById("edadR").setAttribute("required", "");
        document.getElementById("observaciones").setAttribute("required", "");
    }else if(document.getElementById("no").checked){
        visibilidad = document.getElementById("invisible").className = "invisible";
        document.getElementById("observaciones").removeAttribute("required");
        document.getElementById("edadR").removeAttribute("required");

        document.getElementById("edadR").value = "";
        document.getElementById("observaciones").value = "";
    }

}


//Recoger el valor del select, guardar los objetos en un array nuevo, comprueba uno a uno si el valor del select corresponde con el valor del objeto correspondiente y si 
//lo cumple visualiza en el div lo que se necesite.
function seccionDos(){


    let desplegable = document.getElementById("literatura");
    let informacion = document.getElementById("seccionDos");

    informacion.innerHTML = "";
    informacion.innerHTML = "Los libros de tipo "+desplegable.value;

   for (let index = 0; index < ArrayLibros.length; index++) {
       if (desplegable.value == ArrayLibros[index].Literatura) {

        informacion.innerHTML += "<p>"+ArrayLibros[index].Nombre+"</p><br>"
        
       }

       if (desplegable.value == "vacio") {
        informacion.innerHTML += "<p>"+ArrayLibros[index].Nombre+"</p><br>"          
       }
   }

   
}

function seccionTres(){

    let seccion = document.getElementById("seccionTres");
    let dia = new Date().getDay();
    let hora = new Date().getHours();
    let minutos = new Date().getMinutes();
    let boton = document.getElementById("submit");

    //Dias festivos
    if(dia == 6 || dia == 0){
        seccion.innerHTML = "En días festivos no es posible dar de alta nuevos libros";
        boton.disabled = true;
    }
    
    //De lunes a viernes dentro de horario
    if((dia >= 1 && dia <= 5) && (hora >= 9 && hora <= 19) && (minutos >= 0 && minutos <= 59)){
        seccion.innerHTML = "Sección de alta abierta";
    }

    //De lunes a viernes fuera de horario
    if((dia >= 1 && dia <= 5) && (hora >= 19 && hora <= 9) && (minutos >= 0 && minutos <= 59)){
        seccion.innerHTML = "Está fuera de horario. Solo es posible dar de alta libros de lunes a viernes de 9:00 a 19:00";
        boton.disabled = true; 

    }

}






