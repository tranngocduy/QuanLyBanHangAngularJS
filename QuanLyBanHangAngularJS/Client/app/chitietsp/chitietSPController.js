(function (myApp) {
    myApp.controller('chitietSPController', chitietSPController);

    chitietSPController.$inject = ['$scope', 'apiService', '$stateParams', 'noteService', 'ShoppingCart'];

    function chitietSPController($scope, apiService, $stateParams, noteService, ShoppingCart) {
        $scope.AddItem = AddItem;
        $scope.loadSPLienQuan = loadSPLienQuan;
        $scope.modal = modal;

        function modal(item) {
            $scope.info = item;
        }

        function AddItem(item) {
            ShoppingCart.checkCart(item);
            ShoppingCart.checkItem(item.MaSP);
            ShoppingCart.AddItem(item);
            ShoppingCart.ExitsItem();
            ShoppingCart.Update();
        }

        function loadSP() {
            apiService.get('http://localhost:62940/client/chitietsp/' + $stateParams.id, null, function (result) {
                $scope.SP = result.data;
            }, function (error) {
                noteService.displayError('Load Dữ Liệu Thất Bại');
            });
        };

        function loadSPLienQuan(page) {
            page = page || 0;
            var config = {
                params: {
                    page: page,
                    pagesize: 4
                }
            }
            apiService.get('http://localhost:62940/client/SPLQ/' + $stateParams.id, config, function (result) {
                $scope.SpLQ = result.data.Item;
                $scope.page = result.data.Page;
                $scope.pageCount = result.data.TotalCount;
                $scope.pagesCount = result.data.TotalPage;
                console.log('Success')
            }, function (Error) {
                console.log('Error')
            })
        };

        loadSPLienQuan();
        loadSP();
    };
})(angular.module('ShopClient'))