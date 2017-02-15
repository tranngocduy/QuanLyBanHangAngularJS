(function (myApp) {
    myApp.service('tranferService', tranferService);

    tranferService.$inject = ['$sessionStorage']

    function tranferService($sessionStorage) {
        var index = $sessionStorage.index;
        return tranfer = {
            get: function(maloaisp,mancc,keyword)
            {
                index = {};
                index.maloaisp = maloaisp;
                index.mancc = mancc
                index.keyword = keyword;
                $sessionStorage.index = index;
            },
            setLoaiSP: function () {
                a = index.maloaisp;
                return a;
            },
            setNCC: function () {
                b = index.mancc;
                return b;
            },
        }
        
    };
})(angular.module('ShopClient.common'))