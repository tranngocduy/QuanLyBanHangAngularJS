/// <reference path="D:\Project\QuanLyBanHangAngularJS\QuanLyBanHangAngularJS\lib/angular/angular.js" />

(function () {
    angular.module('Shop.sanpham', ['Shop.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('sanpham', {
            url: '/sanpham',
            parent: 'base',
            templateUrl: '/Admin/app/SanPham/SanPhamListView.html',
            controller: 'SanPhamController'
        }).state('sanpham_add', {
            url: '/sanpham_add',
            parent: 'base',
            templateUrl: '/Admin/app/SanPham/SanPhamAddView.html',
            controller: 'SanPhamAddController'
        }).state('sanpham_edit', {
            url: '/sanpham_edit/:id',
            parent: 'base',
            templateUrl: '/Admin/app/SanPham/SanPhamEditView.html',
            controller: 'SanPhamEditController'
        });
    }
})();