(function (myApp) {
    myApp.filter('emtyFiterCart', emtyFiterCart);

    function emtyFiterCart() {
        return function (input) {
            if(input == false)
            {
                return "Đang Xử Lý";
            } else {
                return "Đã Giao Hàng";
            }
        };
    };
})(angular.module('ShopClient.common'))