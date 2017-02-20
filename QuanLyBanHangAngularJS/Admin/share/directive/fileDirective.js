(function (myApp) {
    myApp.directive('checkFiles', checkFiles);

    function checkFiles() {
        return {
            require: 'ngModel',
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function (scope, element, attributes, ngModel) {
                var name =""
                ngModel.$validators.compareTo = function (modelValue) {
                    name = modelValue || "";
                    if (name.endsWith(".png") || name.endsWith(".jpeg ") || name.endsWith(".jpg") || name =="")
                    {
                        return true;
                    } else {
                        return false;
                    }
                };

                scope.$watch("otherModelValue", function () {
                    ngModel.$validate();
                });
            }
        }
    }
})(angular.module('Shop.common')); 