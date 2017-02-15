(function (myApp) {
    myApp.controller('danhMucController', danhMucController);

    danhMucController.$inject = ['$scope', 'apiService', 'noteService', '$stateParams', 'ShoppingCart', 'tranferService', '$sessionStorage']

    function danhMucController($scope, apiService, noteService, $stateParams, ShoppingCart, tranferService, $sessionStorage) {
        $scope.tranfer = tranfer;
        $scope.modal = modal;
        $scope.checkName = checkName;
        $scope.checkncc = $stateParams.mancc;
        $scope.chimuc = '';
        $scope.AddItem = AddItem;
        
        function setParmas() {
            $scope.loaisp = $sessionStorage.index.maloaisp;
            $scope.nhacc = $sessionStorage.index.mancc;
            $scope.keyword = $sessionStorage.index.keyword;
        }

        function modal(item) {
            $scope.info = item;
        }

        function AddItem(item) {
            ShoppingCart.checkCart(item);
            ShoppingCart.checkItem(item.MaSP);
            ShoppingCart.AddItem(item);
            ShoppingCart.ExitsItem();
            ShoppingCart.Update();
        };


        function checkName(parent,index) {
                $scope.number = parent;
                $scope.numberchild = index;
                $scope.checkncc = 0;
        }

        function tranfer(maloaisp, mancc) {
            $scope.loaisp = maloaisp;
            $scope.nhacc = mancc;
            $scope.chimuc = '';
            loadData();
        }

        function loadData() {
            apiService.get('http://localhost:62940/client/megamenu', null, function (result) {
                $scope.megaMenu = result.data;
            }, function (Error) {
                noteService.displayError('Load Menu Thất Bại')
            });
            if ($scope.loaisp != null && $scope.nhacc != null) {
                apiService.get('http://localhost:62940/client/danhmucsp/' + $scope.loaisp + "/" + $scope.nhacc + "/" + null, null, function (result) {
                    $scope.SPtheodanhmuc = result.data;
                }, function (error) {
                    noteService.displayError('Load Sản Phẩm Thất Bại')
                });
            } else if ($scope.loaisp != null) {
                apiService.get('http://localhost:62940/client/danhmucsp/' + $scope.loaisp + "/" + 0 + "/" + null, null, function (result) {
                    $scope.SPtheodanhmuc = result.data;
                }, function (error) {
                    noteService.displayError('Load Sản Phẩm Thất Bại')
                });
            } else  {
                apiService.get('http://localhost:62940/client/danhmucsp/' + 0 + "/" + 0 + "/" + $scope.keyword, null, function (result) {
                    $scope.SPtheodanhmuc = result.data;
                    $scope.chimuc = $scope.keyword;
                }, function (error) {
                    noteService.displayError('Load Sản Phẩm Thất Bại')
                });
            };
        };
        setParmas();
        loadData();
    };
})(angular.module('ShopClient'));