window.onload = function(){
    let ventana = window.opener;
    let cuerpo = document.getElementsByTagName("body");
    cuerpo[0].innerHTML = ventana.recuperarAlertas();
}