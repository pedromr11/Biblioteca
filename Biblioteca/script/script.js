//Cuando carga la página se carga todo lo que haya aqui dentro.
window.onload = function() {
    //Cuando se pulsa el si del formulario muestra dos campos mas que están ocultos.
    let si = document.getElementById("si").addEventListener("click", literaturaInfantil);
    //Cuando pulso el no del formulario oculta los campos y resetea los campos ocultos.
    let no = document.getElementById("no").addEventListener("click", literaturaInfantil);
    //Llama a la función para crear el formulario
    crearFormulario();
    //Cuando se cambie la opcion de literatura se muestra en la seccion de la derecha los libros del tipo de literatura seleccionado.
    let select = document.getElementById("literatura").addEventListener("change", seccionDos);
    //Llama a la función para mostrar el estado de la página (si esta abierta para meter libros o no)
    seccionTres();
    //Cada 60 segundo ejecuta la función para ver si ha cambiado el estado de la página
    setInterval(seccionTres, 60000);
}

 //Creo un array para meter los libros
 var ArrayLibros = [];
//Variable donde se guardan las alertas y se las paso a la ventana
 var textoVentana = "";

 //Creo una clase para poder crear objetos Libro
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



//En esta función valido todos los campos del formulario, creo el objeto Libro y notifico los errores del formulario en una ventana nueva.
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

    //Cada vez que pulse el botón ejecuta todo lo que tiene dentro esto.
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
        //Creo el objeto libro
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

        //Si el arraylibros esta vacío se le mete el libro creado
        if(ArrayLibros.length == 0){
            ArrayLibros.push(libro);
        }else{
            // Meto en el array IdObjetos el identificador del libro que haya introducido
            for (let index = 0; index < ArrayLibros.length; index++) {             
                IdObjetos.push(ArrayLibros[index].Identificador);
            }
        //Si el identificador del libro que introducimos esta incluido entra aquí
            if (IdObjetos.includes(identificador.value)) {
                
                identificadorAuxiliar = IdObjetos.indexOf(identificador.value);
                //Si metemos un libro con un identificador ya existente le modifica el número de copias sumando las que ya había con las que estamos introduciendo
                ArrayLibros[identificadorAuxiliar].NumeroCopias = parseInt(ArrayLibros[identificadorAuxiliar].NumeroCopias) + parseInt(numeroCopias.value);
                //Metemos la fecha de la modificación
                ArrayLibros[identificadorAuxiliar].Modificacion = new Date();
            }else{
                ArrayLibros.push(libro);
            }
        }        
        
     }else{
        
        //Si los campos de formulario no son validos llama a la función crearVentana. Más abajo se desarrollará más.
        crearVentana();
        
     }

    } );

}

//Función para mostrar los campos ocultos si seleccionas literatura infantil o ocultar esos campos y resetearlos.
function literaturaInfantil(){
   
    let visibilidad;
    
    if(document.getElementById("si").checked){
        //Se ponen visible los dos campos que estaban ocultos
        visibilidad = document.getElementById("invisible").className = "visible";
        //Añade a esos campos el atributo required
        document.getElementById("edadR").setAttribute("required", "");
        document.getElementById("observaciones").setAttribute("required", "");
    }else if(document.getElementById("no").checked){
        //Se ponen invisibles los dos campos
        visibilidad = document.getElementById("invisible").className = "invisible";
        document.getElementById("observaciones").removeAttribute("required");
        document.getElementById("edadR").removeAttribute("required");
        //Se resetean los dos campos invisibles
        document.getElementById("edadR").value = "";
        document.getElementById("observaciones").value = "";
    }

}


//Recoger el valor del select, guardar los objetos en un array nuevo, comprueba uno a uno si el valor del select corresponde con el valor del objeto correspondiente y si 
//lo cumple visualiza en el div lo que se necesite.
function seccionDos(){

    //Recoge el select
    let desplegable = document.getElementById("literatura");
    //Recoge el div 
    let informacion = document.getElementById("seccionDos");

    //Pone en blanco el div
    informacion.innerHTML = "";
    //Te dice que tipo de literatura has seleccionado
    informacion.innerHTML = "Los libros de tipo "+desplegable.value;


   for (let index = 0; index < ArrayLibros.length; index++) {
       if (desplegable.value == ArrayLibros[index].Literatura) {
        //Pone en el div el nombre de los libros que pertenezcan al tipo de literatura que hayas seleccionado y si pasas el ratón por encima del nombre te dice el número de ejemplares.
        informacion.innerHTML += "<div class='span'><p>"+ArrayLibros[index].Nombre+"</p><span class=tooltiptext>Hay disponibles "+ArrayLibros[index].NumeroCopias+" ejemplar/es.</span></div><br>";
        
       }
       if (desplegable.value == "vacio") {
        informacion.innerHTML += "<div class='span'><p>"+ArrayLibros[index].Nombre+"</p><span class=tooltiptext>Hola</span></div><br>";           
       }
   }   
}

//Función que pone el estado de la página
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
    if((dia >= 1 && dia <= 5) && !(hora >= 9 && hora <= 19) && (minutos >= 0 && minutos <= 59)){
        seccion.innerHTML = "Está fuera de horario. Solo es posible dar de alta libros de lunes a viernes de 9:00 a 19:00";
        boton.disabled = true; 

    }

}

//Función que devuelve textoVentana
function recuperarAlertas(){
    return textoVentana;
}

//Función para abrir una ventana emergente
function crearVentana(){
    window.open("./paginaVentana.html", "pop-up", "width=500 height=300");

}






