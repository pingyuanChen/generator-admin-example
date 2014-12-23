define([
  'common/utils/date',
  'common/utils/dataConverter',
  'common/utils/chartAdapter'
], function(dateUtil, dataConverter, chartAdapter) {
  var diName = 'StabilityListCtrl';
  return {
    __register__: function(mod) {
      mod.controller(diName, ['$scope', 'logger', 'ds.stability', StabilityListCtrl]);
      return mod;
    }
  };

  function StabilityListCtrl($scope, logger, DS) {
    var apiParams = {};

    $scope['isCollapse0'] = false; //init the collapse component
    $scope['config0'] = {
      "title": "Stability",
      "yAxis": [{
        "title": "User Call Limited"
      }, {
        "title": "Temperature",
        "opposite": true
      }],
      "display": [{
        "name": "count",
        "alias": "Time per request",
        "type": "column",
        "suffix": "mm",
        "yAxis": 1
      }, {
        "name": "mobile_rate",
        "alias": "User Call Limited",
        "type": "column",
        "suffix": "k"
      }, {
        "name": "avg_time",
        "alias": "success rate-mobile",
        "type": "spline"
      }, {
        "name": "wifi_rate",
        "alias": "sucess rate-wifi",
        "type": "column"
      }]
    };

    $scope['isCollapse1'] = false; //init the collapse component
    $scope['config1'] = {
      "type": "pie",
      "title": "Distribution",
      "display": [{
        "name": "consumption",
        "alias": "Total Consumption",
        "center": [350, 150],
        "size": 250
      }, {
        "name": "apple",
        "alias": "2011",
        "center": [1050, 150],
        "size": 250
      }]
    };



    $scope.filter = function(node, isInit) {
      _.extend(apiParams, node.selectedValue);
      if(!isInit) {
        reloadChart();
      }
    };



    $scope.clearSearch = function() {
      $scope.search.string = '';
    };
    $scope.goSearch = function() {
      apiParams.searchKeyword = $scope.search.string;
      reloadChart();
    };



    var _dateFormat = function(date) {
      return dateUtil.format(date, 'YY-MM-dd');
    };
    var onChangeDate = function(newDate, oldDate) {
      if(newDate.getDate() == oldDate.getDate()) {
        return;
      }
      apiParams.start = _dateFormat($scope.datePicker.start.dt);
      apiParams.end = _dateFormat($scope.datePicker.end.dt);
      reloadChart();
    };
    $scope.datePicker = {
      start: {
        dt: dateUtil.getRelativeDate(-1, new Date())
      },
      end: {
        max: _dateFormat(new Date()),
        dt: dateUtil.getRelativeDate(0, new Date())
      }
    };

    $scope.$watch('datePicker.start.dt', onChangeDate);
    $scope.$watch('datePicker.end.dt', onChangeDate);

    $scope.open = function($event, datePickerInput) {
      $event.preventDefault();
      $event.stopPropagation();
      datePickerInput.opened = true;
    };


    function reloadChart() {
      DS.chart(apiParams)
        .then(function(data) {
          var resData = DS.data,
            items = resData.items,
            filterData = resData.filters;

          if(!$scope.selectName) {
            var convertedData = dataConverter.filter(filterData);
            $scope.selectName = convertedData.selectName;
            $scope.selectOptions = convertedData.selectOptions;
          }


          _.each(items, function(ele, index) {
            $scope['chartConfig' + index] = chartAdapter($scope['config' + index], ele);
          });
        }, function(error) {
          logger.error('load chart failed.');
        });
    }

    reloadChart();
  }
});
