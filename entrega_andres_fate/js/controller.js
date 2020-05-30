function hideElement(type){
    $('.servant-item').fadeOut(100);
    var values = $("[type=" + type + "]").length;
    if(values == 4){
        $('.servants-list').removeClass('two').removeClass("four");
        $('.servants-list').addClass('four');
    } else if(values == 2) {
        $('.servants-list').removeClass('two').removeClass("four");
        $('.servants-list').addClass('two');
    }

    $("[type=" + type + "]").fadeIn(100);
}

$(document).ready(function(){
    $('.categoriesServants span').click(function(){
        $('.categoriesServants span').removeClass('selected');
        $(this).addClass("selected");
       hideElement($(this).attr('typeCat'))
    })
});