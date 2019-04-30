$(document).ready(function() {
    /*$('#contact_right_button').on('input', function(event) {
        var input=$(this);
        var is_name = input.val();
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
    });*/

    $('#contact_food').on('input', function(event) {
        var input=$(this);
        var is_name=input.val();
        if(is_name){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    }).keypress(function (event) {
        event.preventDefault();
    });

    $('#contact_play_time').on('input', function() {
        var input=$(this);
        var is_name=input.val();
        if(is_name){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    }).keypress(function (event) {
        event.preventDefault();
    });

    $('#contact_monsters').on('input', function() {
        var input=$(this);
        var is_name=input.val();
        if(is_name){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    }).keypress(function (event) {
        event.preventDefault();
    });

    $('#contact_5_points').on('input', function() {
        var input=$(this);
        input.removeClass("invalid").addClass("valid");}
    );

    $('#contact_15_points').on('input', function() {
        var input=$(this);
        input.removeClass("invalid").addClass("valid");}
    );

    $('#contact_25_points').on('input', function() {
        var input=$(this);
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

    $("#contact_random").click(function(){
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
        right = 39;
        $("#contact_right_button").removeClass("invalid").addClass("valid");
        $("#contact_left_button").val(tmPleft);
        left = 37;
        $("#contact_left_button").removeClass("invalid").addClass("valid");
        $("#contact_up_button").val(tmPup);
        up = 38;
        $("#contact_up_button").removeClass("invalid").addClass("valid");
        $("#contact_down_button").val(tmPdown);
        down = 40;
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

    // need to valid the fields
    function checkKeysAreDiff(keys_data) {
        for (let i = 0; i < keys_data.length; i++) {
            for (let j = 0; j < keys_data.length; j++) {
                if( i!=j && keys_data[i].value == keys_data[j].value)
                    return false;
            }
        }
        return true;
    }

    <!-- After Form Submitted Validation-->
    $("#contact_submit_set").click(function(event){
        var form_data=$("#contact_settings").serializeArray();
        var error_free;
        if(!checkKeysAreDiff(form_data.slice(0,4)))
            error_free=false;
        else
            error_free = true;
        for (var input in form_data) {
            var element = $("#contact_" + form_data[input]['name']);
            var valid = element.hasClass("valid");
            var error_element = $("span", element.parent());
            if (!valid) {
                error_element.removeClass("error").addClass("error_show");
                error_free = false;
            } else {
                error_element.removeClass("error_show").addClass("error");
            }
        }
        if (!error_free) {
            event.preventDefault();
        } else {
            alert('No errors: Form will be submitted');
            goTo("game");
            setAllForGame();
            Start();
        }

        return false;
    });

    $("#contact_right_button").keydown(function(event) {
        if (event.keyCode == 8 || event.keyCode == 46){
            event.preventDefault();
        }
        else if (event.code != left && event.code!=up && event.code!=down) {
            right = event.code;
            $(this).val(right);
            $(this).removeClass("invalid").addClass("valid");
            event.preventDefault();
        }
        else {
            alert("Don't use the same keys")
            event.preventDefault();
            (this).removeClass("valid").addClass("invalid");
        }
    });
    $("#contact_left_button").keypress(function(event){
        if (event.keyCode == 8 || event.keyCode == 46){
            event.preventDefault();
        }
        else if (event.code != right && event.code!=up && event.code!=down) {
            left = event.code;
            $(this).val(left);
            $(this).removeClass("invalid").addClass("valid");
            event.preventDefault();
        }
        else {
            alert("Don't use the same keys")
            event.preventDefault();
            (this).removeClass("valid").addClass("invalid");
        }
    });
    $("#contact_up_button").keypress(function(event){
        if (event.keyCode == 8 || event.keyCode == 46){
            event.preventDefault();
        }
        else if (event.code != left && event.code!=right && event.code!=down) {
            up = event.code;
            $(this).val(up);
            $(this).removeClass("invalid").addClass("valid");
            event.preventDefault();
        }
        else {
            alert("Don't use the same keys")
            event.preventDefault();
            (this).removeClass("valid").addClass("invalid");
        }
    });
    $("#contact_down_button").keypress(function(event){
        if (event.keyCode == 8 || event.keyCode == 46){
            event.preventDefault();
        }
        else if (event.code != left && event.code!=up && event.code!=right) {
            down = event.code;
            $(this).val(down);
            $(this).removeClass("invalid").addClass("valid");
            event.preventDefault();
        }
        else {
            alert("Don't use the same keys")
            event.preventDefault();
            (this).removeClass("valid").addClass("invalid");
        }
    });
});






