var verified = 0;

function verify(new_pwd, ver_pwd){       
    if(ver_pwd=="") return 0;
    if(new_pwd=="") return 1;
    if(new_pwd==ver_pwd) return 2;
    return 3;
}

function validate(password){
    var a = /[0-9]/, b=/[a-z]/i; 
    if(password.length>14 || (a.test(password) && b.test(password) && password.length>7)) return true;
    return false;
}

$("#new_pwd").blur(function(){
    var password = $("#new_pwd").val();  
    if(validate(password)){
        $("#chahao1").css("display","none");
        $("#duihao1").css("display","inline-block");
    }
    else if(password.length>0){
        $("#duihao1").css("display","none");
        $("#chahao1").css("display","inline-block");
    }   
    else{
        $("#duihao1").css("display","none");
        $("#chahao1").css("display","none");
    }
    $("#ver_pwd").trigger("blur");
})

$("#ver_pwd").blur(function(){
    var new_pwd = $("#new_pwd").val();
    var ver_pwd = $("#ver_pwd").val();
    if(verify(new_pwd, ver_pwd)==2 && validate(new_pwd)){
        $("#duihao2").css("display","inline-block");
        $("#chahao2").css("display","none");
        verified = 1;
        return;
    }
    else if(verify(new_pwd, ver_pwd)==0){
        $("#duihao2").css("display","none");
        $("#chahao2").css("display","none");
    }
    else{
        $("#duihao2").css("display","none");
        $("#chahao2").css("display","inline-block");
    }
    verified = 0;
})

function timeout(){
    alert(111)
}
$("#modify").click(function(){
    var old_pwd = $("#old_pwd").val();
    var new_pwd = $("#new_pwd").val();
    var ver_pwd = $("#ver_pwd").val();

    if(old_pwd=="" || new_pwd=="" || ver_pwd=="") {
        $("#pwd_tip").html("input cannot be empty!");
        $("#pwd_tip").css("display","inline-block");
        return;
    }
    if(verified==0){
        $("#pwd_tip").html("password is not valide!");
        $("#pwd_tip").css("display","inline-block");
        return;
    }
    else{
        $("#pwd_tip").css("display","none");
        var formdata = new FormData();
        formdata.append("new_pwd", new_pwd);
        formdata.append("old_pwd", old_pwd);

        $.ajax({
            type: "POST",
            url: "/update_pwd",
            processData:false,
            contentType:false,
            data:formdata,
            success: function(result) {
                if(result['success']==false){
                    $("#pwd_tip").html("old password is wrong!");                        
                    $("#pwd_tip").css("display","inline-block");
                }
                else{
                    $("#pwd_tip").html("password is modified successfully!");                        
                    $("#pwd_tip").css("display","inline-block");
                    $("#old_pwd").val('');
                    $("#new_pwd").val('');
                    $("#ver_pwd").val('');
                }
            },
            error: function(e){
                alert(e.status);
            }
        });
    }
});
