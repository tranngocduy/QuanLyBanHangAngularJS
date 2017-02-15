(function (myApp) {
    myApp.controller('rootController', rootController);

    rootController.$inject = ['$scope', '$state'];

    function rootController($scope, $state) {
        $scope.Logout = Logout;

        function Logout() {
            $state.go('login')
        }
    };
})(angular.module('Shop'));