function hideElement(type){
    alert(type);
}

$(document).ready(function(){
    $('.categoriesServants span').click(function(){
       hideElement($(this).attr('type'))
    })
});