(function (myApp) {
    myApp.controller('SanPhamAddController', SanPhamAddController);

    SanPhamAddController.$inject = ['$scope', '$http', 'apiService', '$state', 'noteService', 'ParamsService']

    function SanPhamAddController($scope, $http, apiService, $state, noteService, ParamsService) {
        $scope.SP = {};
        $scope.ckeditorOptions = {
            language: 'vi',
            height: '100px',
            removePlugins: 'image'
        }

        function loadLoaiSP() {
            apiService.get('http://localhost:62940/loaisp/getall', null, function (result) {
                $scope.LoaiSP = result.data;
            }, function (error) {
                noteService.displayError("Load Dữ Liệu Loại Sản Phẩm Thất Bại");
            });
        };

        function loadNCC() {
            apiService.get('http://localhost:62940/nhacungcap/getall', null, function (result) {
                $scope.NhaCC = result.data;
            }, function () {
                noteService.displayError("Load Dữ Liệu Nhà Cung Cấp Thất Bại");
            });
        };

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
        $scope.AddSP = function () {
            var flag = 0;
            apiService.post('http://localhost:62940/sanpham/create', $scope.SP, function (result) {
                if ($scope.imagesrc != null)
                {
                    var request = {
                        method: 'POST',
                        url: 'http://localhost:62940/sanpham/image/upload?code=' + result.data.MaSP,
                        data: formdata,
                        headers: {
                            'Content-Type': undefined
                        }
                    };
                    $http(request).then(function (success) {
                        noteService.displaySuccess('Thêm Hình Ảnh Sản Phẩm Thành Công');
                    }), function () {
                        flag = 1;
                    };
                } 
                noteService.displaySuccess('Thêm Sản Phẩm Thành Công');
                if (flag = 1)
                {
                noteService.displayError('File Hình Ảnh Không Phù Hợp');
                }
                ParamsService.setParams();
                $state.go('sanpham')
            }, function (error) {
                noteService.displayError('Thêm Sản Phẩm Thất Bại');

            })
        };
        loadLoaiSP();
        loadNCC();
};
})(angular.module('Shop.sanpham'))