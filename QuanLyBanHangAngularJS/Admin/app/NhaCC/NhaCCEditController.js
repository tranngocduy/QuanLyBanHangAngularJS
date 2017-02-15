(function (app) {
    app.controller('NhaCCEditController', NhaCCEditController);

    NhaCCEditController.$inject = ['$scope', '$stateParams', 'apiService', 'noteService', '$state', 'SeoService']

    function NhaCCEditController($scope, $stateParams, apiService, noteService, $state, SeoService) {
        loadData();
        $scope.EditNCC = EditNCC;
        $scope.NCC = {};
        $scope.Seo = Seo;
        $scope.ckeditorOptions = {
            language: 'vi',
            height: '200px',
        }

        function Seo() {
            $scope.NCC.BiDanh = SeoService.getSeo($scope.NCC.TenNCC);
        }
        function EditNCC() {
            apiService.put('http://localhost:62940/nhacungcap/edit', $scope.NCC, function (result) {
                noteService.displaySuccess('Cập Nhật Thông Tin' + result.data.TenNCC + ' Thành Công');
                $state.go('ncc');
            }, function (error) {
                noteService.displayError('Cập Nhật Thất Bại');
            });
        };

        function loadData() {
            apiService.get('http://localhost:62940/nhacungcap/getbyid/' + $stateParams.id, null, function (result) {
                $scope.NCC = result.data
            }, function (error) {
                noteService.displayError('Lấy Dữ Liệu Thất Bại');
            })
        };
    };
})(angular.module('Shop.ncc'))