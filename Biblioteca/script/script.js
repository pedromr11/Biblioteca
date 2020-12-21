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
//Variable donde se guardan las alertas y se las paso a la ventana
 var textoVentana = "";

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
     let todoCorrecto = "";


    let boton = document.getElementById("submit");
    boton.addEventListener("click", event => {
        todoCorrecto = true;
        textoVentana = "";

    //Comprobar que esos datos son validos
    
    //Literatura
    if(literatura.value == "vacio"){
        todoCorrecto = false;
        event.preventDefault();
        literatura.style.borderColor = "red";
        textoVentana += "<p>Selecciona una categoria</p>";
    }else{
        literatura.style.borderColor = "black";
       
    }


    //Nombre del libro
    if (!nombreLibro.validity.valid) {
        todoCorrecto = false;
        event.preventDefault();
        nombreLibro.style.borderColor = "red"
        textoVentana += "<p>Falta el nombre del libro</p>";
    }else{
        nombreLibro.style.borderColor = "black";
        
    }

    //Identificador
    if (identificador.validity.patternMismatch) {
        todoCorrecto = false;
        event.preventDefault();
        identificador.style.borderColor = "red"
        textoVentana += "<p>Formato incorrecto</p>";

    }else if (!identificador.validity.valid) {
        todoCorrecto = false;
        event.preventDefault();
        identificador.style.borderColor = "red"
        textoVentana += "<p>Falta el identificador</p>";
    }else{
        identificador.style.borderColor = "black";
        
        
    }
    
    //Año de publicacion
    if ((añoPublicacion.value).split("-")[0] > new Date().getFullYear()) {
        todoCorrecto = false;
        event.preventDefault();
        añoPublicacion.style.borderColor = "red"
        textoVentana += "<p>Año incorrecto</p>";
    }else{
        añoPublicacion.style.borderColor = "black";
        
    }

    //Número de copias
    if (numeroCopias.value.length > 2) {
        todoCorrecto = false;
        event.preventDefault();
        numeroCopias.style.borderColor = "red";
        textoVentana += "<p>Necesita menos de 2 cifras.</p>";   
    }else if(!numeroCopias.validity.valid){
        todoCorrecto = false;
        event.preventDefault();
        numeroCopias.style.borderColor = "red"
        textoVentana += "<p>Falta el número de copias</p>";
    }else{
        numeroCopias.style.borderColor = "black";
        
    }

    //Edad recomendada
    if (edadRecomendada.value < 1 && edadRecomendada.value > 10) {
        todoCorrecto = false;
        event.preventDefault();
        edadRecomendada.style.borderColor = "red";
        textoVentana += "<p>Necesita un número entre 1 y 10.</p>";   
    }else if(!edadRecomendada.validity.valid){
        todoCorrecto = false;
        event.preventDefault();
        edadRecomendada.style.borderColor = "red"
        textoVentana += "<p>Falta la edad recomendada</p>";
    }else{
        edadRecomendada.style.borderColor = "black";
       

    }

    //Obervaciones
    if (observaciones.value.length > 150) {
        todoCorrecto = false;
        event.preventDefault();
        observaciones.style.borderColor = "red";
        textoVentana += "<p>Se ha superado el límite de 150 caracteres.</p>";
    }else if(!observaciones.validity.valid){
        todoCorrecto = false;
        event.preventDefault();
        observaciones.style.borderColor = "red"
        textoVentana += "<p>Falta la edad recomendada</p>";
    }else{
        observaciones.style.borderColor = "black";
        
    }
    


     //Si son validos creo un objeto y si no, se lo notifico al usuario
     if(todoCorrecto == true){           
        
        let libro = {
             Literatura: literatura.value,
             Nombre: nombreLibro.value,
             Identificador: identificador.value,
             FechaPublicacion: (añoPublicacion.value).split("-")[0],
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
        
     }else{
        
        crearVentana();
        
     }

     console.log(ArrayLibros);

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

        informacion.innerHTML += "<div class='span'><p>"+ArrayLibros[index].Nombre+"</p><span class=tooltiptext>Hay disponibles "+ArrayLibros[index].NumeroCopias+" ejemplar/es.</span></div><br>";
        
       }

       if (desplegable.value == "vacio") {
        informacion.innerHTML += "<div class='span'><p>"+ArrayLibros[index].Nombre+"</p><span class=tooltiptext>Hola</span></div><br>";
           
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

function recuperarAlertas(){
    console.log(textoVentana);
    return textoVentana;
}


function crearVentana(){
    window.open("./paginaVentana.html", "pop-up", "width=500 height=300");

}






