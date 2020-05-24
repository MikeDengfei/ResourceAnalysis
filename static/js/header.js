function info_click(){
    if($("#diag").css("visibility")!="hidden") $("#diag").css("visibility", "hidden");
    else $("#diag").css("visibility", "visible");
    if($("#info_nav").css("visibility")!="hidden") $("#info_nav").css("visibility", "hidden");
    else $("#info_nav").css("visibility", "visible");
}
$("#user").click(function(){
    info_click()
});
$("#person").click(function(){
    info_click()
});