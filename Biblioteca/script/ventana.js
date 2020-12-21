window.onload = function(){
    //Con el opener accedes al otro js
    let ventana = window.opener;
    //Recoges el body
    let cuerpo = document.getElementsByTagName("body");
    //Llamas a la función recuperarAlertas para que ponga en la ventana emergente todos los errores del formulario
    cuerpo[0].innerHTML = ventana.recuperarAlertas();
}