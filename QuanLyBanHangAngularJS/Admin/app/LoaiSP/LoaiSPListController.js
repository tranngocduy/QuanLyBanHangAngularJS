(function (myApp) {
    myApp.controller('LoaiSPListController', LoaiSPListController);

    LoaiSPListController.$inject = ['$scope', 'apiService', 'noteService', '$ngBootbox', '$state', 'SeoService']

    function LoaiSPListController($scope, apiService, noteService, $ngBootbox, $state, SeoService) {

        $scope.loadData = loadData;
        $scope.LoaiSP = {};
        $scope.listloaisp = [];
        $scope.show = false;
        $scope.LayLoaiSP = {};
        $scope.page = 0;
        $scope.GetLoaiSP = GetLoaiSP;
        $scope.pageCount = 0;
        $scope.keyword = '';
        $scope.search = search;
        $scope.delLoaiSP = delLoaiSP;
        $scope.AddLoaiSP = AddLoaiSP;
        $scope.SeoAdd = SeoAdd;
        $scope.SeoEdit = SeoEdit;
        $scope.EditLoaiSP = EditLoaiSP;

        function EditLoaiSP() {
            apiService.put('http://localhost:62940/loaisp/edit', $scope.LayLoaiSP, function (result) {
                noteService.displaySuccess('Cập Nhật Thành Công ' + '<strong>' + $scope.LayLoaiSP.TenLoaiSP + '</strong>');
                loadData();
            }, function (error) {
                noteService.displayError('Cập Nhật Thất Bại');
            });
        }

        function GetLoaiSP(input) {
            apiService.get('http://localhost:62940/loaisp/getbyid/' + input, null, function (result) {
                $scope.LayLoaiSP = result.data;
            }, function (error) {
                noteService.displayError('Load Dữ Liệu Thất Bại');
            })
        }

        function SeoAdd(input) {
            $scope.LoaiSP.BiDanh = SeoService.getSeo(input);
        };

        function SeoEdit(input) {
            $scope.LayLoaiSP.BiDanh = SeoService.getSeo(input);
        };

        function AddLoaiSP(ten) {
            apiService.post('http://localhost:62940/loaisp/create', $scope.LoaiSP, function (result) {
                noteService.displaySuccess('Thêm Loại Sản Phẩm ' + ten + ' Thành Công');
                loadData();
                $scope.LoaiSP = {};
            }, function (error) {
                noteService.displayError('Thêm Thất Bại');
            })
        };

        function delLoaiSP(index,ten) {
            $ngBootbox.confirm('Bạn Có Muốn Xóa Loại Sản Phẩm ' + '<strong>' + ten + '</strong>' + ' Không?')
                .then(function () {
                    apiService.del('http://localhost:62940/loaisp/delete/' + index, null, function (result) {
                        noteService.displaySuccess('Xóa ' + ten + ' Thành Công!')
                        loadData();
                    }, function (error) {
                        noteService.displayError('Xóa Thất Bại!')
                    })
                });
        };

        function search() {
            loadData();
        }

        function loadData(page) {
            page = page || 0;
            var config = {
                params: {
                    page: page,
                    pagesize:10,
                    keyword: $scope.keyword
                }
            }
            apiService.get('http://localhost:62940/loaisp/getall', config, function (result) {
                $scope.listloaisp = result.data.Item;
                $scope.page = result.data.Page;
                $scope.pageCount = result.data.TotalCount;
                $scope.pagesCount = result.data.TotalPage;
            }, function (error) {
                noteService.displayError('Load Dữ Liệu Thất Bại');
            });
        };
        loadData();
    };
})(angular.module('Shop.loaisp'))