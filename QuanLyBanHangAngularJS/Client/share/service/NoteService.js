
(function (app) {
    app.service('noteService', noteService);

    function noteService() {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "2000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        function displaySuccess(message) {
            toastr.success(message)
        }
        function displayError(message) {
            toastr.error(message)
        }
        function displayWarning(message) {
            toastr.warning(message)
        }
        function displayInfo(message) {
            toastr.info(message)
        }


        return {
            displaySuccess: displaySuccess,
            displayError: displayError,
            displayWarning: displayWarning,
            displayInfo: displayInfo
        }
    };

})(angular.module('ShopClient.common'));