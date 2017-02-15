(function (myApp) {
    myApp.controller('homeController', homeController);

    homeController.$inject = ['$scope', 'apiService', 'ShoppingCart','$localStorage'];

    function homeController($scope, apiService, ShoppingCart,$localStorage) {
        $scope.viewItem = viewItem;
        $scope.Menu = [];
        $scope.MenuSP = [];
        $scope.SpMoi = [];
        $scope.SpHot = [];
        $scope.number = 0;
        $scope.AddItem = AddItem;
        $scope.loadMenuSP = loadMenuSP;


        function AddItem(item) {
            ShoppingCart.checkCart(item);
            ShoppingCart.checkItem(item.MaSP);
            ShoppingCart.AddItem(item);
            ShoppingCart.ExitsItem();
            ShoppingCart.Update();
        };


        function viewItem(sp) {
            $scope.info = sp;
        }

        function loadMenuSP(index) {
            id = index || 1;
            var config = {
                params: {
                    id: id
                }
            }
            apiService.get('http://localhost:62940/client/menu', config, function (result) {
                $scope.MenuSP = result.data;
               
            }, function (Error) {
            
            });
        };


        function loadMenu() {
            apiService.get('http://localhost:62940/client/megamenu', null, function (result) {
                $scope.Menu = result.data;
            }, function (Error) {

            });
        };

        function loadSPMoi() {
            apiService.get('http://localhost:62940/client/spmoi', null, function (result) {
                $scope.SpMoi = result.data;
              
            }, function (Error) {
    
            })
        };

        function loadSPHot() {
            apiService.get('http://localhost:62940/client/sphot', null, function (result) {
                $scope.SpHot = result.data;

            }, function (Error) {
            })
        };

        loadSPHot();
        loadSPMoi();
        loadMenuSP();
        loadMenu();
    };
})(angular.module('ShopClient'))