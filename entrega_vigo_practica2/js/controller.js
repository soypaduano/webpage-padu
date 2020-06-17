//inicio de script
$(document).ready(function(){
    $('#botonGoPortfolio').click(function(){
        $('#portfolio').show();
        $('#portfolio').animatescroll();
        
        $('.imageProyecto').fadeIn(1000); //hacemos un efecto fade
    })

    $('#sendPracticas').click(function(){
        var nombre = $('#nombreIntroducido').val(); //cogemos el valor 
        var email = $('#emailIntroducido').val(); //cogemos el valor
        var texto = $('#mensajeIntroducido').val(); //cogemos el valor
        
        
        //comprobaciones para que el usuario no deje nada vacio
        if(!nombre){
            alert("porfavor rellena el nombre")
        } else if(!email){
            alert("rellena el email");
        } else if(!texto){
            alert("deja un mensaje")
        } else {
            alert("hemos recibido tu mensaje, " + nombre + " pronto recibiras noticias");
        }
    })

})