window.onload = function() {
    crearFormulario();
}

function crearFormulario(){
     
    //Recoger todos los valores del formulario
     let literatura = document.getElementById("literatura");
     let nombreLibro = document.getElementById("nombreLibro");
     let identificador = document.getElementById("identificador");
     let añoPublicacion = document.getElementById("añoPublicacion");
     let numeroCopias = document.getElementById("numeroCopias");
     let textoVentana;
     let todoCorrecto;


    let boton = document.getElementById("submit");
    boton.addEventListener("click", event => {
        todoCorrecto = true;
    
    //Comprobar que esos datos son validos

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
    if (!identificador.validity.valid) {
        todoCorrecto = false;
        event.preventDefault();
        identificador.style.borderColor = "red"
        textoVentana += "Falta el identificador";
    }else{
        identificador.style.borderColor = "black"
        textoVentana="";
    }

    //Número de copias
    if (!numeroCopias.validity.valid) {
        todoCorrecto = false;
        event.preventDefault();
        numeroCopias.style.borderColor = "red"
        textoVentana += "Falta el identificador";
    }else{
        numeroCopias.style.borderColor = "black"
        textoVentana="";
    }


    //Si son validos creo un objeto y si no, se lo notifico al usuario


    } );

    literaturaInfantil();

}

function literaturaInfantil(){

    let linfantil = document.getElementsByName("Linfantil");

    let visibilidad;    
    
    if(linfantil.value= "si"){
        visibilidad = document.getElementById("invisible").id = "visible";
    }else if(linfantil.value= "no"){
        visibilidad = document.getElementById("invisible").id = "invisible";
    }
}