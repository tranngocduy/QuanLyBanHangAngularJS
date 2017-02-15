(function (myApp) {
    myApp.service('ShoppingCart', ShoppingCart);

    ShoppingCart.$inject = ['$sessionStorage', 'noteService'];

    function ShoppingCart($sessionStorage, noteService) {
        var flag = 0;
        var exit = 0;
        var number = 0;
        var shopCart = $sessionStorage.items;
        return shoppingcart = {
            checkCart: function (item) {
                if (shopCart == undefined || shopCart.shopCarts.length == undefined) {
                    exit = 1;
                    shopCart = {
                        shopCarts: [],
                    };
                    shopCart.shopCarts.push({
                        id: item.MaSP,
                        name: item.TenSP,
                        image: item.HinhAnh,
                        price: item.DonGia,
                        quality: 1,
                        gia: 1 * item.DonGia
                    });
                    noteService.displaySuccess('Đã Thêm Sản Phẩm ' + '<strong style="color:red">' + item.TenSP + '</strong>' + ' Vào Giỏ Hàng');
                } else {
                    exit = 0;
                }
            },
            checkItem: function (index) {
                for (i = 0; i < shopCart.shopCarts.length; i++) {
                    if (shopCart.shopCarts[i].id != index) {
                        flag = 0;
                    } else {
                        flag = 1;
                        number = i;
                        break;
                    }
                };
            },
            AddItem: function (item) {
                if (flag == 0 && exit == 0) {
                    shopCart.shopCarts.push({
                        id: item.MaSP,
                        name: item.TenSP,
                        image: item.HinhAnh,
                        price: item.DonGia,
                        quality: 1,
                        gia: 1 * item.DonGia
                    });
                    noteService.displaySuccess('Đã Thêm Sản Phẩm ' + '<strong style="color:red">' + item.TenSP + '</strong>' + ' Vào Giỏ Hàng');
                };    
            },
            ExitsItem: function () {
                if (flag == 1 && exit == 0) {
                    shopCart.shopCarts[number].quality++;
                    shopCart.shopCarts[number].gia = shopCart.shopCarts[number].quality * shopCart.shopCarts[number].price;
                    noteService.displayWarning('Cập Nhật Sản Phẩm ' + '<strong style="color:red">' + shopCart.shopCarts[number].name + '</strong>' + ' Số Lượng Hiện Tại Là: ' + '<strong style="color:red">' + shopCart.shopCarts[number].quality + '</strong>');
                    flag = 0;
                };      
            },
            UpdateQuality: function (index, soluong) {
                for (i = 0; i < shopCart.shopCarts.length; i++) {
                    if (shopCart.shopCarts[i].id == index) {
                        shopCart.shopCarts[i].quality == soluong;
                        shopCart.shopCarts[i].gia = shopCart.shopCarts[i].quality * shopCart.shopCarts[i].price;
                        break;
                    };
                };
            },
            Remove: function (index) {
                for (i = 0; i < shopCart.shopCarts.length; i++) {
                    if (shopCart.shopCarts[i].id == index) {
                        noteService.displayError('Đã Xóa Sản Phẩm ' + '<strong style="color:black">' + shopCart.shopCarts[i].name);
                        shopCart.shopCarts.splice(i, 1);                    
                        break;
                    };
                };
            },
            Update: function () {
                function tinhthanhtien() {
                    var tongthanhtien = 0;
                    for (i = 0; i < shopCart.shopCarts.length; i++) {
                        tongthanhtien += shopCart.shopCarts[i].gia
                    }
                    return tongthanhtien;
                };

                var Shopitem = {
                    shopCarts: shopCart.shopCarts,
                    thanhtien: tinhthanhtien(),
                    KhachHang: {},
                }
                $sessionStorage.items = Shopitem;
            },
            Delete: function () {
                shopCart = undefined;
            }
        };
    };
})(angular.module('ShopClient.common'))