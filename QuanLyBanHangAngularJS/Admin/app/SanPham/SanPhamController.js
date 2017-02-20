(function (myApp) {
    myApp.controller('SanPhamController', SanPhamController);

    SanPhamController.$inject = ['$scope', 'apiService', 'noteService', '$ngBootbox', '$state', 'ParamsService'];

    function SanPhamController($scope, apiService, noteService, $ngBootBox, $state, ParamsService) {
        $scope.SanPham = [];
        $scope.Info = Info;
        $scope.keyword = '';
        $scope.search = search;
        $scope.page = 0;
        $scope.loadData = loadData;
        $scope.delSP = delSP;
        $scope.reload = reload;
   

        function reload() {
            $state.reload();
        }
        function delSP(index, name) {
            $ngBootBox.confirm("Bạn Có Muốn Xóa Sản Phẩm " + "<strong>" + name + "</strong>" + " ?").then(function () {
                apiService.del('http://localhost:62940/sanpham/delete/' + index, null, function (result) {
                    noteService.displaySuccess("Xóa Sản Phẩm " + "<strong>" + name + "</strong>" + " Thành Công");
                    loadData();
                }, function (error) {
                    noteService.displayError("Xóa Thất Bại");
                });
            });
        };

        function search() {
            loadData()
        }

        function Info(input) {
            $scope.infodetail = input;
        }

        function loadData(page) {
            page = page || 0;
            var config = {
                params: {
                    page: page,
                    pagesize: 10,
                    keyword : $scope.keyword
                }
            }
            apiService.get('http://localhost:62940/sanpham/getall', config, function (result) {
                $scope.SanPham = result.data.Item;
                $scope.page = result.data.Page;
                $scope.pageCount = result.data.TotalCount;
                $scope.pagesCount = result.data.TotalPage;
                if (ParamsService.getParams() == 0) {
                    $state.reload();
                    ParamsService.Params();
                }
            }, function (Erorr) {
                noteService.displayError('Load Dữ Liệu Thât Bại')
            });
        };
       
        loadData();
    };
})(angular.module('Shop.sanpham'))