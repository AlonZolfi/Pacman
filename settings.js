$(document).ready(function() {


    $('#contact_right_button').on('input', function() {
        var input=$(this);
        var is_name=input.val();
        if(is_name){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    $('#contact_left_button').on('input', function() {
        var input=$(this);
        var is_name=input.val();
        if(is_name){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    $('#contact_up_button').on('input', function() {
        var input=$(this);
        var is_name=input.val();
        if(is_name){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    $('#contact_down_button').on('input', function() {
        var input=$(this);
        var is_name=input.val();
        if(is_name){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    $('#contact_food').on('input', function() {
        var input=$(this);
        var is_name=input.val();
        if(is_name){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    $('#contact_play_time').on('input', function() {
        var input=$(this);
        var is_name=input.val();
        if(is_name){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    $('#contact_monsters').on('input', function() {
        var input=$(this);
        var is_name=input.val();
        if(is_name){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    $('#contact_5_points').on('input', function() {
        input.removeClass("invalid").addClass("valid");}
    );

    $('#contact_15_points').on('input', function() {
        input.removeClass("invalid").addClass("valid");}
    );

    $('#contact_25_points').on('input', function() {
        input.removeClass("invalid").addClass("valid");}
    );

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    $("#contact_random").click(function (event) {
        var tmPright="ArrowRight";
        var tmPleft="ArrowLeft";
        var tmPup="ArrowUp";
        var tmPdown="ArrowDown";
        var x = Math.random();
        var tmPfood=Math.ceil(x*(90-50)+50);
        var tmPpoints5=getRandomColor();
        var tmPpoints15=getRandomColor();
        var tmPpoints25=getRandomColor();
        var tmPtime=Math.ceil(x*(100)+60);
        var tmPmonsters=Math.ceil(x*(3-1)+1);

        $("#contact_right_button").val(tmPright);
        $("#contact_right_button").removeClass("invalid").addClass("valid");
        $("#contact_left_button").val(tmPleft);
        $("#contact_left_button").removeClass("invalid").addClass("valid");
        $("#contact_up_button").val(tmPup);
        $("#contact_up_button").removeClass("invalid").addClass("valid");
        $("#contact_down_button").val(tmPdown);
        $("#contact_down_button").removeClass("invalid").addClass("valid");
        $("#contact_food").val(tmPfood);
        $("#contact_food").removeClass("invalid").addClass("valid");
        $("#contact_5_points").val(tmPpoints5);
        $("#contact_5_points").removeClass("invalid").addClass("valid");
        $("#contact_15_points").val(tmPpoints15);
        $("#contact_15_points").removeClass("invalid").addClass("valid");
        $("#contact_25_points").val(tmPpoints25);
        $("#contact_25_points").removeClass("invalid").addClass("valid");
        $("#contact_play_time").val(tmPtime);
        $("#contact_play_time").removeClass("invalid").addClass("valid");
        $("#contact_monsters").val(tmPmonsters);
        $("#contact_monsters").removeClass("invalid").addClass("valid");
        return false;
    });

        // need to valid the filds
    <!-- After Form Submitted Validation-->
    $("#contact_submit_set").click(function(event){
        var form_data=$("#contact_settings").serializeArray();
        var error_free=true;
        for (var input in form_data){
            var element=$("#contact_"+form_data[input]['name']);
            var valid=element.hasClass("valid");
            var error_element=$("span", element.parent());
            if (!valid){error_element.removeClass("error").addClass("error_show"); error_free=false;}
            else{error_element.removeClass("error_show").addClass("error");}
        }
        if (!error_free){
            event.preventDefault();
        }
        else{
            alert('No errors: Form will be submitted');
            goTo("game");
            setAllForGame();
            Start();

        }
        return false;
    });
});