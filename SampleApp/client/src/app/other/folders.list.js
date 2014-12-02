define(['common/utils/date', 'common/utils/dataConverter'], function(dateUtil, dataConverter) {
  var diName = 'FoldersListCtrl';
  return {
    __register__: function(mod) {
      mod.controller(diName, ['$scope', '$window', '$state', '$filter', '$location', '$modal', 'ngTableParams', 'ds.folders', 'logger', 'apiService', 'PER_PAGE', FoldersListCtrl]);
      return mod;
    }
  };

  function FoldersListCtrl($scope, $window, $state, $filter, $location, $modal, ngTableParams, DS, logger, apiService, PER_PAGE) {
    var apiParams = {};
    $scope.listChecked = [];
    $scope.listTotal = 0;

    $scope.isPopup = function() {
      return !!$location.search().popup;
    };

    $scope.addFolders = function() {
      $state.go('other.add-folders');
    };


    $scope.edit = function(item) {
      if($location.search().popup) {
        var windowScope = $window.opener.angular.element('body').scope(),
          childWindowName = $window.window.name;

        if(childWindowName == 'from-ref') {
          windowScope.$broadcast('REF_LIST_SELECTED', {
            id: item.id
          });
        } else {
          windowScope.$broadcast('INLINE_REF_LIST_SELECTED', {
            id: item.id
          });
        }
        $window.close();
      }
      $state.go('other.edit-folders', {
        id: item.id
      });
    };





    $scope.filter = function() {
      var curOption = _.find($scope.filterData.values, function(item) {
        return item.value = $scope.filterModel;
      });
      if(curOption) {
        apiParams[curOption.name] = curOption.value;
        $scope.foldersTableParams.page(1);
        $scope.foldersTableParams.reload();
      }
    };



    $scope.clearSearch = function() {
      $scope.search.string = '';
    };
    $scope.search = function() {
      apiParams.searchKeyword = $scope.search.string;
      $scope.foldersTableParams.page(1);
      $scope.foldersTableParams.reload();
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

      $scope.listChecked = getCheckedValue($scope.checkboxes.items);
    }, true);

    $scope.foldersTableParams = new ngTableParams({
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
          $scope.listTotal = resData.total;
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

    function resetCheckBoxes() {
      $scope.checkboxes = {
        'checked': false,
        items: {}
      };
    };
  }
})
