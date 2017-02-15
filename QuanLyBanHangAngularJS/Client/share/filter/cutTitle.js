(function (myApp) {
    myApp.filter('cutTitle', cutTitle);

    function cutTitle() {
        return function(input)
        {
            var str = input.split(" ", 3);
            var output = str[0] + " " + str[1] + " " + str[2]+ " ...";
            return output;
        }
    }
})(angular.module('ShopClient.common'))