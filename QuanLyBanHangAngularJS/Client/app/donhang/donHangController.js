(function (myApp) {
    myApp.controller('donHangController', donHangController);

    donHangController.$inject = ['$scope', '$localStorage', 'apiService']

    function donHangController($scope, $localStorage, apiService) {

        function loadData() {
            if ($localStorage.UserInfo != undefined) {
                apiService.get('http://localhost:62940/client/GetOrderByID/' + $localStorage.UserInfo.MaThanhVien, null, function (result) {
                    $scope.donhang = result.data.DDHDTO;
                }, function (Error) {
                });
            };
        };

        $scope.OderDetail = function (item) {
            $scope.ThanhTien = 0;
            $scope.info = item;
            for(i = 0;i<item.length;i++)
            {
                $scope.ThanhTien += item[i].ThanhTien;
            }
        };

        loadData();
    };
})(angular.module('ShopClient'))