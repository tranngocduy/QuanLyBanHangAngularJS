(function (app) {
    app.service('apiService', apiService);

    apiService.$inject = ['$http', 'noteService'];

    function apiService($http, noteService) {
        return {
            get: get,
            post: post,
            put: put,
            del : del
        }
        function get(url, data, success, fail) {
            $http.get(url, data).then(function (result) {
                success(result);
            }, function (error) {
                if (error.status == 404) {
                    noteService.displayError('Không Tìm Thấy Dữ Liệu');
                } else if (error.status == 400) {
                    noteService.displayError('Yêu Cầu Không Phù Hợp')
                } else {
                    fail(error);
                }
            });
        };

        function post(url, data, success, fail) {
            $http.post(url, data).then(function (result) {
                success(result);
            }, function (error) {
                if (error.status == 404) {
                    noteService.displayError('Không Tìm Thấy Dữ Liệu');
                } else if (error.status == 400) {
                    noteService.displayError('Yêu Cầu Không Phù Hợp')
                } else if (error.status == 502) {
                    noteService.displayError('Tài Khoản Đã Tồn Tại');
                } else {
                    fail(error);
                };
            });
        };

        function put(url, data, success, fail) {
            $http.put(url, data).then(function (result) {
                success(result);
            }, function (error) {
                if (error.status == 404) {
                    noteService.displayError('Không Tìm Thấy Dữ Liệu');
                } else if (error.status == 400) {
                    noteService.displayError('Yêu Cầu Không Phù Hợp')
                } else {
                    fail(error);
                }
            });
        };

        function del(url, data, success, fail) {
            $http.delete(url, data).then(function (result) {
                success(result);
            }, function (error) {
                if (error.status == 404) {
                    noteService.displayError('Không Tìm Thấy Dữ Liệu');
                } else if (error.status == 400) {
                    noteService.displayError('Còn Sản Phẩm Thuộc Danh Mục Này Tồn Tại')
                } else {
                    fail(error);
                }
            });
        };
    };
})(angular.module('ShopClient.common'));