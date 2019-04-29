$(document).ready(function() {
    <!-- Real-time Validation -->
    <!--username can't be blank-->
    $("#contact_user_name").on('input', function() {
        var input=$(this);
        var is_name=input.val();
        if(is_name){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    $('#contact_password').on('input', function() {
        var input=$(this);
        var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        var is_name=re.test(input.val());
        if(is_name){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    $('#contact_first_name').on('input', function() {
        var input=$(this);
        var re = /^[a-zA-Z]+$/;
        var is_name=re.test(input.val());
        if(is_name){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    $('#contact_last_name').on('input', function() {
        var input=$(this);
        var re = /^[a-zA-Z]+$/;
        var is_name=re.test(input.val());
        if(is_name){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    <!--Email must be an email -->
    $('#contact_email').on('input', function() {
        var input=$(this);
        var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var is_email=re.test(input.val());
        if(is_email){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    $('#contact_birthdate').on('input', function() {
        var input=$(this);
        var is_name=input.val();
        if(is_name && new Date(is_name) < new Date()){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    <!-- After Form Submitted Validation-->
    $("#contact_submit_reg").click(function(event){
        var form_data=$("#contact_register").serializeArray();
        var error_free=true;
        for (var input in form_data){
            var element=$("#contact_"+form_data[input]['name']);
            var valid=element.hasClass("valid");
            var error_element=$("span", element.parent());
            if (!valid){error_element.removeClass("error").addClass("error_show"); error_free=false;}
            else{error_element.removeClass("error_show").addClass("error")}
        }
        if (!error_free){
            event.preventDefault();
        }
        else{
            saveUser(form_data);
            goTo("login");
            return false;
        }
    });
});