(function (app) {
    app.controller('NhaCCAddController', NhaCCAddController);

    NhaCCAddController.$inject = ['$scope', 'apiService', '$state', 'noteService', 'SeoService'];

    function NhaCCAddController($scope, apiService, $state, noteService, SeoService) {
        $scope.NCC = {};
        $scope.AddNCC = AddNCC;
        $scope.Seo = Seo;
        $scope.ckeditorOptions = {
            language: 'vi',
            height: '200px',
        }

        function Seo() {
            $scope.NCC.BiDanh = SeoService.getSeo($scope.NCC.TenNCC);
        };

        function AddNCC() {
            apiService.post('http://localhost:62940/nhacungcap/create', $scope.NCC, function (result) {
                noteService.displaySuccess('Thêm Nhà Cung Cấp ' + result.data.TenNCC + ' Thành Công');
                $state.go('ncc');
            }, function (error) {
                noteService.displayError('Thêm Nhà Cung Cấp Thất Bại');
            });
        };
    };

})(angular.module('Shop.ncc'));