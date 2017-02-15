/// <reference path="D:\Project\QuanLyBanHangAngularJS\QuanLyBanHangAngularJS\lib/angular/angular.js" />

(function () {
    var myApp = angular.module('Shop', ['Shop.ncc', 'Shop.loaisp', 'Shop.sanpham', 'Shop.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: '/Admin/app/login/LoginView.html',
            controller: 'LoginController'
        }).state('base', {
            url: '',
            templateUrl: '/Admin/share/views/baseView.html',
            abstract:true,
        }).state('admin', {
            url: '/admin',
            parent: 'base',
            templateUrl: '/Admin/app/home/HomeView.html',
            controller: 'HomeController'
        });
        $urlRouterProvider.otherwise('/login');
    };
})();