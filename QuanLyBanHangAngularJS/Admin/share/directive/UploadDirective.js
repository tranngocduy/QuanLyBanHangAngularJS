(function (myApp) {
    myApp.directive('ngFiles', ngFiles);

    ngFiles.$inject = ['$parse', ];

    function ngFiles($parse) {
        function fn_link(scope, element, attrs) {
            var onChange = $parse(attrs.ngFiles);
            element.on('change', function (event) {
                onChange(scope, { $files: event.target.files });
            })
        }
        return {
            link: fn_link
        }
    }
})(angular.module('Shop.common'))