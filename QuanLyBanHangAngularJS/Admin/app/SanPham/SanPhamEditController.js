(function (myApp) {
    myApp.controller('SanPhamEditController', SanPhamEditController);

    SanPhamEditController.$inject = ['$scope', 'apiService', '$stateParams', 'noteService', '$http', '$state'];

    function SanPhamEditController($scope, apiService, $stateParams, noteService, $http, $state) {
        
        $scope.UpdateSP = UpdateSP;

        var formdata = new FormData();
        $scope.getTheFiles = function ($files) {
            $scope.imagesrc = [];

            for (var i = 0; i < $files.length; i++) {
                var reader = new FileReader();
                reader.fileName = $files[i].name;
                reader.onload = function (event) {
                    var image = {};
                    image.Name = event.target.fileName;
                    image.Src = event.target.result;
                    $scope.imagesrc.push(image);
                    $scope.$apply();
                }
                reader.readAsDataURL($files[i]);
            }
            angular.forEach($files, function (value, key) {
                formdata.append(key, value);
            });
        }

        function loadSP() {
            apiService.get('http://localhost:62940/sanpham/getbyid/' + $stateParams.id, null, function (result) {
                $scope.EditSP = result.data;
                    apiService.get('http://localhost:62940/nhacungcap/getall', null, function (result) {
                        $scope.NhaCC = result.data;
                    }, function () {
                        noteService.displayWarning('Load Dữ Liệu Nhà Cung Cấp Thất Bại')
                    });
                    apiService.get(' http://localhost:62940/loaisp/getall', null, function (result) {
                        $scope.LoaiSP = result.data;
                    }, function () {
                        noteService.displayWarning('Load Dữ Liệu Loại Sản Phẩm Thất Bại')
                    });
            }, function (error) {
                noteService.displayError('Load Dữ Liệu Thất Bại')
            })
        }


        function UpdateSP() {
            apiService.put('http://localhost:62940/sanpham/edit', $scope.EditSP, function (result) {
                    var request = {
                        method: 'PUT',
                        url: 'http://localhost:62940/sanpham/image/edit?code=' + $scope.EditSP.MaSP,
                        data: formdata,
                        headers: {
                            'Content-Type': undefined
                        }
                    };
                $http(request).then(function (success) {

                    }), function (error) {

                    };
                noteService.displaySuccess('Cập Nhật Thành Công')
                $state.go('sanpham');
            },function (error) {
                noteService.displayError('Cập Nhật Thất Bại');
            });
        };
        loadSP();
    };
})(angular.module('Shop.sanpham'));