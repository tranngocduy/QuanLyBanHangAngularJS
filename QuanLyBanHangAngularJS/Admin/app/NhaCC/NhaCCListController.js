(function (app) {
    app.controller('NhaCCListController', NhaCCListController);

    NhaCCListController.$inject = ['$scope', 'apiService', 'noteService', '$ngBootbox'];
    function NhaCCListController($scope, apiService, noteService, $ngBootbox) {
        $scope.listncc = {};
        $scope.page = 0;
        $scope.pageCount = 0;
        $scope.keyword = '';
        $scope.loadData = loadData;
        $scope.search = search;
        $scope.delNCC = delNCC;


        function search() {
            loadData();
        };

        function delNCC(id,ten) {
            $ngBootbox.confirm('Bạn Có Muốn Xóa Nhà Cung Cấp ' + '<strong>'+ten+'</strong>' + ' Không?').then(function () {

                apiService.del('http://localhost:62940/nhacungcap/delete/'+id, null, function (result) {
                    noteService.displaySuccess('Xóa Thành Công');
                    loadData();
                }, function (error) {
                    noteService.displayError('Xóa Thất Bại');
                    loadData();
                });
            });
        };

        function loadData(page) {
            page = page || 0;
            var config = {
                params: {
                    page: page,
                    pagesize: 10,
                    keyword : $scope.keyword,
                }      
            }
            apiService.get('http://localhost:62940/nhacungcap/getall', config, function (result) {
                $scope.listncc = result.data.Item;
                $scope.page = result.data.Page;
                $scope.pageCount = result.data.TotalCount;
                $scope.pagesCount = result.data.TotalPage;
            }, function (erorr) {
                noteService.displayError(" Không Có Dữ Liệu Phù Hợp");
            });
        }

        loadData();
    };
})(angular.module('Shop.ncc'))