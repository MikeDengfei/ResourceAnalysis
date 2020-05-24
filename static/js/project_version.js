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
                display_result1(result["data"]);
            }
        },
        error:function(e){
            alert(e);
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
                display_result2(result["data"]);
            }
        },
        error:function(e){
            alert(e);
        }
    });
}

get_static_result(0);
get_dynamic_result(1);

function circlegraph(id, title, legend_data, series_name, series_data){
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(id));
    myChart.setOption({                    
        title: {
            text: title,
            // x 设置水平安放位置，默认左对齐，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
            x: 'center',
            // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
            y: 'top',
            // itemGap设置主副标题纵向间隔，单位px，默认为10，
            itemGap: 10,
            backgroundColor: '#EEE',
            // 主标题文本样式设置
            textStyle: {
                fontSize: 15,
                color: 'rgb(100, 100, 100)'
            },
        },
        
        legend: {
            // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
            orient: 'vertical',
            // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
            x: 'left',
            // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
            y: 'center',
            itemWidth: 24,   // 设置图例图形的宽
            itemHeight: 18,  // 设置图例图形的高
            textStyle: {    
                color: '#666'  // 图例文字颜色
            },
            // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
            itemGap: 20,
            // backgroundColor: '#eee',  // 设置整个图例区域背景颜色
            data: legend_data
        },
        
        series: [{
            name: series_name,
            type: 'pie',
            // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
            radius: ['30%', '60%'],  // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ['60%', '50%'],  // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            data: series_data,
            // itemStyle 设置饼状图扇形区域样式
            itemStyle: {
                // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
                // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
                emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(30, 144, 255，0.5)'
                }
            },
            // 设置值域的那指向线
            labelLine: {
                normal: {
                show: false   // show设置线是否显示，默认为true，可选值：true ¦ false
                }
            },
            // 设置值域的标签
            label: {
                normal: {
                position: 'inner',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                // {a}指series.name  {b}指series.data的name
                // {c}指series.data的value  {d}%指这一部分占总数的百分比
                formatter: '{c}'
                }
            }
        }],
        
        tooltip: {
            // trigger 设置触发类型，默认数据触发，可选值：'item' ¦ 'axis'
            trigger: 'item',
            showDelay: 20,   // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
            hideDelay: 20,   // 隐藏延迟，单位ms
            backgroundColor: 'rgba(255,0,0,0.7)',  // 提示框背景颜色
            textStyle: {
            fontSize: '16px',
            color: '#eee'  // 设置文本颜色 默认#FFF
            },
            // formatter设置提示框显示内容
            // {a}指series.name  {b}指series.data的name
            // {c}指series.data的value  {d}%指这一部分占总数的百分比
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
    })
}

var id = 'static', title="Threads";
var legend_data = ["fold2_concat", "fold2_merge", "fold_split", "init", "prio", 'sendReplyToClient', 'others'];
var series_name = "Thread number";
var series_data = [ {value:32, name:'fold2_concat'},
                    {value:32, name:'fold2_merge'},
                    {value:16, name:'fold_split'},
                    {value:16, name:'init'},
                    {value:8, name:'prio'},
                    {value:2, name:'sendReplyToClient'},
                    {value:2, name:'others'}];

circlegraph("static", 'Static Results', legend_data, series_name, series_data);
circlegraph("dynamic", 'Dynamic Results', legend_data, series_name, series_data);