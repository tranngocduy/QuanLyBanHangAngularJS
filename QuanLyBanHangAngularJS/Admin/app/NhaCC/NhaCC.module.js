(function () {
    angular.module('Shop.ncc', ['Shop.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('ncc', {
            url: '/ncc',
            parent:'base',
            templateUrl: '/Admin/app/NhaCC/NhaCCListView.html',
            controller: 'NhaCCListController',
        }).state('ncc_add', {
            url: '/ncc_add',
            parent: 'base',
            templateUrl: '/Admin/app/NhaCC/NhaCCAddView.html',
            controller: 'NhaCCAddController',
        }).state('ncc_edit', {
            url: '/ncc_edit/:id',
            parent: 'base',
            templateUrl: '/Admin/app/NhaCC/NhaCCEditView.html',
            controller: 'NhaCCEditController',
        });
    };
})();