/// <reference path="D:\Project\QuanLyBanHangAngularJS\QuanLyBanHangAngularJS\lib/angular/angular.js" />

(function (app) {
    app.filter('emtyFilter', emtyFilter);

    function emtyFilter() {
        return function (input) {
            if (input == null ||input == '') {
                return "Chưa Cập Nhật";
            } else {
                return input;
            }
        };
    };


})(angular.module('Shop.common'));