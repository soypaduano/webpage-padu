
jQuery.curCSS = function (element, prop, val) {
    return jQuery(element).css(prop, val);
};

var videoButton, musicButton, tourButton, shopButton, photoButton;

function hideAll(){
    
}

$(document).ready(function () {
    $('.element-box a, .element-box img').hover(
        function () {
            var color = $(this).parent().attr('color-hover');
            $("body").animate({ "background-color": color }, 200);
            $(this).parent().find('.element-tag').fadeIn(200);
        }, function () {
            $("body").animate({ "background-color": "#FFF0C2" }, 200);
            $(this).parent().find('.element-tag').fadeOut(200);
        });
});