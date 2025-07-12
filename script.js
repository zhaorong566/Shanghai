// script.js

// 确保在DOM完全加载后再执行脚本，这是一个好的编程习惯
document.addEventListener('DOMContentLoaded', function () {
    
    // 基于ID为'main'的DOM元素，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // --- 1. 数据准备 ---
    // 上海市16个区的名称，这将作为X轴的标签
    const districts = [
        '黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', 
        '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', 
        '松江区', '青浦区', '奉贤区', '崇明区'
    ];

    // 对应各区的人口数据（单位：万人），数据来源于第七次全国人口普查
    const populationData = [
        66.20, 111.31, 69.31, 97.57, 123.98, 75.75, 
        124.26, 265.34, 223.52, 183.42, 568.15, 82.28, 
        190.97, 127.14, 114.09, 63.79
    ];

    // 将数据转换为ECharts 3D柱状图需要的格式: [x, y, z]
    const seriesData = populationData.map(function (item, index) {
        return [index, 0, item];
    });

    // --- 2. ECharts 配置项 ---
    var option = {
        title: {
            text: '上海市各区常住人口数量',
            subtext: '数据来源：第七次全国人口普查',
            left: 'center',
            textStyle: { color: '#333', fontSize: 24 },
            subtextStyle: { color: '#888' }
        },
        tooltip: {
            formatter: function (params) {
                const districtName = districts[params.data[0]];
                const population = params.data[2];
                return `<strong>${districtName}</strong><br/>人口: ${population.toFixed(2)} 万人`;
            }
        },
        visualMap: {
            min: 0,
            max: 600,
            inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            },
            text: ['人口（万人）'],
            calculable: true,
            left: 20,
            bottom: 20
        },
        grid3D: {
            boxWidth: 200,
            boxDepth: 80,
            viewControl: {
                autoRotate: true,
                distance: 250,
                alpha: 20,
                beta: 30
            },
            light: {
                main: { intensity: 1.2, shadow: true },
                ambient: { intensity: 0.3 }
            }
        },
        xAxis3D: {
            type: 'category',
            data: districts,
            axisLabel: { interval: 0, rotate: 30 }
        },
        yAxis3D: {
            type: 'category',
            data: ['']
        },
        zAxis3D: {
            type: 'value',
            name: '人口（万人）'
        },
        series: [{
            type: 'bar3D',
            data: seriesData,
            shading: 'lambert',
            label: { show: false },
            emphasis: {
                label: {
                    show: true,
                    textStyle: {
                        fontSize: 16,
                        color: '#fff',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        padding: 5,
                        borderRadius: 5
                    },
                    formatter: function (params) {
                       return params.data[2].toFixed(2);
                    }
                }
            }
        }]
    };

    // 使用配置项和数据显示图表
    myChart.setOption(option);

    // 监听浏览器窗口大小变化，实现图表自适应
    window.addEventListener('resize', function () {
        myChart.resize();
    });
});
