/// <reference path="D:\Project\QuanLyBanHangAngularJS\QuanLyBanHangAngularJS\lib/angular/angular.js" />

(function () {
    angular.module('ShopClient', ['ShopClient.common', 'ngSanitize']).config(config)

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('basehome', {
            url: '',
            templateUrl: '/Client/app/base/baseHomeView.html',
            abstract:true
            })
            .state('home', {
            url: '/home',
            parent: 'basehome',
            templateUrl: '/Client/app/home/homeView.html',
            controller: 'homeController'
            })
            .state('chitietsp', {
            url: '/chitietsp/:id',
            parent: 'basehome',
            templateUrl: '/Client/app/chitietsp/chitietSPView.html',
            controller: 'chitietSPController'
            })
            .state('danhmucsp', {
            url: '/danhmucsp',
            parent: 'basehome',
            templateUrl: '/Client/app/danhmucsp/danhMucView.html',
            controller: 'danhMucController'
            })
            .state('cart', {
            url: '/cart',
            parent: 'basehome',
            templateUrl: '/Client/app/cart/cartView.html',
            controller: 'cartController'
            })
            .state('donhang', {
            url: '/donhang',
            parent: 'basehome',
            templateUrl: '/Client/app/donhang/donHangView.html',
            controller: 'donHangController'
        });
        $urlRouterProvider.otherwise('/home');
    };
})();