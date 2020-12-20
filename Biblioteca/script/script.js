window.onload = function() {
    let si = document.getElementById("si").addEventListener("click", literaturaInfantil);
    let no = document.getElementById("no").addEventListener("click", literaturaInfantil);
    crearFormulario();
}


class Libro {
    constructor(Literatura, Nombre, Identificador, FechaPublicacion, NumeroCopias, EdadRecomendada, Observaciones, Modificacion){
        this.Literatura = Literatura;
        this.Nombre = Nombre;
        this,Identificador = Identificador;
        this.FechaPublicacion = FechaPublicacion;
        this.NumeroCopias = NumeroCopias;
        this.EdadRecomendada = EdadRecomendada;
        this.Observaciones = Observaciones;
        this.Modificacion = Modificacion;
    }
}




function crearFormulario(){
    
    //Creo un array para meter los libros
    let ArrayLibros = [];
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
    if (!numeroCopias.validity.valid) {
        todoCorrecto = false;
        event.preventDefault();
        numeroCopias.style.borderColor = "red"
        textoVentana += "Falta el número de copias";
    }else{
        numeroCopias.style.borderColor = "black"
        textoVentana="";
    }

    //Edad recomendada
    if (!edadRecomendada.validity.valid) {
        todoCorrecto = false;
        event.preventDefault();
        edadRecomendada.style.borderColor = "red"
        textoVentana += "Falta la edad recomendada";
    }else{
        edadRecomendada.style.borderColor = "black"
        textoVentana="";
    }

    //Obervaciones
    if (!observaciones.validity.valid) {
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






