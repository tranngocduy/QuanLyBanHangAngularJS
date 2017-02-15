/// <reference path="D:\Project\QuanLyBanHangAngularJS\QuanLyBanHangAngularJS\lib/angular/angular.js" />

(function (myApp) {
    myApp.directive('compareTo', compareTo);

    function compareTo() {
        return{
            require: 'ngModel',
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function (scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function (modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function () {
                    ngModel.$validate();
                });
            }
        }
    };
})(angular.module('ShopClient.common'));