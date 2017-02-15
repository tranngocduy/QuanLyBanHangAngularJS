(function (myApp) {
    myApp.controller('rootController', rootController);

    rootController.$inject = ['$scope', 'apiService', '$localStorage', '$state', 'noteService', 'tranferService', 'md5'];

    function rootController($scope, apiService, $localStorage, $state, noteService, tranferService, md5) {
        $scope.user = {};
        $scope.ThongTin = {};
        $scope.show = false;  
        $scope.Megamenu = [];
        $scope.Login = Login;
        $scope.Logout = Logout;
        $scope.DangKy = DangKy;
        $scope.tranfer = tranfer;
        $scope.Search = Search;

        $scope.MD5Login = function (PassLogin) {
            $scope.user.password = md5.createHash(PassLogin || '');;
        }

        $scope.MD5 = function (PassResgiter) {
            $scope.ThongTin.MatKhau = md5.createHash(PassResgiter || '');;
        }


        function Search(keyword) {
            tranfer(null,null, keyword);
        }

        function tranfer(maloaisp, mancc, keyword) {
            tranferService.get(maloaisp, mancc, keyword);
            window.location.reload(true);
            $state.go('danhmucsp');
        }

        function DangKy() {
            apiService.post('http://localhost:62940/client/register', $scope.ThongTin, function (result) {
                noteService.displaySuccess('Đăng Ký Thành Công');
                $scope.ThongTin = {};
            }, function (error) {
                noteService.displayError('Đăng Ký Thất Bại');
            })
        }

        function Logout() {
            delete $localStorage.UserInfo;
            check();
            $state.reload();
        }

        function check() {
            if ($localStorage.UserInfo != null) {
                $scope.LoginUser = $localStorage.UserInfo;
                $scope.show = true;
            } else {
                $scope.show = false;
            }
        }
        
        function Login() {
            apiService.post('http://localhost:62940/client/login', $scope.user, function (result) {
                $localStorage.UserInfo = result.data;
                check();
                $('#myModal88').on('hidden.bs.modal', function () {
                    location.reload();
                });
            }, function (Error) {
                noteService.displayError('Tài Khoản Hoặc Mật Khẩu Không Đúng')
            });
        };

        function loadMegaMenu() {
            apiService.get('http://localhost:62940/client/megamenu', null, function (result) {
                $scope.Megamenu = result.data;
            }, function (Error) {
                noteService.displayError('Tải Menu Thất Bại');
            })
        };
        check();
        loadMegaMenu();
    };
})(angular.module('ShopClient'))