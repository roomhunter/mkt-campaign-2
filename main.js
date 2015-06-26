function objRandom(arr) {
  arr.sort(function (a, b) {
    return Math.random() > .5 ? -1 : 1
  });
  return arr;
}

angular.module('mktApp', []);
angular.module('mktApp').controller('LotteryCtrl', function ($scope, $timeout) {
  $scope.userArr = [
    'Phoebe	Sun',
    'Linhan	Huang',
    'Zichen	Chao',
    'Xu	Cao',
    'huan	chen',
    'Yanjing	Chen',
    'zixuan	shangguan',
    'tianlyu	zang',
    'yiwei	sun',
    'WANJUAN	CHEN',
    '坛婷	林',
    '昭琛	战',
    '婉宁	蒋',
    'Weiyang	Yang',
    'WENLU	QIAO',
    'yu	xiaochen',
    'Xu	Sen',
    'Tiancheng	Jia',
    'Tingting	Lin',
    'Jieqiong	Wu',
    '珺璐	黄',
    'Mengqi	Wang',
    'binxin	li',
    'rui	zhang',
  ];
  $scope.userActiveArr = [];

  //自动去重
//    $scope.$watch('userArr', function () {
//        $scope.userArr = _.uniq($scope.userArr);
//    });

  //乱序处理
  $scope.randomCount = 10;
  $scope.randomData = function () {
    $timeout(function () {
      $scope.randomCount--;
      if ($scope.randomCount > 0) {
        $scope.userArr = objRandom($scope.userArr);
        $scope.randomData();
      } else {
        $scope.randomCount = 10;
      }
    }, 100)
  }

  //保存名单
  $scope.userList = [];
  $scope.saveUserArr = function() {
    $scope.userList.push($scope.userArr);
    //console.log($scope.userList);
  }

  $scope.index = null;
  $scope.name = '即将开始';

  var stop;
  var count = 30;
  $scope.wait = false;
  $scope.fight = function () {
    stop = $timeout(function () {
      count--;
      $scope.wait = true;
      if (count > 0) {
        $scope.index = Math.floor(Math.random() * $scope.userArr.length);
        $scope.name = $scope.userArr[$scope.index];
        $scope.fight();

        if (count == 1) {
          $scope.userActiveArr.push($scope.name);
          $scope.userArr.splice($scope.index, 1);
        }
      } else {
        $timeout.cancel(stop);
        $scope.wait = false;
        count = 30;
      }
    }, 80);
  };

  $scope.stopFight = function () {
    $timeout.cancel(stop);
    $scope.wait = false;
    count = 30;
  };

});

angular.module('mktApp').filter('size', function () {
  return function (input) {
    return typeof input == 'object' ? input.length : 0;
  }
});

