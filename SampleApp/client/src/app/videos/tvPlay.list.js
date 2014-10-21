define(['common/utils/dataConverter'], function(dataConverter) {
  var diName = 'TvPlayListCtrl';
  return {
    __register__: function(mod) {
      mod.controller(diName, ['$scope', '$state', '$filter', 'ngTableParams', 'ds.tvPlay', 'logger', 'apiService', 'PER_PAGE', TvPlayListCtrl]);
      return mod;
    }
  };

  function TvPlayListCtrl($scope, $state, $filter, ngTableParams, DS, logger, apiService, PER_PAGE) {
    var apiParams = {};


    $scope.addTvPlay = function() {
      $state.go('videos.add-tv-play');
    };


    $scope.edit = function(item) {
      $state.go('videos.edit-tv-play', {
        id: item.id
      });
    };




    $scope.filter = function() {
      var curOption = _.find($scope.filterData.values, function(item) {
        return item.value = $scope.filterModel;
      });
      if(curOption) {
        apiParams[curOption.name] = curOption.value;
        $scope.tvPlayTableParams.page(1);
        $scope.tvPlayTableParams.reload();
      }
    };



    $scope.clearSearch = function() {
      $scope.search.string = '';
    };
    $scope.search = function() {
      apiParams.searchKeyword = $scope.search.string;
      $scope.tvPlayTableParams.page(1);
      $scope.tvPlayTableParams.reload();
    };

    var resetCheckBoxes = function() {
      $scope.checkboxes = {
        'checked': false,
        items: {}
      };
    };
    // watch for check all checkbox
    $scope.$watch('checkboxes.checked', function(value) {
      if(value === false) {
        $scope.checkboxes.items = {};
        return;
      }
      angular.forEach($scope.items, function(item) {
        if(angular.isDefined(item.id)) {
          $scope.checkboxes.items[item.id] = value;
        }
      });
    });
    // watch for data checkboxes
    $scope.$watch('checkboxes.items', function(values) {
      if(!$scope.items) {
        return;
      }
      var checked = 0,
        unchecked = 0,
        total = $scope.items.length;
      angular.forEach($scope.items, function(item) {
        checked += ($scope.checkboxes.items[item.id]) || 0;
        unchecked += (!$scope.checkboxes.items[item.id]) || 0;
      });
      if((unchecked == 0) || (checked == 0)) {
        $scope.checkboxes.checked = (checked == total);
      }
      // grayed checkbox
      angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
    }, true);

    $scope.tvPlayTableParams = new ngTableParams({
      page: 1,
      count: PER_PAGE
    }, {
      isCurrent: function(page, params) {
        return page.number === params.page() && page.type !== 'prev' && page.type !== 'next';
      },
      getData: function($defer, params) {
        apiParams.limit = PER_PAGE; //add api parameter
        apiParams.index = params.page();

        $scope.isLoading = true;
        DS.list(apiParams).then(function() {
          var resData = DS.data,
            items = resData.items;
          filterData = resData.filters;

          $scope.filterData = dataConverter.simpleFilter(filterData);
          $scope.filterModel = $scope.filterData.defaultOption;

          $scope.items = items;
          params.total(resData.total);
          $defer.resolve($scope.items);
          resetCheckBoxes();
          $scope.isLoading = false;
        }, function() {
          $scope.isLoading = false;
        });
      }
    });

    function getCheckedValue(items) {
      var checked = [];
      //获取被选中的值
      for(var key in items) {
        if(items[key] != null && items[key] !== false) { //因为值可能刚好为0
          checked.push(key);
        }
      }
      return checked;
    }
  }
})
