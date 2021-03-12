<template>
    <div class='dashboard-warpper' style='padding: 10px'>
        <div ref='bar' style='height: 300px;background-color: #fff'></div>
        <div class='clearfix'>
            <div ref='pie' style='width:33%;height: 500px;background-color: #fff;float: left'>
            </div>
            <div ref='pie1' style='width:33%;height: 500px;background-color: #fff;float: left'>
            </div>
            <div ref='pie2' style='width:33%;height: 500px;background-color: #fff;float: left'>
            </div>
        </div>
    </div>
</template>

<script>
    import {brandListApi, setFactoryStatusApi, deleteBrand, setShowStatus} from '../../api/brand';

    import * as echarts from 'echarts/core';
    import {
        GridComponent,
        TooltipComponent,
        LegendComponent,
        ToolboxComponent,
        VisualMapComponent
    } from 'echarts/components';
    import {
        BarChart,
        LineChart,
        PieChart
    } from 'echarts/charts';
    import {
        CanvasRenderer
    } from 'echarts/renderers';

    echarts.use(
        [GridComponent, CanvasRenderer, TooltipComponent, LegendComponent, ToolboxComponent, VisualMapComponent, BarChart, LineChart, PieChart]
    );
    export default {
        name: "dashboard",
        data() {
            return {
                queryOptions: {
                    keyword: '',
                    pageNum: 1,
                    pageSize: 10
                },
                brandList: [],
                brandProductCount: [],
                brandName: [],
                brandProductCommentCount: [],
                barChart: null,
                pieChart: null,
                pieChart1: null,
                pieChart2: null,
                pieData: []
            }
        },
        created() {

        },
        mounted() {
            this.searchBrandList()
        },
        methods: {
            searchBrandList() {
                this.initBarChart()
                this.initPie()
                this.barChart.showLoading();
                brandListApi(this.queryOptions).then(res => {
                    this.brandList = res.list
                    this.totalItemCount = res.total;
                    console.log(this.brandList)
                    this.brandList.forEach(item => {
                        this.brandName.push(item.name)
                        this.brandProductCount.push(item.productCount * 6)
                        this.brandProductCommentCount.push(item.productCommentCount)
                        this.pieData.push({
                            value: item.productCount, name: item.name
                        })
                    })

                    this.barChart.hideLoading();
                    console.log('00---', this.brandName, this.brandProductCount)
                    this.barChart.setOption({
                        xAxis:
                            {
                                data: this.brandName
                            },
                        yAxis: [
                            {
                                data: this.brandProductCount
                            },
                            {
                                data: this.brandProductCommentCount
                            }
                        ],
                        series: [
                            {
                                // 根据名字对应到相应的系列
                                data: this.brandProductCount
                            },
                            {
                                // 根据名字对应到相应的系列
                                data: this.brandProductCommentCount
                            }
                        ]
                    });
                    this.pieChart.setOption(
                        {
                            series: [
                                {
                                    // 根据名字对应到相应的系列
                                    data: this.pieData
                                }
                            ]
                        }
                    );
                    this.pieChart1.setOption(
                        {
                            series: [
                                {
                                    // 根据名字对应到相应的系列
                                    data: this.pieData
                                }
                            ]
                        }
                    );
                    this.pieData.forEach(item => {
                        item.itemStyle = {
                            color: '#1989fa'
                        }
                    })
                    this.pieChart2.setOption(
                        {
                            series: [
                                {
                                    // 根据名字对应到相应的系列
                                    data: this.pieData
                                }
                            ]
                        }
                    )
                }).catch(error => {
                    this.barChart.hideLoading();
                })
            },
            initBarChart() {
                const chartDom = this.$refs.bar;
                this.barChart = echarts.init(chartDom);
                const barOption = {
                    title: {
                        text: '异步数据加载示例'
                    },
                    tooltip: {},
                    xAxis:
                        {
                            type: 'category',
                            name: '品牌',
                            data: []
                        }
                    ,
                    yAxis: [
                        {
                            type: 'value',
                            name: '商品数量',
                            data: []
                        },
                        {
                            type: 'value',
                            name: '评论数量',
                            data: []
                        }
                    ],
                    series: [{
                        name: '商品数量',
                        type: 'bar',
                        data: [],
                        itemStyle: {
                            color: '#1989fa'
                        }
                    },
                        {
                            name: '评论数量',
                            type: 'line',
                            data: [],
                            itemStyle: {
                                color: '#c23531'
                            }
                        }]
                };
                this.barChart.setOption(barOption)
            },
            initPie() {
                const chartDom = this.$refs.pie;
                this.pieChart = echarts.init(chartDom);

                const pieOption = {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        bottom: 'bottom'
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '40',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: []
                        }
                    ]
                };
                this.pieChart.setOption(pieOption)


                const chartDom1 = this.$refs.pie1;
                this.pieChart1 = echarts.init(chartDom1);

                const option1 = {
                    legend: {
                        bottom: 'bottom'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    series: [
                        {
                            name: '面积模式',
                            type: 'pie',
                            radius: [50, 150],
                            center: ['50%', '50%'],
                            roseType: 'area',
                            itemStyle: {
                                borderRadius: 8
                            },
                            data: []
                        }
                    ]
                };
                this.pieChart1.setOption(option1)


                const chartDom2 = this.$refs.pie2;
                this.pieChart2 = echarts.init(chartDom2);

                let option2 = {
                    title: {
                        text: 'Customized Pie',
                        left: 'center',
                        top: 20,
                        textStyle: {
                            color: '#ccc'
                        }
                    },

                    tooltip: {
                        trigger: 'item'
                    },
                    visualMap: {
                        show: false,
                        min: 10,
                        max: 1100,
                        inRange: {
                            colorLightness: [0, 1]
                        }
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '65%',
                            center: ['50%', '50%'],
                            data: [].sort(function (a, b) {
                                return a.value - b.value;
                            }),
                            roseType: 'radius',
                            label: {
                                color: '#c23531'
                            },
                            labelLine: {
                                lineStyle: {
                                    color: '#c23531'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            },
                            itemStyle: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: '#1989fa'
                            },
                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }
                    ]
                };

                this.pieChart2.setOption(option2);
            }
        }
    }
</script>

<style scoped>

</style>
