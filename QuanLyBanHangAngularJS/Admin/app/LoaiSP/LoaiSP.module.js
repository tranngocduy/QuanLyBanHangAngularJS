(function () {
    angular.module('Shop.loaisp', ['Shop.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('loaisp', {
            url: '/loaisp',
            parent: 'base',
            templateUrl: '/Admin/app/LoaiSP/LoaiSPListView.html',
            controller: 'LoaiSPListController',
        });
    }
})();