
function code_size(csize){
    if(csize<1024*1024) return (csize/1024).toFixed(2)+"K";
    else return(csize/1024/1024).toFixed(2)+"M";
}

function input_validate(project_name, description, filename, types){
    if(project_name==""){
        $("#description4").text("please input your project name!");
        $("#description4").css("display", "inline");
        return false;
    } 
    if(description==""){
        $("#description4").text("please input your project description!");
        $("#description4").css("display", "inline");
        return false;
    } 

    if(types.length==0){
        $("#description4").text("please choose your source analysis type!");
        $("#description4").css("display", "inline");
        return false;
    }
    return true;
}
$('#program_code').change(function() {         
    $("#select_print").text($('#program_code').val());
    $('#code_size').text(code_size(this.files[0].size)); 
    $('#code_size').css("display","inline-block");
    $('#release_title').css("display", "inline-block");
    $('#release_desc').css("display", "inline-block");
});  

$('#select_button').click(function(){
    $('#program_code').trigger('click');
});

$("#create").click(function(){
    var project_name = $("#project_name").val();
    var description = $("#project_description").val();
    var filename = $('#program_code').val();
    var release_desc = $('#release_desc').val();
    var types =[];
    $('input[name="create_type"]:checked').each(function(){
        types.push($(this).val());
    });
    if(input_validate(project_name, description, filename, types)){
        var formdata = new FormData();
        if(filename!=""){
            formdata.append('program', $("#program_code")[0].files[0]);
            formdata.append('flag', 1);
        }        
        else formdata.append('flag', 0);
        formdata.append("project_id",  $(this).attr('class'));
        formdata.append("project_name", project_name);
        formdata.append("description", description);
        formdata.append("release_desc", release_desc);
        formdata.append("types", types);
        $.ajax({
            url:"/project/modify_project",
            type:"POST",
            processData:false,
            contentType:false,
            data:formdata,
            xhr: function() {
                var xhr = $.ajaxSettings.xhr();
                if(xhr.upload){
                    xhr.upload.onprogress = function (e) {
                        var progressRate = (e.loaded / e.total) * 100+"px";
                        $('#progress').css('width', progressRate);
                        console.log("当前进度"+e.loaded);
                        
                        $('#description4').text((e.loaded / e.total).toFixed(2) * 100+"%");
                        $('#description4').css('display', 'inline-block');
                    };  
                    return xhr;
                }                
            },
            success:function(response){
                window.location.href = "/project/list";
            },
            error: function(e){
                alert(e.status);
            }

        });
    }   
});