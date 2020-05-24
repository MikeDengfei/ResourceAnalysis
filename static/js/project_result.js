function display_result1(result){
    result_html = "";
    var length = 0;
    for(var key in result){
        if(result[key]!=null && result[key]!=''){
            result_html+="<span class=\"result_content1 result_content\"> <p>"+key+"</p> <p class=\"type_index\">"+result[key]+"</p></span>";
            length++;
        }
    }
    $("#static_title").after(result_html);
    $(".result_content1").css('width', (94/length).toString()+'%');  
}

function display_result2(result){
    result_html = "";
    var length = 0;
    for(var key in result){
        if(result[key]!=null && result[key]!=''){
            result_html+="<span class=\"result_content2 result_content\"> <p>"+key+"</p> <p class=\"type_index\">"+result[key]+"</p></span>";
            length++;
        }
    }
    $("#dynamic_title").after(result_html);
    $(".result_content2").css('width', (94/length).toString()+'%');  
}

function display_configuration(result){    
    result_html = "";
    var length = 0;
    for(var key in result){
        if(result[key]!=null && result[key]!=''){
            result_html+="<span class=\"result_content3 config_content\"> <p>"+key+"</p> <p class=\"type_index\">"+result[key]+"</p></span>";
            length++;
        }
    } 
    $("#configuration").after(result_html);
}

function get_configuration(){
    formdata = new FormData();
    formdata.append("project_id", $("#pro_id").text());    
    $.ajax({
        url:"/project/get_configuration",
        type:"POST",
        processData:false,
        contentType:false,
        data: formdata,
        success: function(result){
            if(result['success']==true){
                display_configuration(result["data"]);
            }
        },
        error:function(e){
            alert(e);
        }
    });
}

get_configuration();

static_id = window.setInterval("get_static_result()", 1000);
dynamic_id = window.setInterval("get_dynamic_result()",1000);
function get_static_result(flag){
    formdata = new FormData();
    formdata.append("project_id", $("#pro_id").text());    
    formdata.append("version_num", $("#pro_vn").text());
    formdata.append("flag", 0);
    $.ajax({
        url:"/project/get_result",
        type:"POST",
        processData:false,
        contentType:false,
        data: formdata,
        success: function(result){
            if(result['success']==true){
                $("#quanquan1").css('display',"none");
                display_result1(result["data"]);
                clearInterval(static_id);
            }
        },
        error:function(e){
            alert(e);
            clearInterval(static_id);
        }
    });
}

function get_dynamic_result(flag){
    formdata = new FormData();
    formdata.append("project_id", $("#pro_id").text());      
    formdata.append("version_num", $("#pro_vn").text());
    formdata.append("flag", 1);
    $.ajax({
        url:"/project/get_result",
        type:"POST",
        processData:false,
        contentType:false,
        data: formdata,
        success: function(result){
            if(result['success']==true){
                $("#quanquan2").css('display',"none");
                display_result2(result["data"]);
                clearInterval(dynamic_id);
            }
        },
        error:function(e){
            alert(e);
            clearInterval(dynamic_id);
        }
    });
}
var dot_id = setInterval(dotdot,800);
var dot_index = 0;
function dotdot(){
    $(".dot0").css("width", 6);
    $(".dot0").css("height", 6);
    $(".dot0").css("border-radius", 3)
    $(".dot1").css("width", 6);
    $(".dot1").css("height", 6);
    $(".dot1").css("border-radius", 3)
    $(".dot2").css("width", 6);
    $(".dot2").css("height", 6);
    $(".dot2").css("border-radius", 3)
    $(".dot"+dot_index).css("width", 8);
    $(".dot"+dot_index).css("height", 8);
    $(".dot"+dot_index).css("border-radius", 4);
    if((dot_index+1)%3==0) dot_index=0;
    else dot_index++;
}