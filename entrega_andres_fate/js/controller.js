function hideElement(type){
    debugger;
    $('.servant-item').fadeOut(100);
    var values = $(".servant-item." + type).length;
    if(values == 4){
        $('.servants-list').removeClass('two').removeClass("four");
        $('.servants-list').addClass('four');
    } else if(values == 2) {
        $('.servants-list').removeClass('two').removeClass("four");
        $('.servants-list').addClass('two');
    }

    $(".servant-item." + type).fadeIn(100);
}

$(document).ready(function(){
    $('.categoriesServants div').click(function(){
        $('.categoriesServants div').removeClass('selected');
        hideElement($(this).attr("class"))
        $(this).addClass("selected");
      
    })
});