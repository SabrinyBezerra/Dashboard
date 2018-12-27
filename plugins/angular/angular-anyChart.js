function StageController(a,b,c){var d=c;this.$onInit=function(){var c=a.acInstance||anychart.graphics.create(b[0]);c.suspend(),angular.forEach(d.charts,function(a){var b=a.chart?a.chart:a;b.container(c),b.draw()}),c.resume(),c.suspend(),angular.forEach(d.charts,function(a){a.chartDraw&&a.chartDraw.call(a.chart,a.chart)}),c.resume()}}function AnychartController(a,b,c){this.$onInit=function(){a.chart=a.acInstance||anychart[a.acType||"line"](),c.chart=a.chart,c.charts.push(a.chart),a.chart.data&&a.acData&&a.chart.data(a.acData),a.chart.title(a.acTitle),a.acLegend&&a.chart.legend("false"!==a.acLegend)}}function AnychartLink(a,b,c){b.ready(function(){a.chart.container(b[0]),a.chart.draw(),a.acChartDraw&&a.acChartDraw.call(a.chart,a.chart)})}function AnyganttController(a,b,c){this.$onInit=function(){a.chart=a.acInstance||anychart[a.acType](),c.chart=a.chart,c.charts.push(a.chart),a.chart.data&&a.acData&&a.chart.data(a.acData),a.chart.title(a.acTitle),a.acSplitterPosition&&(a.acSplitterPosition.match(/^\d+%$/)?a.chart.splitterPosition(a.acSplitterPosition):a.acSplitterPosition.match(/^\d+$/)&&a.chart.splitterPosition(+a.acSplitterPosition))}}function AnymapController(a,b,c){this.$onInit=function(){a.chart=a.acInstance||anychart[a.acType||"map"](a.acData),c.chart=a.chart,c.charts.push(a.chart),a.chart.geoData(a.acGeoData),a.chart.title(a.acTitle),a.acLegend&&a.chart.legend("false"!==a.acLegend)}}function AnystockController(a,b,c){this.$onInit=function(){a.chart=a.acInstance,c.chart=a.chart,c.charts.push(a.chart)}}angular.module("anychart-angularjs",[]).factory("AnychartService",function(){return{chart:null,charts:[]}}).directive("anychartStage",[function(){return{restrict:"EA",replace:!0,scope:{acInstance:"=?"},controller:["$scope","$element","AnychartService",StageController]}}]).directive("anychart",[function(){return{restrict:"EA",replace:!0,scope:{acType:"@",acData:"=?",acTitle:"@",acLegend:"@",acInstance:"=?",acChartDraw:"=?"},controller:["$scope","$element","AnychartService",AnychartController],link:AnychartLink}}]).directive("anygantt",[function(){return{restrict:"EA",replace:!0,scope:{acType:"@",acData:"=?",acTitle:"@",acInstance:"=?",acChartDraw:"=?",acSplitterPosition:"@"},controller:["$scope","$element","AnychartService",AnyganttController],link:AnychartLink}}]).directive("anymap",[function(){return{restrict:"EA",replace:!0,scope:{acType:"@",acData:"=?",acGeoData:"@",acTitle:"@",acLegend:"@",acInstance:"=?",acChartDraw:"=?"},controller:["$scope","$element","AnychartService",AnymapController],link:AnychartLink}}]).directive("anystock",[function(){return{restrict:"EA",replace:!0,scope:{acInstance:"=?",acChartDraw:"=?"},controller:["$scope","$element","AnychartService",AnystockController],link:AnychartLink}}]);