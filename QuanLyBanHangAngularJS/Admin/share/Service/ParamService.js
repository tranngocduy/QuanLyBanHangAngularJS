(function (myApp) {
    myApp.service('ParamsService', ParamsService);

    function ParamsService() {
        var a =1
        var paramservice = {
            setParams: setParams,
            getParams: getParams,
            Params: Params
        }
        function setParams() {
            a = 0;
        }
        function getParams() {
            return a;
        }
        function Params() {
            a = 1;
        }
        return paramservice;
    }
})(angular.module('Shop.common'))