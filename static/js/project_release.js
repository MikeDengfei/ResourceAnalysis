// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('static_comparison'));
// 指定图表的配置项和数据
myChart.setOption({
    title: {
            text: 'Comparison of Resources',
            padding: 10
    },
    tooltip: {},
    legend: {
            data: ['Release1','Release2'],
            padding:40
    },
    xAxis: {
            data: ["DB","Process","FH","Memeory","Threads"],
            axisLabel: {
                interval:0, //设置成 0 强制显示所有标签。
            }
    },
    yAxis: {},
    series: [{
            name: 'Release1',
            type: 'bar',
            data: ["1","2","3","4","5"]
    },
    {
            name: 'Release2',
            type: 'bar',
            data: ["1","2","3","4","5"]
    }]
    
});

// 基于准备好的dom，初始化echarts实例
var myChart2 = echarts.init(document.getElementById('dynamic_comparison'));
// 指定图表的配置项和数据
myChart2.setOption({
    title: {
            text: 'Comparison of Resources',
            padding: 10
    },
    tooltip: {},
    legend: {
            data: ['Release1','Release2'],
            padding:40
    },
    xAxis: {
            data: ["DB","Process","FH","Memeory","Threads"],
            axisLabel: {
                interval:0, //设置成 0 强制显示所有标签。
            }
    },
    yAxis: {},
    series: [{
            name: 'Release1',
            type: 'bar',
            data: ["1","2","3","4","5"]
    },
    {
            name: 'Release2',
            type: 'bar',
            data: ["1","2","3","4","5"]
    }]
    
});

