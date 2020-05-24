function change(obj){
    if(obj.getAttribute('id')=="signin"){
        obj.setAttribute('style', 'border:1px solid white');
        document.getElementById("register").style.display="none";
        document.getElementById("login").style.display="block";
        document.getElementById("signup").style.border='rgb(0, 19, 55)';
    }
    else{
        obj.setAttribute('style', 'border:1px solid white');
        document.getElementById("login").style.display="none";
        document.getElementById("register").style.display="block";
        document.getElementById("signin").style.border='rgb(0, 19, 55)';
    }
}
var signin = document.getElementById("signin");
var signup = document.getElementById("signup");
signin.style.border='rgb(0, 19, 55)';
var f1 = function(){change(this);}
signin.onclick = f1;
signup.onclick = f1;

var verified = 0;
function verify(){
    var password = $("#reg_password").val();
    var verify_password = $("#verify_password").val();
    if(verify_password=="") return 0;
    if(password=="") return 1;
    if(password==verify_password) return 2;
    return 3;
}

function validate(password){
    var a = /[0-9]/, b=/[a-z]/i; 
    if(password.length>14 || (a.test(password) && b.test(password) && password.length>7)) return true;
    return false;
}

$("#reg_password").blur(function(){
    var password = $("#reg_password").val();  
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
    $("#verify_password").trigger("blur");
})

$("#verify_password").blur(function(){
    var password = $("#reg_password").val();
    var verify_password = $("#verify_password").val();
    if(verify()==2 && validate(password)){
        $("#duihao2").css("display","inline-block");
        $("#chahao2").css("display","none");
        verified = 1;
        return;
    }
    else if(verify()==0){
        $("#duihao2").css("display","none");
        $("#chahao2").css("display","none");
    }
    else{
        $("#duihao2").css("display","none");
        $("#chahao2").css("display","inline-block");
    }
    verified = 0;
})

$("#loginbutton").click(function(){
    var username = $("#login_username").val();
    var password = $("#login_password").val();
    if(username=="" || password=="") {
        $("#tip1").html("input cannot be empty!");
        return;
    }
    else{
        $("#tip1").html("");
        list = {"user_name":username, "password":password};
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            url: "/login",
            data: JSON.stringify(list),
            success: function(result) {
                if(result['success']==false)  $("#tip1").html("username or password is wrong!");
                else window.location.href = "/project/list"
            },
            error: function(e){
                alert(e.status);
            }
        });
    }
});

$("#registerbutton").click(function(){
    var username = $("#reg_username").val();
    var email = $("#reg_email").val();
    var password = $("#reg_password").val();
    var verify_password = $("#verify_password").val();
    if(username=="" || email=="" || password=="" || verify_password=="") {
        $("#tip2").html("input cannot be empty!");
        return;
    }
    if(verified==0){
        $("#tip2").html("password is not valide!");
        return;
    }
    else{
        $("#tip2").html("");
        list = {"user_name":username, "email":email, "password":password};
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            url: "/register",
            data: JSON.stringify(list),
            success: function(result) {
                if(result['success']==false)  $("#tip2").html(result['message']);
                else $("#tip2").html('register successfully!');
            },
            error: function(e){
                alert(e.status);
            }
        });
    }
});