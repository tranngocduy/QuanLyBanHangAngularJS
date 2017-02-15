(function (myApp) {

    myApp.controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$state']

    function LoginController($scope, $state) {
        $scope.loginSumit = loginSumit;

        function loginSumit() {
            $state.go('admin');
        };
    };
})(angular.module('Shop'));