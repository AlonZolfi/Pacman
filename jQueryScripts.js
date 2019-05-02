$(".a_menu").click(function(event){
    var div_content = $("#content > div");
    var clickedName = this.id;
    for (let i = 0; i < div_content.length; i++) {
        var divName = div_content[i].id;
        var shortName = clickedName.substring(2,clickedName.length);
        if(divName === shortName)
            div_content[i].hidden = false;
        else
            div_content[i].hidden = true;
    }
});
