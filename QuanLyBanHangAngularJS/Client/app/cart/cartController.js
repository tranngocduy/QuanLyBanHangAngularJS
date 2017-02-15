(function (myApp) {
    myApp.controller('cartController', cartController);

    cartController.$inject = ['$scope', '$sessionStorage', 'ShoppingCart', 'apiService', 'noteService', '$localStorage','$state']

    function cartController($scope, $sessionStorage, ShoppingCart, apiService, noteService, $localStorage, $state) {
        $scope.show = false;
        $scope.thongtinmuahang = false;
        $scope.Remove = Remove;
        $scope.CheckOut = CheckOut;
        $scope.changeQuality = changeQuality;
        $scope.CheckOut = CheckOut;
        $scope.XacNhan = XacNhan;
        checkUpdate();
        checkLogin();


        function checkLogin() {
            if ($localStorage.UserInfo != undefined) {
                $scope.ThongTin = $localStorage.UserInfo;
                $scope.hienthi = true;
            } else {
                $scope.ThongTin = undefined;
                $scope.hienthi = false;
            }
        }

        function XacNhan() {
            if ($localStorage.UserInfo != undefined) {
                $scope.thongtinmuahang = !$scope.thongtinmuahang;
            }
            checkLogin();
        };

        $scope.$back = function () {
            window.history.back();
        };

        function CheckOut() {
            $scope.cart.KhachHang = $scope.ThongTin;
            apiService.post('http://localhost:62940/client/Order', $scope.cart, function (result) {
                noteService.displaySuccess('Đặt Hàng Thành Công');
                delete $sessionStorage.items;
                ShoppingCart.Delete();
                $state.go('home');
            }, function (error) {
                noteService.displayError('Đặt Hàng Thất Bại');
            })
        };

        function checKShow() {
            if ($sessionStorage.items == undefined) {
                $scope.show = false;   
            } 
            if ($sessionStorage.items != undefined && $sessionStorage.items.shopCarts[0] == undefined) {
                $scope.show = false;
            }
            if ($sessionStorage.items != undefined && $sessionStorage.items.shopCarts[0] != undefined)
            {
                $scope.show = true;
            };
        }
        
        function checkUpdate() {
            $scope.cart = $sessionStorage.items;
            checKShow();
        }

        function Remove(index) {
            ShoppingCart.Remove(index);
            ShoppingCart.Update();
            checkUpdate();
        }

        function changeQuality(index, soluong) {
            ShoppingCart.UpdateQuality(index, soluong);
            ShoppingCart.Update();
            checkUpdate();
        };
        
    };
})(angular.module('ShopClient'));